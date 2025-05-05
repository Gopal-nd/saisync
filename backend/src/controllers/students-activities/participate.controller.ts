import type{ Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";


export const getAllParticipations = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const participations = await prisma.participation.findMany({
    where: {
        userId:req.user?.userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: participations }));
});

export const getPaticaipationById = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.participation.findUnique({
    where: { id: req.params.id },
  });

  if (!project) throw new APIError({ message: "Project not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: project }));
});

export const createParticipation = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
  
    if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });
  
    const {
      title,
      description,
      startDate,
      endDate,
      typeOfParticipatedeEvent,
      location,
      proofUrl,
    } = req.body;
  

  
    const project = await prisma.participation.create({
      data: {
        title,
        description,
        userId,
        date: startDate ? new Date(startDate) : undefined,
        cretificateUrl:proofUrl,
        location:location,
        typeOfParticipatedeEvent:typeOfParticipatedeEvent
      }
    });
    console.log(project)
  
    res.status(201).json(new ApiResponse({ statusCode: 201, data: project, message: "Experiance created" }));
  });

export const updateParticipation = asyncHandler(async (req: Request, res: Response) => {
    const {
        title,
        description,
        startDate,
        endDate,
        typeOfParticipatedeEvent,
        location,
        proofUrl,
    } = req.body;
    console.log(req.body)
    console.log(req.params)
  
  
    const updated = await prisma.participation.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        date: startDate ? new Date(startDate) : undefined,
        cretificateUrl:proofUrl,
        location:location,
        typeOfParticipatedeEvent:typeOfParticipatedeEvent
      }
    });
  
    res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Project updated" }));
  });

export const deleteParticipation = asyncHandler(async (req: Request, res: Response) => {
  await prisma.participation.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200,data:null, message: "Deleted project" }));
});
