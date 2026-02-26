import type{ Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";


export const getAllTrips = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const exp = await prisma.experienceTrips.findMany({
    where:{
        userId:req.user?.userId,
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: exp }));
});

export const getTripById = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.experienceTrips.findUnique({
    where: { id: req.params.id },
  });

  if (!project) throw new APIError({ message: "Project not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: project }));
});

export const createExperianceTrip = asyncHandler(async (req: Request, res: Response) => {
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
  

  
    const project = await prisma.experienceTrips.create({
      data: {
        title,
        description,
        userId,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        proofUrl,
        companyName,
      }
    });
    console.log(project)
  
    res.status(201).json(new ApiResponse({ statusCode: 201, data: project, message: "Experiance created" }));
  });
  
export const updateTrip = asyncHandler(async (req: Request, res: Response) => {
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


  const updated = await prisma.experienceTrips.update({
    where: { id: req.params.id },
    data: {
      title,
      description,

      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      proofUrl,
      companyName,
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Project updated" }));
});

export const deleteTrip = asyncHandler(async (req: Request, res: Response) => {
  await prisma.experienceTrips.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200,data:null, message: "Deleted project" }));
});
