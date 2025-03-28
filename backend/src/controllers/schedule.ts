import type { Request, Response } from "express";
import { prisma } from "../lib/db";
import dayjs from 'dayjs';
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
    
        res.status(201).json({ message: 'Period added successfully!', period });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    
  }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};  
export const edithSchedule = async (req: Request, res: Response) => {
  try {
    const { title, date, description } = req.body;
    const schedule = 1
    res.status(201).json({ schedule });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getSchedule = async (req: Request, res: Response) => {
  try {
    const { branch, semester, date } = req.query;

    const schedules = 2
    res.send(`Branch: ${branch}, Semester: ${semester}, Date: ${date}`);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
