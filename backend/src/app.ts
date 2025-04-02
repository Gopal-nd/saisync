import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth'
import allUsersRoutes from './routes/allusers'
import subjectsRoute from './routes/subjects'
import scheduleRoutes from './routes/schedule'

import errorHandler from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import { getSubjectNames } from './controllers/subject';
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', allUsersRoutes);
app.use('/api/subjects',subjectsRoute)
app.use('/api/schedule',scheduleRoutes)

app.get('/subjects',authenticateToken,getSubjectNames)





export default app;
