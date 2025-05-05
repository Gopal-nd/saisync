import type{ Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";


export const getAllNptelCorses= asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const projects = await prisma.nptel.findMany({
    where: {
        userId:req.user?.userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: projects }));
});

export const getNptelId = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.nptel.findUnique({
    where: { id: req.params.id },
  });

  if (!project) throw new APIError({ message: "Project not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: project }));
});

export const createNptel = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
  
    if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });
  
    const {
      title,
      description,
      startDate,
      endDate,
      proofUrl,
    } = req.body;
  

  
    const project = await prisma.nptel.create({
      data: {
        title,
        description,
        userId,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        proofUrl,
      }
    });
    console.log(project)
  
    res.status(201).json(new ApiResponse({ statusCode: 201, data: project, message: "Experiance created" }));
  });

export const updateNptel = asyncHandler(async (req: Request, res: Response) => {
    const {
      title,
      description,
      startDate,
      endDate,
      proofUrl,
    } = req.body;
    console.log(req.body)
    console.log(req.params)
  
  
    const updated = await prisma.nptel.update({
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

export const deleteNptel = asyncHandler(async (req: Request, res: Response) => {
  await prisma.nptel.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200,data:null, message: "Deleted project" }));
});
