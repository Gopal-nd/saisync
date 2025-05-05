import type{ Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";


export const getAllInternships= asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const projects = await prisma.internships.findMany({
    where: {
        userId:req.user?.userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: projects }));
});

export const getInternshipById = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.internships.findUnique({
    where: { id: req.params.id },
  });

  if (!project) throw new APIError({ message: "Project not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: project }));
});

export const createInternship = asyncHandler(async (req: Request, res: Response) => {
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
  

  
    const project = await prisma.internships.create({
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

export const updateInternship = asyncHandler(async (req: Request, res: Response) => {
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
  
  
    const updated = await prisma.internships.update({
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

export const deleteInternship = asyncHandler(async (req: Request, res: Response) => {
  await prisma.internships.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200,data:null, message: "Deleted project" }));
});
