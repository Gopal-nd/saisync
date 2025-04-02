import type { Request, Response } from "express";
import { prisma } from "../lib/db";
import dayjs from 'dayjs';
import { BranchType, SemesterType } from "@prisma/client";
import asyncHandler from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";
import { APIError } from "../utils/api-error";
import { number, z } from "zod";
import { DayScheduleSchema } from "../types";


export const createSchedule = asyncHandler(async (req: Request, res: Response) => {

  const data= DayScheduleSchema.safeParse(req.body)
  if(!data.success){
    throw new APIError({message:"validation error",status:400, errors:data.error})
  }
  const {
    branchName,
    semesterNumber,
    date,
    periodNumber,
    startTime,
    endTime,
    subject,
    staff,
    subjectCode,
    isLab
  } = data.data

  const selectedDate = dayjs(date, 'YYYY-MM-DD').toDate();
  
  const start = dayjs(`${date} ${startTime}`, 'YYYY-MM-DD hh-mmA').toDate();
  const end = dayjs(`${date} ${endTime}`, 'YYYY-MM-DD hh-mmA').toDate();


  let timeTableofDate = await prisma.timetableOfDay.findUnique({
    where: {
      date_branchName_semesterNumber: {
        date: selectedDate,
        semesterNumber:semesterNumber as SemesterType,
        branchName:branchName as BranchType
      }
    },
  });

  if (!timeTableofDate) {
    timeTableofDate = await prisma.timetableOfDay.create({
      data: {
        date: selectedDate,
        semesterNumber:semesterNumber as SemesterType,
        branchName:branchName as BranchType
      },
    });

  }

  const period = await prisma.period.create({
    data: {
      timetableId: timeTableofDate.id,
      periodNumber,
      startTime: start,
      endTime: end,
      subject,
      staff,
      subjectCode,
      isLab,
    },
  });


  const users = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      branch: branchName as BranchType,
      semester: semesterNumber as SemesterType
    },
    select: {
      id: true,
      name: true,
      usn: true
    }
  })


  users.map(async (user) => {

    const attendance = await prisma.attendance.create({
      data: {
        userId: user.id,
        periodId: period.id,
        date: selectedDate,
        name: user.name,
        usn: user.usn
      },
    })

  })


  res.status(201).json(new ApiResponse({ statusCode:201,message: 'Period added successfully!',data: period }))


})




export const updateSchedule = asyncHandler(async (req: Request, res: Response) => {
  const { id, subject, staff, startTime, endTime, subjectCode, isLab } = req.body;
  console.log('from the updateSchedule', req.body)
  
    const updatedPeriod = await prisma.period.update({
      where: { id },
      data: { subject, staff, startTime: new Date(startTime), endTime: new Date(endTime), subjectCode, isLab },
    });

    res.status(201).json(new ApiResponse({ message: 'Period updated successfully', data: updatedPeriod,statusCode:201 }))


  
})

export const deleteSchedule = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('from the deleteSchedule', req.params)

    await prisma.period.delete({ where: { id } });
    res.status(200).json(new ApiResponse({ message: 'Period deleted successfully' ,statusCode:200,data:null}));

})

export const getSchedule = asyncHandler(async (req: Request, res: Response) => {
  
    const { branch, semester, date } = req.query;

    if (!branch || !semester || !date) {
      throw new APIError({ status:400,message: 'Branch, Semester, and Date are required' });
    }

    // Validate branch and semester enums
    if (!Object.values(BranchType).includes(branch as BranchType)) {
      throw new APIError({ message: 'Invalid branch' ,status:400,});
    }
    if (!Object.values(SemesterType).includes(semester as SemesterType)) {
      throw new APIError({ message: 'Invalid semester',status:400 });
    }

    // Convert date using dayjs and ensure proper format
    const selectedDate = dayjs(date.toString(), 'YYYY-MM-DD').toDate();

    // Find timetable using composite key
    const result = await prisma.timetableOfDay.findUnique({
      where: {
        date_branchName_semesterNumber: {
          date: selectedDate,
          branchName: branch as BranchType,
          semesterNumber: semester as SemesterType,
        },
      },
      select: {
        Periods: {
          select: {
            id: true,
            periodNumber: true,
            startTime: true,
            endTime: true,
            subject: true,
            staff: true,
            subjectCode: true,
            isLab: true,
          },
        },

      },
    });
    if (result && result.Periods) {
      result.Periods.sort((a, b) => a.periodNumber - b.periodNumber);
    }
    if (!result) {
      throw new APIError({ status:400,message: 'No schedule found for the given date, branch, and semester' });
    }

    res.status(200).json(new ApiResponse({data:result,message:'Success',statusCode:200}));

})


export const getPeriodById = asyncHandler(async (req: Request, res: Response) => {

  const { id } = req.params;
  console.log(id)

  if (!id || typeof id !== "string") {
    throw new APIError({ message: "Invalid or no Id", status: 400 });
  }
  
    const period = await prisma.period.findUnique({
      where:{
        id:id
      },
      select:{
        id: true,
        periodNumber: true,
        startTime: true,
        endTime: true,
        subject: true,
        staff: true,
        subjectCode: true,
        isLab: true,
      }
    });
  
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        data: period,
        message: "period success",
      })
    );
  });