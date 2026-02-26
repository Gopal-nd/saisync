import { prisma } from './lib/db';
import type { AttendanceStatus, BranchType, SemesterType } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';
import app from './app';
import errorHandler from './middleware/errorHandler';
import  {type Request, type Response, type NextFunction } from 'express';
import { ApiResponse } from './utils/api-response';
import asyncHandler from './utils/async-handler';
import { adminOrStaffMiddleware } from './middleware/adminOrStaffMiddleware';


app.get('/',(req,res)=>{
  res.send("i am alive")
})

app.get('/user', asyncHandler(async (req, res) => {
  const {id} = req.query
  const user = await prisma.user.findUnique({
    where:{id:id as string},
    select:{
      name:true,
      email:true,
      role:true,
      createdAt:true,
      updatedAt:true,
    }
  })
  res.status(200).json(new ApiResponse({ data: user, message: 'success', statusCode: 200 }));
}))

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});


app.listen(process.env.PORT!, () => {
  console.log('Server running on localhost:5000');
});