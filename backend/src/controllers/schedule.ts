import type { Request, Response } from "express";
import { prisma } from "../lib/db";
import dayjs from 'dayjs';
import { BranchType, SemesterType } from "@prisma/client";
export const createSchedule = async (req: Request, res: Response) => {
  try {
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
        isLab,
      } = req.body;
      const selectedDate = dayjs(date, 'YYYY-MM-DD').toDate();
      const start = dayjs(`${date} ${startTime}`, 'YYYY-MM-DD hh-mmA').toDate();
      const end = dayjs(`${date} ${endTime}`, 'YYYY-MM-DD hh-mmA').toDate();

      console.log('from the createSchedule',req.body)
  
    let timeTableofDate = await prisma.timetableOfDay.findUnique({
      where: {
        date_branchName_semesterNumber:{
            date: selectedDate,
            semesterNumber,
            branchName
        }
      },
    });
    console.log('Timetable of Date:', timeTableofDate);
    if (!timeTableofDate) {
        timeTableofDate = await prisma.timetableOfDay.create({
            data: {
              date: selectedDate,
              branchName,
              semesterNumber,
            },
          });
          console.log('New Timetable Created:', timeTableofDate);
    }
  try {
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

      console.log('period created',period)
const users = await prisma.user.findMany({
  where: {
    role: 'STUDENT',
    branch:branchName as BranchType,
    semester:semesterNumber as SemesterType
  },
  select:{
    id:true,
    name:true,
    usn:true
  }
})

console.log('users are select to create attendence',users)
users.map(async(user)=>{

  const attendance = await prisma.attendance.create({
    data: {
      userId: user.id,
      periodId: period.id,
      date: selectedDate,
      name:user.name,
      usn:user.usn
    },
  })
  console.log('attendance created of the user',user.id,'==>',attendance)
})

    
res.status(201).json({ message: 'Period added successfully!', period });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    
  }
  } catch (error) {
    res.status(500).json({ error: error });
  }

};  
export const updateSchedule = async (req: Request, res: Response) => {
    const { id, subject, staff, startTime, endTime, subjectCode, isLab } = req.body;
  console.log('from the updateSchedule',req.body)
    try {
      const updatedPeriod = await prisma.period.update({
        where: { id },
        data: { subject, staff, startTime: new Date(startTime), endTime: new Date(endTime), subjectCode, isLab },
      });
  
      res.json({ message: 'Period updated successfully', period: updatedPeriod });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update period' });
    }
  };

  export const deleteSchedule = async (req: Request, res: Response) => {
    const { id } = req.params;
  console.log('from the deleteSchedule',req.params)
    try {
      await prisma.period.delete({ where: { id } });
      res.json({ message: 'Period deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete period' });
    }
  };

export const getSchedule = async (req: Request, res: Response) => {
    try {
      const { branch, semester, date } = req.query;
        
      if (!branch || !semester || !date) {
        return res.status(400).json({ error: 'Branch, Semester, and Date are required' });
      }
  
      // Validate branch and semester enums
      if (!Object.values(BranchType).includes(branch as BranchType)) {
        return res.status(400).json({ error: 'Invalid branch' });
      }
      if (!Object.values(SemesterType).includes(semester as SemesterType)) {
        return res.status(400).json({ error: 'Invalid semester' });
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
        return res.status(404).json({ error: 'No schedule found for the given date, branch, and semester' });
      }
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  