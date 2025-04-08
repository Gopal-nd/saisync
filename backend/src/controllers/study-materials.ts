import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";
import { SubjectSchema } from "../types";
import { APIError } from "../utils/api-error";
import type { BranchType, SemesterType } from "@prisma/client";



export const createStudyMaterial = asyncHandler(async (req: Request, res: Response) => {
  //  Validate request body using Zod (throws error if invalid)
  // req.body = SubjectSchema.parse(req.body);


  const { id ,...rest} = req.body;


  const material = await prisma.studyMaterial.create({
    data: {
    subjectId: id,
      ...rest

    },
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: material,
      message: "Studay material created successfully",
    })
  );
});


export const editStudyMaterial = asyncHandler(async (req: Request, res: Response) => {
  //  Validate request body using Zod (throws error if invalid)
  const {id} = req.body

  const { subjectName, subjectCode, year, noOfCredits, examType, writtenType, syllabus, noOfHours, isLab } = req.body;

  // console.log(req.body)
  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  const upperSubjectCode = subjectCode.toUpperCase();

  const subject = await prisma.subject.update({
    where:{id},
    data: {
      subjectCode: upperSubjectCode,
      subjectName,
      year,
      noOfCredits,
      examType,
      writtenType,
      syllabus,
      noOfHours,
      isLab

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

export const deleteStudyMaterial = asyncHandler(async (req: Request, res: Response) => {
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



export const getStudyMaterials = asyncHandler(async (req: Request, res: Response) => {

  let { query,  page = "1", limit = "10" } = req.query;


  const searchQuery = query ? String(query) : "";

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




export const getStudyMaterialsById = asyncHandler(async (req: Request, res: Response) => {
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
      message: "Subject success",
    })
  );
});




