import { Router } from 'express';
import { createWorkoutPlan, getWorkoutPlan } from '../controllers/workoutPlanController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/generate', protect, createWorkoutPlan);
router.get('/current', protect, getWorkoutPlan);

export default router;
