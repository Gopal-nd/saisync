import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import {  deleteUsers,  getAllStudents, getUserById, editStudent, editAcadamicDetails, editBusDetails, editDocumentsDetails, editFamilyDetails,
    editHostelDetails, editPersonalDetails, editWorkDetails, getAcadamicDetails, getBusDetails, getDocumentsDetails, getFamilyDetails, getHostelDetails, getPersonalDetails, getWorkDetails
} from '../controllers/staff';


const router = express.Router();

router.put('/edit',adminMiddleware,editStudent);
router.delete('/:id',adminMiddleware, deleteUsers);
router.get("/search",authenticateToken, getAllStudents);
router.get("/",authenticateToken, getUserById);

router.get("/personal",adminMiddleware, getPersonalDetails);
router.put("/personal",adminMiddleware, editPersonalDetails);

router.get("/family",adminMiddleware, getFamilyDetails);
router.put("/family",adminMiddleware, editFamilyDetails);

router.get("/acadamic",adminMiddleware, getAcadamicDetails);
router.put("/acadamic",adminMiddleware, editAcadamicDetails);

router.get("/documents",adminMiddleware, getDocumentsDetails);
router.put("/documents",adminMiddleware, editDocumentsDetails);

router.get("/bus",adminMiddleware, getBusDetails);
router.put("/bus",adminMiddleware, editBusDetails);

router.get("/hostel",adminMiddleware, getHostelDetails);
router.put("/hostel",adminMiddleware, editHostelDetails);

router.get("/work",adminMiddleware, getWorkDetails);
router.put("/work",adminMiddleware, editWorkDetails);






export default router;
