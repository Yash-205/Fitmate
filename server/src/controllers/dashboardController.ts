import { Request, Response } from 'express';
import User from '../models/User';

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let dashboardData: any = {
            user: user,
        };

        if (user.role === 'learner') {
            // Fetch Trainer details
            if (user.trainerId) {
                const trainer = await User.findById(user.trainerId).select('name email avatar specializations');
                dashboardData.trainer = trainer;
            }
            // Fetch Gym details
            if (user.gymId) {
                const gym = await User.findById(user.gymId).select('name email avatar gymName gymLocation facilities');
                dashboardData.gym = gym;
            }
        } else if (user.role === 'trainer') {
            // Fetch Clients
            const clients = await User.find({ trainerId: userId }).select('name email avatar fitnessGoals profileCompleted createdAt');
            dashboardData.clients = clients;

            // Fetch Gym details
            if (user.gymId) {
                const gym = await User.findById(user.gymId).select('name email avatar gymName gymLocation facilities');
                dashboardData.gym = gym;
            }
        } else if (user.role === 'gymowner') {
            // Fetch Trainers
            const trainers = await User.find({ gymId: userId, role: 'trainer' }).select('name email avatar specializations certifications');
            dashboardData.trainers = trainers;

            // Fetch Members (Learners)
            const members = await User.find({ gymId: userId, role: 'learner' }).select('name email avatar fitnessGoals profileCompleted createdAt');
            dashboardData.members = members;
        }

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
