import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth'
import scheduleRoutes from './src/routes/schedule'
import { prisma } from './src/lib/db';
import type { BranchType, SemesterType } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', authenticateToken, userRoutes);

app.get('/',(req,res)=>{
  res.send("i am alive")
})

app.get('/staff',async (req, res) => {
  const staff = await prisma.user.findMany({
    where: {
      role: 'STAFF' 
    },
  });

   res.status(200).json(staff);
});


app.get('/test',async (req, res) => {
  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      AND: {branch:'AIML', semester: 'S6',section:'A'}
    },          
  });
   res.status(200).json(students);
});

app.get('/subjects',async (req, res) => {
 
  const { branch, semester } = req.query;
  const subjects = await prisma.subject.findMany({
    where: {
      branchName: branch as  BranchType,
      semesterNumber: semester as SemesterType
    },
  });
  console.log(subjects)
   res.status(200).json(subjects);
});
app.get('/code',async (req, res) => {
  
  const { branch, semester } = req.query;
  const code = await prisma.subject.findMany({
    where: {
      branchName: branch as  BranchType,
      semesterNumber: semester as SemesterType
    },
  });
  console.log(code)
   res.status(200).json(code);
});

app.post('/api/subjects/create',async (req, res) => {
  const { 
    noOfCredits,
    subjectName,
    staffName,
    subjectCode,
    isLab,
    branchName,
    semesterNumber,
   } = req.body;
   console.log(req.body)
const upperSubjectCode = subjectCode.toUpperCase()
  const subject = await prisma.subject.create({
    data: {
      subjectCode:upperSubjectCode,
      subjectName,
      staffName,
      noOfCredits,
      isLab,
      branchName,
      semesterNumber,
    },
  });
  console.log(subject)

   res.status(201).json(subject);
});



app.get('/staff/class',async (req, res) => {
  const { staff ,day} = req.query;
  const dateToMatch = new Date(day as string)
  console.log(dateToMatch)

  
  const subjects = await prisma.timetableOfDay.findFirst({
    where:{
      date: {
        gte: startOfDay(dateToMatch),
        lte: endOfDay(dateToMatch),
      }
    },
    select:{
      branchName:true,
      semesterNumber:true,
    Periods:{
      where:{
        staff:'babu'
      },
      select:{
        subject:true,
        startTime:true,
        endTime:true,
        subjectCode:true,
        isLab:true
      }
    }
    }
  })
   res.status(200).json({subjects});
});


// // create schedule
app.use('/api/schedule',scheduleRoutes)

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});