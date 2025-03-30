
import bcrypt from 'bcryptjs';
import { type Request ,type Response } from 'express';
import { generateToken } from '../lib/jwt';
import { prisma } from '../lib/db';
import * as z from 'zod'

export const register = async (req: Request, res: Response) => {
  const { email, password, name, usn, role } = req.body;

  console.log(email,password,"from the backend")

if(!email || !password){
    console.log('user details is required')

return res.status(400).json({ message: 'email and password is required' });
}
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    
      console.log('user alredy exist')
    return res.status(400).json({ message: 'User already exists' })
}

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, usn, role },
  });
  console.log('user created',user)

  res.json({ message: 'User registered successfully', user });
};

export const login = async (req: Request, res: Response) => {

 try {
   const { email, password } = req.body;
 
   const user = await prisma.user.findUnique({ where: { email } });

   if (!user){
     return  res.status(400).json({message:"Invalid credentials",data:null})
   }
 
   const isMatch = await bcrypt.compare(password, user.password);
 
   if (!isMatch) {
   return  res.status(400).json({message:"Invalid credentials",data:null})
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
    usn:user.usn
   }

   res.status(200).json({message:"Login Success",data:{token,sendUser}});

 } catch (error) {
  console.log("Something went wrong in login route ",error)
 res.status(500).json({message:"Something went wrong in login route",data:error})

 }
};


export const verifyToken = async (req: Request, res: Response) => {
  try {
    // The user is already verified by the authenticateToken middleware
    // Just return the user data
    
    // @ts-ignore - req.user is set by the authenticateToken middleware
    const userId = req.user.id;
    
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        branch: true,
        semester: true,
        section: true,
        usn: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.status(200).json({ 
      message: "Token verified", 
      user 
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ message: "Error verifying token", data: null });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the cookie for web clients
    res.clearCookie('token');
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error during logout", data: null });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.body.user;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ user });
};
