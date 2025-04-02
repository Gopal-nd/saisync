import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";
import { SubjectSchema } from "../types";
import { APIError } from "../utils/api-error";
import type { BranchType, SemesterType } from "@prisma/client";



export const createSubject = asyncHandler(async (req: Request, res: Response) => {
  //  Validate request body using Zod (throws error if invalid)
  req.body = SubjectSchema.parse(req.body);


  const { noOfCredits, subjectName, staffName, subjectCode, isLab, branchName, semesterNumber } = req.body;
  const upperSubjectCode = subjectCode.toUpperCase();

  const subject = await prisma.subject.create({
    data: {
      subjectCode: upperSubjectCode,
      subjectName,
      staffName,
      noOfCredits,
      isLab,
      branchName,
      semesterNumber,
    },
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: subject,
      message: "Subject created successfully",
    })
  );
});


export const editSubject = asyncHandler(async (req: Request, res: Response) => {
  //  Validate request body using Zod (throws error if invalid)
  const {id} = req.body
  req.body = SubjectSchema.parse(req.body);
  
  
  const { noOfCredits, subjectName, staffName, subjectCode, isLab, branchName, semesterNumber } = req.body;

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  console.log(req.body)
  
  const upperSubjectCode = subjectCode.toUpperCase();

  const subject = await prisma.subject.update({
    where:{id},
    data: {
      subjectCode: upperSubjectCode,
      subjectName,
      staffName,
      noOfCredits,
      isLab,
      branchName,
      semesterNumber,
    },
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: subject,
      message: "Subject Updated Sucessfully ",
    })
  );
});

export const deleteSubject = asyncHandler(async (req: Request, res: Response) => {
  //  Validate request body using Zod (throws error if invalid)
  const {id} = req.params
  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  console.log(id)
  
await prisma.subject.delete({where:{id}})


  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: null,
      message: "Subject Deleted Sucessfully",
    })
  );
});



export const getSubjects = asyncHandler(async (req: Request, res: Response) => {

  let { query, branch, semester, page = "1", limit = "10" } = req.query;


  const searchQuery = query ? String(query) : "";
  const selectedBranch = branch ? String(branch) : "";
  const selectedSemester = semester ? String(semester) : "";
  const currentPage = Number(page);
  const limitNumber = Number(limit);
  const offset = (currentPage - 1) * limitNumber;

  let whereClause: any = {};

  if (searchQuery) {

    whereClause.OR = [
      { subjectName: { contains: searchQuery, mode: "insensitive" } },
      { subjectCode: { contains: searchQuery, mode: "insensitive" } },
    ];
  }


  if (!searchQuery && selectedBranch) {
    whereClause.branchName = selectedBranch;
  }

  if (!searchQuery && selectedSemester) {
    whereClause.semesterNumber = selectedSemester;
  }

    const subjects = await prisma.subject.findMany({
      where: Object.keys(whereClause).length ? whereClause : undefined,
      take: limitNumber,
      skip: offset,
    });

    const totalCount = await prisma.subject.count({
      where: Object.keys(whereClause).length ? whereClause : undefined,
    });

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: {
          subjects,
          totalPages: Math.ceil(totalCount / limitNumber),
          currentPage,
          totalCount,
        },
        message: "Subjects retrieved successfully",
      })
    );

});




export const getSubjectById = asyncHandler(async (req: Request, res: Response) => {
const {id} = req.query


if (!id || typeof id !== "string") {
  throw new APIError({ message: "Invalid or no Id", status: 400 });
}

  const subject = await prisma.subject.findUnique({
    where:{
      id:id
    }
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: subject,
      message: "Subject created successfully",
    })
  );
});

export const getSubjectNames = asyncHandler(async (req: Request, res: Response) => {

    const { branch, semester } = req.query;
    if(!branch || !semester){
      throw new APIError({message:'Branch and semester is required ',status:400})
    }
    const subjects = await prisma.subject.findMany({
      where: {
        branchName: branch as  BranchType,
        semesterNumber: semester as SemesterType
      },
    });
    console.log(subjects)

  
    res.status(201).json(
      new ApiResponse({
        statusCode: 200,
        data: subjects,
        message: "Subject created successfully",
      })
    );
  });
  


