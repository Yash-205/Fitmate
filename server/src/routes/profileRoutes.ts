import express from 'express';
import { updateUserRole } from '../controllers/profileController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/role', protect, updateUserRole);

export default router;
