import { Request, Response } from 'express';
import User from '../models/User';

import Workout from '../models/Workout';
import Goal from '../models/Goal';

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
                console.log('Trainer found:', trainer);
                dashboardData.trainer = trainer;
            } else {
                console.log('No trainerId for user');
            }
            // Fetch Gym details
            if (user.gymId) {
                const gym = await User.findById(user.gymId).select('name email avatar gymName gymLocation facilities');
                console.log('Gym found:', gym);
                dashboardData.gym = gym;
            } else {
                console.log('No gymId for user');
            }

            // Fetch Workouts
            const recentWorkouts = await Workout.find({ userId }).sort({ date: -1 }).limit(5);
            const upcomingWorkouts = await Workout.find({
                userId,
                date: { $gte: new Date() },
                status: 'scheduled'
            }).sort({ date: 1 }).limit(3);

            dashboardData.recentWorkouts = recentWorkouts;
            dashboardData.upcomingWorkouts = upcomingWorkouts;

            // Fetch Goals
            const goals = await Goal.find({ userId });
            dashboardData.goals = goals;

            // Calculate Stats
            const completedWorkouts = await Workout.countDocuments({ userId, status: 'completed' });

            // Calculate Streak
            const pastWorkouts = await Workout.find({
                userId,
                status: 'completed',
                date: { $lt: new Date() }
            }).sort({ date: -1 });

            let streak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Check if worked out today
            const workedOutToday = pastWorkouts.some(w => {
                const wDate = new Date(w.date);
                wDate.setHours(0, 0, 0, 0);
                return wDate.getTime() === today.getTime();
            });

            if (workedOutToday) streak++;

            // Check previous days
            let currentDate = new Date(today);
            if (!workedOutToday) currentDate.setDate(currentDate.getDate() - 1); // Start checking from yesterday if not today

            for (let i = 0; i < pastWorkouts.length; i++) {
                const workoutDate = new Date(pastWorkouts[i].date);
                workoutDate.setHours(0, 0, 0, 0);

                const diffTime = Math.abs(currentDate.getTime() - workoutDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 0) continue; // Same day, skip
                if (diffDays === 1) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break; // Streak broken
                }
            }

            // Calculate Weight Progress (from Weight Loss goals)
            const weightGoal = goals.find(g => g.title === 'Weight Loss');
            const weightProgress = weightGoal ? weightGoal.currentValue : 0;

            dashboardData.stats = {
                workoutsCompleted: completedWorkouts,
                goalsAchieved: goals.filter(g => g.status === 'achieved').length,
                streak: streak,
                weightProgress: weightProgress
            };

        } else if (user.role === 'trainer') {
            // Fetch Clients with detailed stats
            const clients = await User.find({ trainerId: userId }).select('name email avatar fitnessGoals profileCompleted createdAt');

            // Enrich clients with their latest workout and goal status
            const clientsWithDetails = await Promise.all(clients.map(async (client) => {
                const latestWorkout = await Workout.findOne({ userId: client._id, status: 'completed' }).sort({ date: -1 });
                const goals = await Goal.find({ userId: client._id });
                const completedWorkoutsCount = await Workout.countDocuments({ userId: client._id, status: 'completed' });

                return {
                    ...client.toObject(),
                    latestWorkout,
                    goals,
                    stats: {
                        completedWorkouts: completedWorkoutsCount,
                        activeGoals: goals.filter(g => g.status === 'in-progress').length
                    }
                };
            }));

            dashboardData.clients = clientsWithDetails;

            // Calculate Trainer Stats
            const totalClients = clients.length;
            const activeClients = clients.filter(c => c.profileCompleted).length;

            // Avg Progress (based on goal completion)
            let totalGoals = 0;
            let achievedGoals = 0;
            clientsWithDetails.forEach(c => {
                c.goals.forEach((g: any) => {
                    totalGoals++;
                    if (g.status === 'achieved') achievedGoals++;
                });
            });
            const avgProgress = totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0;

            dashboardData.stats = {
                totalClients,
                activeClients,
                avgProgress,
                needsAttention: clients.filter(c => !c.profileCompleted).length
            };

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

            // Calculate Gym Stats
            // 1. Avg Attendance: Mock calculation based on recent workouts by gym members
            // Get all member IDs
            const memberIds = members.map(m => m._id);
            // Count workouts by these members in last 7 days
            const last7Days = new Date();
            last7Days.setDate(last7Days.getDate() - 7);

            const recentGymWorkouts = await Workout.countDocuments({
                userId: { $in: memberIds },
                date: { $gte: last7Days },
                status: 'completed'
            });

            // Avg attendance % = (workouts / (members * 7)) * 100
            // Cap at 100% and handle 0 members
            const avgAttendance = members.length > 0
                ? Math.min(Math.round((recentGymWorkouts / (members.length * 3)) * 100), 100) // Assuming target 3 workouts/week
                : 0;

            // 2. Revenue
            const monthlyRevenue = members.length * 50; // $50/member

            // 3. Recent Activity (for Analytics section)
            // Get recent workouts by members
            const recentActivity = await Workout.find({
                userId: { $in: memberIds },
                status: 'completed'
            })
                .sort({ date: -1 })
                .limit(5)
                .populate('userId', 'name avatar');

            dashboardData.stats = {
                avgAttendance,
                monthlyRevenue,
                revenueGrowth: 12, // Placeholder
                attendanceGrowth: 5, // Placeholder
                recentActivity
            };
        }

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
