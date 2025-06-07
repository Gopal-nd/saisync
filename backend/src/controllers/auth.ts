
import bcrypt from 'bcryptjs';
import { type Request ,type Response } from 'express';
import { generateToken } from '../lib/jwt';
import { prisma } from '../lib/db';
import * as z from 'zod'
import jwt  from 'jsonwebtoken'
import asyncHandler from '../utils/async-handler';
import { APIError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { sendEmail } from '../lib/mail';
import { Readable } from 'stream';
import csv from 'csv-parser'
import fs from 'fs/promises'


export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, usn, role, branch, section,semester,schema } = req.body;

  // do validation check :TODO
  //for now assume you will get correct data
  // console.log(req.body)
  
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log('user alredy exist from /sign-up route')
    throw new APIError({status:400,message:"User already exist"})
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user  = await prisma.user.create({
    data:{
      email,
      password:hashedPassword,
      name:name,
      usn:usn,
      role:role,
      branch:branch,
      section:section,
      semester:semester,
      schema:schema
    },
    select:{
      id: true,
      email: true,
      name: true,
      usn: true,
      role: true,
      branch:true,
      section:true,
      semester:true,
    }
  })


  // console.log('user created',user)

  res.status(201).json(new ApiResponse({data:user,statusCode:201,message:"User created successfully"}));
})

export const login = asyncHandler(async (req: Request, res: Response) => {

 
   const { email, password } = req.body;
   console.log(email,password)
 
   const user = await prisma.user.findUnique({ where: { email } ,select:{password:true,email:true,branch:true,semester:true,name:true,id:true,usn:true,role:true,schema:true,section:true,mentor:true}});

   if (!user){
    throw new APIError({status:401,message:"Invalid credentials"})
   }
 
   const isMatch = await bcrypt.compare(password, user.password);
 
   if (!isMatch) {
    throw new APIError({status:401,message:"Invalid credentials"})
  }

   const token = generateToken(user.id, user.role);

   res.cookie('token',token,{
     maxAge: 1000 * 60 * 60 * 24, 
     httpOnly:true,
     secure:true
   })

   const sendUser = {
    name:user.name,
    id:user.id,
    role:user.role,
    branch:user.branch,
    semester:user.semester,
    section:user.section,
    usn:user.usn,
    schema:user.schema,
    email:user.email,
    mentor:user.mentor?.email
   }

   res.status(200).json(new ApiResponse({data:{sendUser,token},statusCode:200,message:'Login Success'}));


})


export const ResetPassword = asyncHandler(async (req: Request, res: Response) => {
 

    const {email ,otp , password } = req.body
    console.log(req.body)
    const exist  = await  prisma.user.findUnique({where:{email}})
    if(!exist){
      throw new APIError({status:401,message:'Invalid email'})
    }

    if(email && otp && !password){
      const user = await prisma.otpVerification.findUnique({where:{email}})
      if(!user){
        throw new APIError({status:401,message:'Invalid email'})
      }
      const time = user?.otpExpiresAt
      const currentTime = new Date()

      if(time < currentTime){
        await prisma.otpVerification.delete({where:{email}})
        throw new APIError({status:401,message:'OTP Expired try again later'})
      }
console.log(otp)
      const isMatch = Number(otp) === user.otp

      if(!isMatch){
        throw new APIError({status:401,message:'Invalid OTP'})
      }

      res.status(200).json(new ApiResponse({data:'',statusCode:200,message:' create the new password now'}));
    }

    if(email && password && otp){ 

      const user = await prisma.otpVerification.findUnique({where:{email}})
      if(!user){
        throw new APIError({status:401,message:'Invalid email'})
      }
      const time = user?.otpExpiresAt
      const currentTime = new Date()

      if(time < currentTime){
        await prisma.otpVerification.delete({where:{email}})
        throw new APIError({status:401,message:'OTP Expired try again later'})
      }

      const isMatch = Number(otp) === user.otp

      if(!isMatch){
        throw new APIError({status:401,message:'Invalid OTP'})
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where:{email},
        data:{password:hashedPassword}
      })

      await prisma.otpVerification.delete({where:{email}})

      res.status(200).json(new ApiResponse({data:'',statusCode:200,message:'Password reset successfully'}));
    }

    if(email && !otp && !password){

      
      const user = await prisma.otpVerification.findUnique({where:{email}})
      
      if(user){
        await prisma.otpVerification.delete({where:{email}}) 
      }
      
      // 6 digit otp
      const userOtp =( Math.floor(Math.random() * 900000) + 100000)
      console.log(userOtp)
      
      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 15 minutes from now
      
      const otpVerification = await prisma.otpVerification.create({
        data: {
          email: email,
          otp: userOtp,
          otpExpiresAt: otpExpiration
        },
        select:{
          id: true,
          email: true
        }
      });
      const mailresponse = await sendEmail(email, 'OTP Verification', `Your OTP is: ${userOtp}`);
      
      otpVerification && res.status(200).json(new ApiResponse({data:'',statusCode:200,message:'OTP sent successfully'}));
    }

 
})


export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the cookie for web clients
    res.clearCookie('token');
    
      console.log(req.user)
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error during logout", data: null });
  }
};

export const validate = asyncHandler(async (req: Request, res: Response) => {
  
    // Ensure cookie-parser is used to read cookies
    const token = req.cookies?.token;


    if (!token) {
      throw new APIError({ status: 401, message: 'Token Not Provided' });
    }


    // Verify token using JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { role: string };
    res.status(200).json(new ApiResponse({ statusCode: 200, data: {role:decoded.role}, }));
})

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId; // Assuming authenticated user
  if (!userId) {
    throw new APIError({ status: 401, message: 'Unauthorized: No User ID' });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } ,select:{id:true,name:true,email:true,semester:true,branch:true,section:true,usn:true,schema:true}});

  if (!user) {
    throw new APIError({ status: 404, message: 'User not found' });
  }

  res.status(200).json(new ApiResponse({ statusCode: 200, data: user }));
});


export const bulkRegister = asyncHandler(async (req: Request, res: Response) => {
  console.log('server hit')
  const userId = req.user?.userId; // Assuming authenticated user
  if (!userId) {
    throw new APIError({ status: 401, message: 'Unauthorized: No User ID' });
  }
  if (!req.file) {
    throw new APIError({ status: 401, message: 'file not there' });

  }

  // Read the uploaded file asynchronously
  const csvBuffer = await fs.readFile(req.file.path);
  const csvString = csvBuffer.toString('utf-8');

  // Parse CSV data
  const records :any[] = await new Promise((resolve, reject) => {
    const results: any[] = [];
    Readable.from(csvString)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });

  // Log the parsed data
  console.log('Parsed CSV Records:', records);
  records.map(async(row, index)=>{
    await prisma.user.upsert({
      where:{email:row.email},update:{},create:{
        email:row.email,
        password:row.password,
        name:row.name,
        usn:row.usn,
        role:row.role,
        branch:row.branch,
        section:row.section,
        semester:row.semester,
        schema:row.schema
      }
    })
  })

  // Clean up the uploaded file asynchronously
  await fs.unlink(req.file.path);
 
  res.status(200).json(new ApiResponse({ statusCode: 200, data: '',message:'Registered Successfully'}));

});
