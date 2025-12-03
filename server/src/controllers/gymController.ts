import { Request, Response } from 'express';
import User from '../models/User';

// Get all gyms (users with role 'gymowner')
export const getGyms = async (req: Request, res: Response) => {
    try {
        const gyms = await User.find({ role: 'gymowner' }).select('-password');
        res.json(gyms);
    } catch (error) {
        console.error('Error fetching gyms:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single gym by ID
export const getGymById = async (req: Request, res: Response) => {
    try {
        const gym = await User.findOne({ _id: req.params.id, role: 'gymowner' }).select('-password');

        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }

        // Get trainers associated with this gym
        const trainers = await User.find({ role: 'trainer', gymId: gym._id }).select('-password');

        // Get members associated with this gym
        const members = await User.find({ role: 'learner', gymId: gym._id }).select('-password');

        res.json({
            ...gym.toObject(),
            trainers,
            members,
            memberCount: members.length
        });
    } catch (error) {
        console.error('Error fetching gym:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
