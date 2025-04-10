import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";
import { prisma } from "../lib/db";
import type { BranchType, SectionType, SemesterType } from "@prisma/client";


export const getAttendence = asyncHandler(async(req:Request,res:Response)=>{

    const {branch,semester,date,section,period} = req.query

    console.log(req.query)

    let whereClause: any = {
        AND: []
    };
    
    if (branch) {
        whereClause.AND.push({ branch: branch as BranchType });
    }
    if (semester) {
        whereClause.AND.push({ semester: semester as SemesterType });
    }
    if (section) {
        whereClause.AND.push({ section: section as SectionType });
    }
    if (date) {
        const dateObj = new Date(date as string);
        whereClause.AND.push({
            date: {
                gte: new Date(dateObj.setHours(0, 0, 0, 0)),
                lte: new Date(dateObj.setHours(23, 59, 59, 999)),
            }
        });
    }
    if (period) {
        whereClause.AND.push({ periodNumber: Number(period) });
    }
    

    const attendence = await prisma.attendance.findMany({
        where: whereClause,
        select:{
            user:{
                select:{
                    name:true,
                    usn:true,
                }
            },
            periodNumber:true,
            status:true,
        }
    })
    // console.log(attendence)
    res.status(200).json(new ApiResponse({data:attendence, message:"success", statusCode:200}))
})