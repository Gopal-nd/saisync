import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { staff } from '../controllers/allUsers';
import { createSubject, deleteSubject, editSubject, getSubjectById, getSubjects } from '../controllers/subject';
import { assignMentorToStudents, getMyStudentsById, getTheMentorAndMenties } from '../controllers/mentor';
import { staffMiddleware } from '../middleware/staffMiddleware';

const router = express.Router();

// router.post('/create',adminMiddleware, createSubject);
// router.post('/edit',adminMiddleware, editSubject);
// router.delete('/:id',adminMiddleware, deleteSubject);
// router.get("/search",authenticateToken, getSubjects);
router.get("/",authenticateToken, getTheMentorAndMenties);
router.post("/assign",authenticateToken, assignMentorToStudents);
router.get('/mystudents',staffMiddleware,getMyStudentsById)







export default router;
