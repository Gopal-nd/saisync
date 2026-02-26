import { prisma } from "../lib/db";
import { APIError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import asyncHandler from "../utils/async-handler";
import type { Request, Response } from "express";

export const studentClasses = asyncHandler(async (req: Request, res: Response) => {
    const { day } = req.query;    


     if (!day || typeof day !== "string") {
        throw new APIError({ message: "Invalid or missing date", status: 400 });  
      }

      if (!req.user) {
        throw new APIError({ message: "User not authenticated", status: 401 });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: req.user.userId,
        },
      });

      const start = new Date(day);            // if you want local midnight
start.setHours(0, 0, 0, 0);

const next = new Date(start);
next.setDate(next.getDate() + 1); 
      console.log(day, user?.semester,user?.section,user?.branch)
    const data = await prisma.timetableOfDay.findUnique({
      where: {
          date_branchName_semesterName_sectionName: {
             date: start,
              sectionName: user?.section ?? "A",
              semesterName: user?.semester ?? "S1",
              branchName: user?.branch ?? "AIML",
          },
      },
      include: {
        Periods: true
      }
    });
    console.log(data)

    res.status(200).json(new ApiResponse({ statusCode: 200, data, message: "Classes fetched successfully" }));
  });
