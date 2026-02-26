import type { BranchType, SectionType, SemesterType } from "@prisma/client";
import { prisma } from "../lib/db";
import asyncHandler from "../utils/async-handler";
import type {Request , Response} from 'express'
import { ApiResponse } from "../utils/api-response";
import { isAnyArrayBuffer } from "util/types";
import { APIError } from "../utils/api-error";

export const getTheMentorAndMenties = asyncHandler(async(req:Request,res:Response)=>{
const {branch, semester, section} = req.query
// console.log(req.query)

    const students = await prisma.user.findMany({
        where:{
            role:'STUDENT',
            branch:branch as BranchType,
            semester: semester as SemesterType,
            section:section as SectionType,
        },
        select:{
            password:false,
            name:true,
            usn:true,
            mentor:{
                select:{
                    name:true
                }
            }
        }
    })
    const staff = await prisma.user.findMany({
        where:{
            role:'STAFF',
        },
        select:{
            password:false,
            name:true,
            usn:true,
            id:true,
        }
    })

    res.status(200).json(new ApiResponse({message:'seccess',data:{students,staff},statusCode:200}))
})



export const assignMentorToStudents = asyncHandler(async(req:Request,res:Response)=>{
    const {studentUsns, mentorId} = req.body

    console.log(req.body)
    if (!studentUsns || !mentorId) {
 throw new APIError({
          message: "Missing studentUsns or Batch",
            status:400
        })
      }

      const usnArray = typeof studentUsns === "string"
      ? studentUsns.split(",").map(usn => usn.trim())
      : Array.isArray(studentUsns)
      ? studentUsns
      : [];

    if (usnArray.length === 0) {
      throw new APIError({
        message: "No valid USNs provided",
        status: 400
      })
    }

    const updateResult = await prisma.user.updateMany({
      where: {
        role: "STUDENT",
        usn: { in: usnArray }
      },
      data: {
        mentorId:mentorId
      }
    });
    
        res.status(200).json(new ApiResponse({message:'mentees updated successfully',data:updateResult,statusCode:200}))
    })

    export const getMyStudentsById = asyncHandler(async(req:Request, res:Response)=>{
        const {id} = req.query
        if(!id || typeof  id !='string'){
            throw new APIError({ message:"No Id provided",status:400})
        }

        const students = await prisma.user.findMany({
            where:{
                role:'STUDENT',
                mentorId:id
            }
        })

        res.status(200).json(new ApiResponse({message:"success",statusCode:200,data:students}))
    })