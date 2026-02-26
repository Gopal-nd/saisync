import express from 'express';
import { createSchedule, updateSchedule, getSchedule, deleteSchedule, getPeriodById } from '../controllers/schedule';
import { authenticateToken } from '../middleware/auth';


const router = express.Router();

router.post('/create', createSchedule);
router.post('/update', updateSchedule);
router.get('/', getSchedule);
router.get('/one/:id',authenticateToken, getPeriodById);
router.delete('/delete/:id', deleteSchedule);


export default router;
