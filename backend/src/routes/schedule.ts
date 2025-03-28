import express from 'express';
import { createSchedule, edithSchedule, getSchedule } from '../controllers/schedule';


const router = express.Router();

router.post('/create', createSchedule);
router.post('/edit', edithSchedule);
router.get('/', getSchedule);

export default router;
