import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { logWorkout, scheduleWorkout, getWorkouts } from '../controllers/workoutController';

const router = Router();

// All routes are protected
router.use(protect);

router.post('/log', logWorkout);
router.post('/schedule', scheduleWorkout);
router.get('/', getWorkouts);

export default router;
