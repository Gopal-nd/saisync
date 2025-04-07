import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth'
import studentsRoute from './routes/students'
import subjectsRoute from './routes/subjects'
import scheduleRoutes from './routes/schedule'
import staffRoute from './routes/faculty'
import errorHandler from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import { getSubjectNames } from './controllers/subject';
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
dotenv.config({
  path:'../src/.env'
})


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173','http://localhost:8081'] ,
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
app.use('/api/subjects',subjectsRoute)
app.use('/api/schedule',scheduleRoutes)

app.get('/subjects',authenticateToken,getSubjectNames)





export default app;
