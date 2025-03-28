import express from 'express';
import { createSchedule, updateSchedule, getSchedule, deleteSchedule } from '../controllers/schedule';


const router = express.Router();

router.post('/create', createSchedule);
router.post('/update', updateSchedule);
router.get('/', getSchedule);
router.delete('/delete/:id', deleteSchedule);


export default router;
