import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth'
import scheduleRoutes from './src/routes/schedule'
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

// // create brance and semster
// app.get('/api/branch',barnchRoutes)
// app.get('/api/semester',semesterRoutes)

// // create schedule
app.use('/api/schedule',scheduleRoutes)

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});