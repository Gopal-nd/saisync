import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth'
import errorHandler from './middleware/errorHandler';
dotenv.config({
  path:'../src/.env'
})


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,               
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', authenticateToken, userRoutes);


export default app;
