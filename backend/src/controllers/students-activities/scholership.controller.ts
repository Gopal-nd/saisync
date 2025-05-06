import type{ Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";


export const getAllScholerships= asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const projects = await prisma.scholarships.findMany({
    where: {
        userId:req.user?.userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: projects }));
});

export const getScholershipById = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.scholarships.findUnique({
    where: { id: req.params.id },
  });

  if (!project) throw new APIError({ message: "Project not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: project }));
});

export const createScolership = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
  
    if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });
  
    const {
      title,
      description,
      projectType,
      startDate,
      endDate,
      proofUrl,
      companyName,
    } = req.body;
  

  
    const project = await prisma.scholarships.create({
      data: {

        providerName:'',
        amount:10,
        whenApplied:startDate ? new Date(startDate) : undefined,
        userId,
        whenRecived: startDate? new Date(startDate):undefined,
        description:'',
        proofUrl,
        WhereApplied:''

      }
    });
    console.log(project)
  
    res.status(201).json(new ApiResponse({ statusCode: 201, data: project, message: "Experiance created" }));
  });

export const updateScholership = asyncHandler(async (req: Request, res: Response) => {
    const {
      title,
      description,
      projectType,
      startDate,
      endDate,
      proofUrl,
      companyName,
    } = req.body;
    console.log(req.body)
    console.log(req.params)
  
  
    const updated = await prisma.medicalLeaves.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
  
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        proofUrl,

      }
    });
  
    res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Project updated" }));
  });

export const deleteScholership = asyncHandler(async (req: Request, res: Response) => {
  await prisma.medicalLeaves.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200,data:null, message: "Deleted project" }));
});
