import type{ Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";


export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const projects = await prisma.projects.findMany({
    where: {
      OR: [
        { leadId: userId },
        { members: { some: { id: userId } } }
      ]
    },
    include: {
      leader: true,
      members: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: projects }));
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const project = await prisma.projects.findUnique({
    where: { id: req.params.id },
    include: { leader: true, members: true }
  });

  if (!project) throw new APIError({ message: "Project not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: project }));
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
  
    if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });
  
    const {
      title,
      description,
      projectType,
      startDate,
      endDate,
      repoUrl,
      liveUrl,
      memberIds = [],
      name
    } = req.body;
  
    // Validate memberIds is an array
    if (!Array.isArray(memberIds)) {
      throw new APIError({ message: "memberIds must be an array", status: 400 });
    }
  
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: memberIds
        }
      }
    });
  
    const project = await prisma.projects.create({
      data: {
        title,
        description,
        projectType,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        repoUrl,
        liveUrl,
        name,
        leadId: userId,
        members: {
          connect: users.map((u) => ({ id: u.id }))
        }
      }
    });
    console.log(project)
  
    res.status(201).json(new ApiResponse({ statusCode: 201, data: project, message: "Project created" }));
  });
  
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    projectType,
    startDate,
    endDate,
    repoUrl,
    liveUrl,
    memberIds=[] ,
  
    name
  } = req.body;
  console.log(req.body)
  console.log(req.params)


  const updated = await prisma.projects.update({
    where: { id: req.params.id },
    data: {
      title,
     leadId: req.user?.userId,
      description,
      projectType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      repoUrl,
      liveUrl,
      name,
    }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: updated, message: "Project updated" }));
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  await prisma.projects.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200,data:null, message: "Deleted project" }));
});
