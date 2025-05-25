import type { Request, Response } from "express";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";
import { SubjectSchema } from "../../types";
import { APIError } from "../../utils/api-error";
import type { BranchType, SemesterType } from "@prisma/client";



export const getCertificate = asyncHandler(async (req: Request, res: Response) => {

  if(!req.user?.userId){
    throw new APIError({ message: "User not authenticated", status: 401 });
  }
  const material = await prisma.certificate.findMany({
    where: {
    userId:req.user?.userId,
    },orderBy: {
      issueDate: 'desc',
    }
  });

  console.log(material)

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: material,
      message: "successfully",
    })
  );
});

export const getCertificateById = asyncHandler(async (req: Request, res: Response) => {

  const {id} = req.params
  const material = await prisma.certificate.findUnique({
    where: {
    userId:req.user?.userId,
    id:id
    }
  });

  console.log(material)

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: material,
      message: "sccessfull",
    })
  );
});

export const createCertificate = asyncHandler(async (req: Request, res: Response) => {
  const {
    issueDate,
    expiryDate,
    title,
    description,
    duration,
    issuedBy,
    imageUrl,
    proofUrl,
  } = req.body;
  
  const certificate = await prisma.certificate.create({
    data: {
      userId:req.user?.userId as string,
      issueDate: issueDate?new Date(issueDate) :undefined,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      title,
      description,
      duration: Number(duration),
      issuedBy,
      imageUrl,
      proofUrl,
    },
  });
  
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        data: certificate,
        message: "Certificate created successfully",
      })
    );
  });

export const updateCertificates = asyncHandler(async (req: Request, res: Response) => {

  const {id} = req.params
    const { issueDate,
      expiryDate,
      title,
      description,
      duration,
      issuedBy,
      imageUrl,
      proofUrl,} = req.body;
  console.log(req.body)
  
    const material = await prisma.certificate.update({
      where: {
      id:id,    
      },
      data: {
        userId:req.user?.userId as string,
        issueDate:issueDate ? new Date(issueDate) : undefined, // Convert to Date object
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
        title,
        description,
        duration: Number(duration),
        issuedBy,
        imageUrl,
        proofUrl,
      }
    });
  
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        data: material,
        message: "Certificate updated successfully",
      })
    );
  });


export const deleteCertificates = asyncHandler(async (req: Request, res: Response) => {

const {id} = req.params

  const material = await prisma.certificate.delete({
    where: {
    id:id,    
    }
  });

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: null,
      message: "Certificate deleted successfully",
    })
  );
});