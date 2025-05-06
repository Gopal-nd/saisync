import type { Request, Response } from "express";
import { APIError } from "../../utils/api-error";
import asyncHandler from "../../utils/async-handler";
import { prisma } from "../../lib/db";
import { ApiResponse } from "../../utils/api-response";

export const getAllScholerships = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const scholarships = await prisma.scholarships.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: scholarships }));
});

export const getScholershipById = asyncHandler(async (req: Request, res: Response) => {
  const scholarship = await prisma.scholarships.findUnique({
    where: { id: req.params.id },
  });

  if (!scholarship) throw new APIError({ message: "Scholarship not found", status: 404 });

  res.status(200).json(new ApiResponse({ statusCode: 200, data: scholarship }));
});

export const createScolership = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) throw new APIError({ message: "Unauthorized", status: 401 });

  const {
    providerName,
    description,
    whenRecived,
    whenApplied,
    proofUrl,
    WhereApplied,
    amount
  } = req.body;

  const scholarship = await prisma.scholarships.create({
    data: {
      providerName,
      description,
      whenRecived: whenRecived ? new Date(whenRecived) : undefined,
      whenApplied: whenApplied ? new Date(whenApplied) : undefined,
      proofUrl,
      WhereApplied,
      amount: parseFloat(amount),
      userId,
    }
  });

  console.log(scholarship)

  res.status(201).json(new ApiResponse({
    statusCode: 201,
    data: scholarship,
    message: "Scholarship created"
  }));
});

export const updateScholership = asyncHandler(async (req: Request, res: Response) => {
  const {
    providerName,
    description,
    whenRecived,
    whenApplied,
    proofUrl,
    WhereApplied,
    amount
  } = req.body;

  const updated = await prisma.scholarships.update({
    where: { id: req.params.id },
    data: {
      providerName,
      description,
      whenRecived: whenRecived ? new Date(whenRecived) : undefined,
      whenApplied: whenApplied ? new Date(whenApplied) : undefined,
      proofUrl,
      WhereApplied,
      amount: parseFloat(amount),
    }
  });

  res.status(200).json(new ApiResponse({
    statusCode: 200,
    data: updated,
    message: "Scholarship updated"
  }));
});

export const deleteScholership = asyncHandler(async (req: Request, res: Response) => {
  await prisma.scholarships.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(new ApiResponse({
    statusCode: 200,
    data: null,
    message: "Scholarship deleted"
  }));
});
