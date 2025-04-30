import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";
import { SubjectSchema } from "../types";
import { APIError } from "../utils/api-error";
import type { BranchType, SemesterType } from "@prisma/client";



export const getCertificate = asyncHandler(async (req: Request, res: Response) => {

  const material = await prisma.certificate.findMany({
    where: {
    userId:req.user?.userId,
    }
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: material,
      message: "Studay material created successfully",
    })
  );
});

export const createCertificate = asyncHandler(async (req: Request, res: Response) => {

    const material = await prisma.certificate.create({
    data:{
    userId:req.user?.userId,
    ...req.body
    }
    });
  
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        data: material,
        message: "Studay material created successfully",
      })
    );
  });

export const updateCertificates = asyncHandler(async (req: Request, res: Response) => {

    const { id ,...rest} = req.body;
  console.log(req.body)
  
    const material = await prisma.certificate.update({
      where: {
      id:id,    
      },
      data: {
          ...rest
      }
    });
  
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        data: material,
        message: "Studay material created successfully",
      })
    );
  });