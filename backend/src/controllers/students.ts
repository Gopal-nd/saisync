import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";
import { SubjectSchema } from "../types";
import { APIError } from "../utils/api-error";
import type { BranchType, SemesterType } from "@prisma/client";

export const editStudent = asyncHandler(async (req: Request, res: Response) => {


  
  
  const { name,
    id,
    usn,
    collageId,
    section,
    schema,
    branch,
    semester,
    isVerified
     } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  console.log(req.body)
    
  const student = await prisma.user.update({
    where:{id},
    data: {
      name,
      usn,
      collageId,
      section,
      schema,
      branch,
      semester,
      isVerified
    },
    select:{
        password:false,
        collageId:true
    }
  });
  

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: student,
      message: "Subject Updated Sucessfully ",
    })
  );
});

export const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
  //  Validate request body using Zod (throws error if invalid)
  const {id} = req.params
  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  console.log(id)
  
await prisma.user.delete({where:{id}})


  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: null,
      message: "Subject Deleted Sucessfully",
    })
  );
});





export const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
    
    const {query, branch, semester, section, schema, limit = "10", page = "1"} = req.query
    
    const searchQuery = query ? String(query) : "";
    const selectedBranch = branch ? String(branch) : "";
    const selectedSemester = semester ? String(semester) : "";
    const selectedSection = section ? String(section) : "";
    const currentPage = Number(page);
    const limitNumber = Number(limit);
    const offset = (currentPage - 1) * limitNumber;
    

    let whereClause: any = {};

    if (searchQuery) {
        whereClause.OR = [
            {name: { contains: searchQuery, mode: "insensitive" } }
        ]
    }

   
  if (!searchQuery && selectedBranch) {
    whereClause.branch = selectedBranch;
  }

  if (!searchQuery && selectedSemester) {
    whereClause.semester = selectedSemester;

  }

  if (!searchQuery && selectedSection ) {
    whereClause.section = selectedSection;
  }
    

    
  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      ...whereClause
    },
    take: limitNumber,
    skip: offset,
  });

  const totalCount = await prisma.user.count({
    where: {
      role: 'STUDENT',
      ...whereClause}
  });

   
      res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          data: {
            students,
            totalPages: Math.ceil(totalCount / limitNumber),
            currentPage,
            totalCount,
          },
          message: "student success",
        })
      );
    });



export const getUserById = asyncHandler(async (req: Request, res: Response) => {
const {id} = req.query


if (!id || typeof id !== "string") {
  throw new APIError({ message: "Invalid or no Id", status: 400 });
}

  const subject = await prisma.user.findUnique({
    where:{
      id:id
    }
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: subject,
      message: "Subject success",
    })
  );
});





