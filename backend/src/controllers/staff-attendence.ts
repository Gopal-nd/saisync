import asyncHandler from "../utils/async-handler";
import type { Request, Response } from "express";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";
import { APIError } from "../utils/api-error";
import type { AttendanceStatus } from "@prisma/client";

export const staffPeriodDetails = asyncHandler(async(req:Request,res:Response)=>{
    const { periodId} = req.query;
  
  const students = await prisma.period.findUnique({
    where:{
      id:periodId as string
    },include:{
      Attendance:true,
      topics:true
    }
  })
  console.log('students',students)  
   res.status(200).json(new ApiResponse({data:students,message:'success',statusCode:200}));
})  


export const getThePeriodAttendence = asyncHandler(async(req:Request,res:Response)=>{
    const { branch, semester ,periodId} = req.query;
  // const dateToMatch = new Date(day as string)
  // console.log(dateToMatch)
console.log('requested period',periodId)
console.log('requested query',req.query)
  
  const students = await prisma.attendance.findMany({
    where:{
      periodId:periodId as string,
      status:'ABSENT'
    },select:{
      userId:true,
      id:true,
      name:true,
      usn:true
    }
  })
//   console.log('students',students)  
   res.status(200).json(new ApiResponse({data:students,message:'success',statusCode:200}));
})  



export const editAttendence = asyncHandler(async(req:Request,res:Response)=>{
  const { userId ,periodId,status} = req.body;

  console.log(userId,periodId,status)
  console.log(req.body)

const attendence = await prisma.attendance.update({
  where:{
    userId_periodId: {
      userId:userId as string,
      periodId: periodId as string
    },
  },
  data:{
    status:status as AttendanceStatus
  }
})
  console.log('students',attendence)  
 res.status(200).json(new ApiResponse({data:attendence,message:'success',statusCode:200}));
})  

export const editAdditionalInfo = asyncHandler(async(req:Request,res:Response)=>{
  const { info ,periodId} = req.body;

  console.log(periodId)
  console.log(req.body)

const attendence = await prisma.period.update({
  where:{
    id:periodId as string
  },
  data:{
   whatlearned:info
  }
})
  console.log('students',attendence)  
 res.status(200).json(new ApiResponse({data:attendence,message:'success',statusCode:200}));
})  