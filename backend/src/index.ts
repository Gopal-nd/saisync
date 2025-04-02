import { prisma } from './lib/db';
import type { AttendanceStatus, BranchType, SemesterType } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';
import app from './app';
import errorHandler from './middleware/errorHandler';
import  {type Request, type Response, type NextFunction } from 'express';


app.get('/',(req,res)=>{
  res.send("i am alive")
})




app.get('/test',async (req, res) => {
  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      AND: {branch:'AIML', semester: 'S6',section:'A'}
    },          
  });
   res.status(200).json(students);
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

// app.post('/api/subjects/create',async (req, res) => {

// });



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
        id:true,
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

// students
app.get('/student/class',async (req, res) => {
  const { branch, semester ,periodId} = req.query;
  // const dateToMatch = new Date(day as string)
  // console.log(dateToMatch)

  
  const subjects = await prisma.attendance.findMany({
    where:{
      periodId:periodId as string,
      status:'NOT_TAKEN'
    },select:{
      userId:true,
      id:true,
      name:true,
      usn:true
    }
  })
   res.status(200).json({subjects});
});
app.put('/student/attendance',async (req, res) => {
  const { userId,periodId,status } = req.body
console.log(userId,periodId,status)

const exist = await prisma.attendance.findUnique({
  where: {
    userId_periodId: {
      userId:userId as string,
      periodId: periodId as string
    },
  },
})

console.log(exist)
  const response = await prisma.attendance.update({
    where: {
      userId_periodId: {
      userId:userId as string,
      periodId: periodId as string
      },
    },
    data: { status: status as AttendanceStatus },

  });

  console.log(response, 'user attendance')
 
   res.status(200).json({response:'sucess'});
});
app.get('/student/attendance/absent',async (req, res) => {
  const { userId,periodId} = req.body;



  const response = await prisma.attendance.findMany({
    where: {
      periodId:periodId as string,
      status:'ABSENT'
    }
  });

  console.log(response, 'user attendance he is absent')

  
 
   res.status(200).json({response});
});


// // create schedule

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});


app.listen(process.env.PORT!, () => {
  console.log('Server running on localhost:5000');
});