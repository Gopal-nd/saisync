
import  express from 'express';
import { createCertificate, deleteCertificates, getCertificate, getCertificateById, updateCertificates } from '../controllers/students-activities/certificates';
import { authenticateToken } from '../middleware/auth';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/students-activities/project.controller';
import { getAllTrips,createExperianceTrip,deleteTrip,getTripById,updateTrip } from '../controllers/students-activities/exp-tip.controller';

const router = express.Router();

router.get("/certificate",authenticateToken, getCertificate);
router.get("/certificate/:id",authenticateToken, getCertificateById);
router.delete("/certificate/:id",authenticateToken, deleteCertificates);
router.post("/certificate/new",authenticateToken, createCertificate);
router.put("/certificate/edit",authenticateToken, updateCertificates);

router.get("/project", authenticateToken, getAllProjects);
router.get("/project/:id", authenticateToken, getProjectById);
router.post("/project/new", authenticateToken, createProject);
router.put("/project/edit/:id", authenticateToken, updateProject);
router.delete("/project/:id", authenticateToken, deleteProject);

router.get("/exp-trip", authenticateToken, getAllTrips);
router.get("/exp-trip/:id", authenticateToken, getTripById);
router.post("/exp-trip/new", authenticateToken, createExperianceTrip);
router.put("/exp-trip/edit/:id", authenticateToken, updateTrip);
router.delete("/exp-trip/:id", authenticateToken, deleteTrip);

export default router;
