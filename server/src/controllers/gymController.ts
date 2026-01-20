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
// Get Gym Members (Learners)
// Get Gym Members (Learners)
export const getMyMembers = async (req: Request, res: Response) => {
    try {
        const gymId = (req as any).user._id;
        const members = await User.find({ role: 'learner', gymId: gymId })
            .select('-password')
            .populate('trainerId', 'name'); // Populate trainer name

        // Enrich with stats
        const membersWithStats = await Promise.all(members.map(async (member) => {
            // Get Last Visit
            const lastWorkout = await import('../models/Workout').then(m => m.default.findOne({
                userId: member._id,
                status: 'completed'
            }).sort({ date: -1 }));

            const lastVisit = lastWorkout ? lastWorkout.date : member.createdAt;

            // Calculate Attendance (visits in last 30 days)
            const startOfMonth = new Date();
            startOfMonth.setDate(startOfMonth.getDate() - 30);

            const monthlyVisits = await import('../models/Workout').then(m => m.default.countDocuments({
                userId: member._id,
                date: { $gte: startOfMonth },
                status: 'completed'
            }));

            // Calculate Attendance Score (e.g., target 12 visits/month = 100%)
            const attendance = Math.min(Math.round((monthlyVisits / 12) * 100), 100);

            // Determine Status based on attendance
            let status = 'Active';
            if (monthlyVisits === 0) status = 'Risk';
            else if (monthlyVisits < 4) status = 'Slowing Down';

            return {
                ...member.toObject(),
                lastVisit,
                attendance,
                status,
                plan: 'Premium Monthly' // Still static as we lack a Plan model, but at least consistent
            };
        }));

        res.json(membersWithStats);
    } catch (error) {
        console.error('Error fetching gym members:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Gym Trainers
// Get Gym Trainers
export const getMyTrainers = async (req: Request, res: Response) => {
    try {
        const gymId = (req as any).user._id;
        const trainers = await User.find({ role: 'trainer', gymId: gymId }).select('-password');

        // Enrich with stats
        const trainersWithStats = await Promise.all(trainers.map(async (trainer) => {
            // Count active clients
            const clientCount = await User.countDocuments({ trainerId: trainer._id });

            // Count sessions this week
            const startOfWeek = new Date();
            startOfWeek.setHours(0, 0, 0, 0);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

            const sessionsThisWeek = await import('../models/Workout').then(m => m.default.countDocuments({
                trainerId: trainer._id,
                date: { $gte: startOfWeek }
            }));

            // Mock revenue for now as we don't have a Payment model yet, but could estimate from completed sessions
            // Assuming $50 per session
            const completedSessions = await import('../models/Workout').then(m => m.default.countDocuments({
                trainerId: trainer._id,
                status: 'completed'
            }));
            const revenueGenerated = completedSessions * 50;

            // Calculate busy percentage (mock logic based on clients)
            const busyPercentage = Math.min(Math.round((clientCount / 20) * 100), 100);

            return {
                ...trainer.toObject(),
                clients: clientCount,
                sessionsThisWeek,
                busyPercentage,
                revenueGenerated
            };
        }));

        res.json(trainersWithStats);
    } catch (error) {
        console.error('Error fetching gym trainers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Member Details
export const getMemberDetails = async (req: Request, res: Response) => {
    try {
        const memberId = req.params.id;
        const member = await User.findById(memberId).select('-password');

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Fetch recent workouts
        const recentActivity = await import('../models/Workout').then(m => m.default.find({
            userId: memberId,
            status: 'completed'
        }).sort({ date: -1 }).limit(5));

        // Calculate stats
        const totalVisits = await import('../models/Workout').then(m => m.default.countDocuments({
            userId: memberId,
            status: 'completed'
        }));

        const startOfMonth = new Date();
        startOfMonth.setHours(0, 0, 0, 0);
        startOfMonth.setDate(1);

        const monthlyVisits = await import('../models/Workout').then(m => m.default.countDocuments({
            userId: memberId,
            date: { $gte: startOfMonth },
            status: 'completed'
        }));

        // Mock attendance score logic (e.g., target 12 visits/month)
        const attendanceScore = Math.min(Math.round((monthlyVisits / 12) * 100), 100);

        // Generate mock payment history based on join date
        const paymentHistory = [];
        const joinDate = new Date(member.createdAt);
        const currentDate = new Date();
        let dateIterator = new Date(currentDate);

        // Go back up to 6 months
        for (let i = 0; i < 6; i++) {
            if (dateIterator < joinDate) break;

            paymentHistory.push({
                date: dateIterator.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
                item: "Monthly Membership",
                amount: "$89.00",
                status: "Paid"
            });

            // Move back one month
            dateIterator.setMonth(dateIterator.getMonth() - 1);
        }

        res.json({
            ...member.toObject(),
            recentActivity,
            paymentHistory, // Added this
            stats: {
                totalVisits,
                monthlyVisits,
                attendanceScore
            }
        });

    } catch (error) {
        console.error('Error fetching member details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Trainer Details
export const getTrainerDetails = async (req: Request, res: Response) => {
    try {
        const trainerId = req.params.id;
        const trainer = await User.findById(trainerId).select('-password');

        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        // Start of week for weekly stats
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        // Calculate Stats
        const clientCount = await User.countDocuments({ trainerId: trainerId });

        const sessionsThisWeek = await import('../models/Workout').then(m => m.default.countDocuments({
            trainerId: trainerId,
            date: { $gte: startOfWeek }
        }));

        const completedSessions = await import('../models/Workout').then(m => m.default.countDocuments({
            trainerId: trainerId,
            status: 'completed'
        }));

        const revenueGenerated = completedSessions * 50; // Mock $50/session
        const attendanceRate = 95; // Placeholder/Mock
        const workingHours = "9:00 AM - 5:00 PM"; // Placeholder

        res.json({
            ...trainer.toObject(),
            stats: {
                clients: clientCount,
                sessionsThisWeek,
                revenueGenerated,
                attendanceRate,
                workingHours
            }
        });

    } catch (error) {
        console.error('Error fetching trainer details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
