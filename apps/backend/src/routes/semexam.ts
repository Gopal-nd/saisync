
import  express from 'express';
import { adminOrStaffMiddleware } from '../middleware/adminOrStaffMiddleware';
// import { getSemExamMarks, UpdateSemExamMarks } from '../controllers/semexam';

const router = express.Router();

// router.get("/",adminOrStaffMiddleware, getSemExamMarks);

// router.put("/edit",adminOrStaffMiddleware, UpdateSemExamMarks);

export default router;
