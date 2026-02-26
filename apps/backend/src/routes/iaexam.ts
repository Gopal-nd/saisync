
import  express from 'express';
import { adminOrStaffMiddleware } from '../middleware/adminOrStaffMiddleware';
import { getIATestMarks, updateMarks } from '../controllers/aiexams';

const router = express.Router();

router.get("/",adminOrStaffMiddleware, getIATestMarks);

router.put("/edit",adminOrStaffMiddleware, updateMarks);
// router.get('/mystudents',staffMiddleware,getMyStudentsById)







export default router;
