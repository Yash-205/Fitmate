import { Router, Request, Response } from 'express';
import authRoutes from './authRoutes';

const router = Router();

// Auth Routes
router.use('/auth', authRoutes);

// Health check route
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'FitMate API is running' });
});

export default router;
