import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth'
import studentsRoute from './routes/students'
import subjectsRoute from './routes/subjects'
import supportStaffRoute from './routes/supportStaff'
import hodRoutes from './routes/hods'
import scheduleRoutes from './routes/schedule'
import attendenceRoute from './routes/attendence'
import mentorRoutes from './routes/mentor'
import iaExamRoutes from './routes/iaexam'
import semExamRoutes from './routes/semexam'
import staffRoute from './routes/staff'
import staffPeriodRoute from './routes/staff-attendence'
import studentActivityRoute from './routes/student-activities';
import dashboardRoute from './routes/dashboard'
import { authenticateToken } from './middleware/auth';
import { getSubjectDetails, getSubjectNames } from './controllers/subject';
import studyMaterialsRoute from './routes/study-materials'
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import { getAllFaculty, getFacultyClasses } from './controllers/staff';
import { staffMiddleware } from './middleware/staffMiddleware';
dotenv.config({
  path:'../src/.env'
})

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173','http://localhost:8081','http://localhost:9001',process.env.FRONTEND_URL!],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {  },
  }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students',studentsRoute)
app.use('/api/staff',staffRoute)
app.use('/api/hod',hodRoutes)
app.use('/api/support-staff',supportStaffRoute)
app.use('/api/subjects',subjectsRoute)
app.use('/api/study-materials',studyMaterialsRoute)
app.use('/api/schedule',scheduleRoutes)
app.use('/api/attendence',authenticateToken,attendenceRoute)
app.use('/api/mentor',authenticateToken,mentorRoutes)
app.use('/api/iaexam',iaExamRoutes)
app.use('/api/semexam',semExamRoutes)
app.use('/api/dashboard', dashboardRoute)

app.use('/api/students/activities',studentActivityRoute)



app.get('/subjects',authenticateToken,getSubjectDetails)
app.get('/staff',authenticateToken,getAllFaculty)
app.use('/staff/class',staffMiddleware,getFacultyClasses)

app.use('/students',staffPeriodRoute)






export default app;
