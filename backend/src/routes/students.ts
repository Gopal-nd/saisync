import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import {  deleteUsers,  getAllStudents, getUserById, editStudent } from '../controllers/students';

const router = express.Router();

router.put('/edit',adminMiddleware,editStudent);
router.delete('/:id',adminMiddleware, deleteUsers);
router.get("/search",authenticateToken, getAllStudents);
router.get("/",authenticateToken, getUserById);



export default router;
