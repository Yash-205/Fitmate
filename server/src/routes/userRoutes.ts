import { Router } from 'express';
import { updateUserProfile } from '../controllers/profileController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// PUT /api/users/profile
router.put('/profile', protect, updateUserProfile);

export default router;
