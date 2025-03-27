import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', authenticateToken, userRoutes);

app.get('/',(req,res)=>{
  res.send("i am alive")
})

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});