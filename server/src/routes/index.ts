import { Router, Request, Response } from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import chatRoutes from './chatRoutes';

const router = Router();

// Auth Routes
router.use('/auth', authRoutes);

// Profile Routes
router.use('/profile', profileRoutes);

// Chat Routes
router.use('/chat', chatRoutes);

// Health check route
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'FitMate API is running' });
});

export default router;
