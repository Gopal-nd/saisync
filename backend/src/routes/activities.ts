
import  express from 'express';
import { createCertificate, getCertificate, getCertificateById, updateCertificates } from '../controllers/students-activites';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get("/certificate",authenticateToken, getCertificate);
router.get("/certificate/:id",authenticateToken, getCertificateById);
router.post("/certificate/new",authenticateToken, createCertificate);
router.put("/certificate/edit",authenticateToken, updateCertificates);

export default router;
