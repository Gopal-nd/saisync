import type { Request, Response } from "express";
import { APIError } from "../utils/api-error";
import asyncHandler from "../utils/async-handler";
import { prisma } from "../lib/db";
import { ApiResponse } from "../utils/api-response";

export const staff = asyncHandler(async (req: Request, res: Response) => {

  
    const user = await prisma.user.findMany({ where: { role:'STAFF' } ,select:{id:true,name:true,email:true,semester:true,branch:true,section:true,usn:true,schema:true}});
  
    if (!user) {
      throw new APIError({ status: 404, message: 'User not found' });
    }
  
    res.status(200).json(new ApiResponse({ statusCode: 200, data: user }));
  });
  