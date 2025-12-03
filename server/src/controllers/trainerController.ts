import { Request, Response } from 'express';
import User from '../models/User';

// Get all trainers (users with role 'trainer')
export const getTrainers = async (req: Request, res: Response) => {
    try {
        const trainers = await User.find({ role: 'trainer' })
            .select('-password')
            .populate('gymId', 'gymName gymLocation');

        res.json(trainers);
    } catch (error) {
        console.error('Error fetching trainers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single trainer by ID
export const getTrainerById = async (req: Request, res: Response) => {
    try {
        const trainer = await User.findOne({ _id: req.params.id, role: 'trainer' })
            .select('-password')
            .populate('gymId', 'gymName gymLocation avatar');

        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        // Get clients associated with this trainer
        const clients = await User.find({ role: 'learner', trainerId: trainer._id }).select('-password');

        res.json({
            ...trainer.toObject(),
            clients,
            clientCount: clients.length
        });
    } catch (error) {
        console.error('Error fetching trainer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
