
import {
    Play,
    Video,
    Calendar,
    TrendingUp,
    Flame,
    MapPin,
    ChevronRight,
    Clock,
    Target,
    Dumbbell,
    CheckCircle,
    Bell,
    Users,
    Sparkles,
    Trophy,
    ArrowRight,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

interface LearnerHomeWithTrainerAndGymProps {
    onNavigateToWorkouts?: () => void;
    onNavigateToMyTrainer?: () => void;
    onNavigateToGym?: () => void;
    onNavigateToProgress?: () => void;
    onNavigateToSchedule?: () => void;
}

export function LearnerHomeWithTrainerAndGym({
    onNavigateToWorkouts,
    onNavigateToMyTrainer,
    onNavigateToGym,
    onNavigateToProgress,
    onNavigateToSchedule
}: LearnerHomeWithTrainerAndGymProps) {
    const { user } = useAuth();
    const [trainer, setTrainer] = useState<any>(null);
    const [gym, setGym] = useState<any>(null);
    const userName = user?.name?.split(' ')[0] || "Learner";

    useEffect(() => {
        const fetchData = async () => {
            if (user?.gymId) {
                try {
                    const gymRes = await api.get(`/gyms/${user.gymId}`);
                    const gymData = gymRes.data as any;
                    setGym({
                        name: gymData.gymName || gymData.name,
                        location: gymData.gymLocation || "Main Location",
                        distance: "0.5 mi", // Placeholder
                        image: gymData.avatar,
                        rating: 4.8, // Default since User model doesn't track this yet
                        price: gymData.monthlyPrice ? `$${gymData.monthlyPrice}/mo` : "$49/mo",
                        amenities: gymData.facilities?.join(" • ") || "Weights • Cardio • WiFi",
                        memberCount: gymData.totalMembers || 200
                    });
                } catch (err) {
                    console.error("Error fetching gym", err);
                }
            }

            if (user?.trainerId) {
                try {
                    const trainerRes = await api.get(`/trainers/${user.trainerId}`);
                    const trainerData = trainerRes.data as any;
                    // Ensure we handle the response structure correctly.
                    // Assuming the API returns the trainer object directly or nested.
                    // Based on TrainerProfile components, it seems to be direct or standard rest.
                    setTrainer({
                        name: trainerData.name,
                        avatar: trainerData.name.split(' ').map((n: string) => n[0]).join(''),
                        specialty: trainerData.specializations?.[0] || "Fitness Coach"
                    });
                } catch (err) {
                    console.error("Error fetching trainer", err);
                }
            }
        };

        fetchData();
    }, [user?.gymId, user?.trainerId]);

    const todaysWorkout = {
        title: "Lower Body Strength",
        duration: 55,
        intensity: "High",
        status: "Pending",
        exercises: 7,
        calories: 520,
        location: "Gym",
        equipmentAvailable: true
    };

    // If we have a trainer, show trainer-related sessions. Defaults otherwise.
    const nextSession = trainer ? {
        date: "Tomorrow",
        time: "10:00 AM",
        mode: "In-Person",
        hoursUntil: 18
    } : null;

    const todaysSchedule = [
        {
            time: "9:00 AM",
            type: "Open Gym",
            title: "Strength Training",
            description: "Full gym access",
            icon: Dumbbell,
            color: "orange"
        },
        // Only show trainer session if trainer exists
        ...(trainer ? [{
            time: "2:00 PM",
            type: "Trainer Session",
            title: "Personal Training",
            description: "with " + (trainer.name.split(' ')[0]),
            icon: Users,
            color: "purple"
        }] : []),
        {
            time: "6:30 PM",
            type: "Group Class",
            title: "HIIT Circuit",
            description: "Advanced level",
            icon: Zap,
            color: "green"
        }
    ];

    const progressData = {
        weekStreak: 6,
        workoutsThisWeek: 5,
        totalWorkouts: 7,
        gymVisits: 4,
        lastSevenDays: [
            { day: "Mon", workout: true, gym: true },
            { day: "Tue", workout: true, gym: true },
            { day: "Wed", workout: false, gym: false },
            { day: "Thu", workout: true, gym: true },
            { day: "Fri", workout: true, gym: true },
            { day: "Sat", workout: true, gym: false },
            { day: "Sun", workout: false, gym: false }
        ]
    };

    const notifications = [
        ...(trainer ? [{
            type: "trainer",
            message: "Amazing progress on squats yesterday! Let's push for 5 more lbs today 💪",
            time: "2h ago"
        }] : []),
        {
            type: "gym",
            message: "New equipment arriving this week - power racks upgraded!",
            time: "1d ago"
        }
    ];

    if (!gym) {
        return <div className="min-h-screen pt-24 text-center">Loading your gym experience...</div>;
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
                                🔥 {progressData.weekStreak} Day Streak - You're Crushing It!
                            </div>
                            <h1 className="text-gray-900">
                                Let's Own Today, {userName}!
                            </h1>
                            <p className="text-gray-600">
                                Your workout at {gym.name} is ready.
                                {trainer ? ` ${trainer.name} has fine-tuned everything for maximum results.` : " Time to show up and dominate!"}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="bg-orange-600 hover:bg-orange-700"
                                    onClick={onNavigateToWorkouts}
                                >
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Today's Workout
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="border-gray-300" onClick={onNavigateToGym}>
                                    <MapPin className="h-4 w-4 mr-2" />
                                    View Gym Details
                                </Button>
                            </div>
                            <div className="flex gap-8 pt-4">
                                <div>
                                    <div className="text-orange-600">{progressData.workoutsThisWeek}/{progressData.totalWorkouts}</div>
                                    <div className="text-gray-600">Workouts Done</div>
                                </div>
                                <div>
                                    <div className="text-orange-600">{progressData.gymVisits}</div>
                                    <div className="text-gray-600">Gym Visits</div>
                                </div>
                                <div>
                                    <div className="text-orange-600">{Math.round((progressData.workoutsThisWeek / progressData.totalWorkouts) * 100)}%</div>
                                    <div className="text-gray-600">Weekly Goal</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <ImageWithFallback
                                    src={gym.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                                    alt="Gym Training"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900">{gym.name}</div>
                                        <div className="text-sm text-gray-600">{gym.distance} away</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Your Team Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className={`grid md:grid-cols-${trainer ? '2' : '1'} gap-6`}>
                            {trainer && (
                                <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center text-xl text-orange-600">
                                                {trainer.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-600">Your Trainer</div>
                                                <div className="text-xl text-gray-900">{trainer.name}</div>
                                                <div className="text-sm text-orange-600">{trainer.specialty}</div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={onNavigateToMyTrainer}
                                                className="border-gray-300"
                                            >
                                                <Video className="h-4 w-4 mr-2" />
                                                Connect
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center">
                                            <MapPin className="h-8 w-8 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-600">Training At</div>
                                            <div className="text-xl text-gray-900">{gym.name}</div>
                                            <div className="text-sm text-orange-600">{gym.location} • {gym.distance}</div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onNavigateToGym}
                                            className="border-gray-300"
                                        >
                                            <MapPin className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Today's Focus Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-gray-900 mb-4">Today's Focus</h2>
                            <p className="text-gray-600">Your complete training plan for today</p>
                        </div>

                        {/* Today's Workout - Featured */}
                        <Card className="border-2 border-orange-300 hover:border-orange-500 hover:shadow-2xl transition-all mb-8 overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-2 rounded-bl-xl">
                                <Sparkles className="h-4 w-4 inline mr-1" />
                                <span className="text-sm">Ready at {gym.name}</span>
                            </div>
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                                            <Dumbbell className="h-7 w-7 text-orange-600" />
                                        </div>
                                        <CardTitle className="text-2xl text-gray-900 mb-2">Today's Workout</CardTitle>
                                        <p className="text-lg text-gray-600">{todaysWorkout.title}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Badge className="bg-orange-100 text-orange-600 border-0">
                                            📍 {todaysWorkout.location}
                                        </Badge>
                                        {todaysWorkout.equipmentAvailable && (
                                            <Badge className="bg-green-100 text-green-700 border-0">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Equipment Ready
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-4 gap-4 mb-6">
                                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                                        <Clock className="h-5 w-5 text-orange-600 mx-auto mb-2" />
                                        <div className="text-2xl text-gray-900 mb-1">{todaysWorkout.duration}</div>
                                        <div className="text-xs text-gray-600">minutes</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                                        <Flame className="h-5 w-5 text-orange-600 mx-auto mb-2" />
                                        <div className="text-lg text-gray-900 mb-1">{todaysWorkout.intensity}</div>
                                        <div className="text-xs text-gray-600">intensity</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                                        <Target className="h-5 w-5 text-orange-600 mx-auto mb-2" />
                                        <div className="text-2xl text-gray-900 mb-1">{todaysWorkout.exercises}</div>
                                        <div className="text-xs text-gray-600">exercises</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                                        <Zap className="h-5 w-5 text-orange-600 mx-auto mb-2" />
                                        <div className="text-2xl text-gray-900 mb-1">{todaysWorkout.calories}</div>
                                        <div className="text-xs text-gray-600">calories</div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                                    onClick={onNavigateToWorkouts}
                                >
                                    <Play className="h-5 w-5 mr-2" />
                                    Start Training Session
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Today's Schedule */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl text-gray-900 mb-1">Today's Schedule</h3>
                                    <p className="text-gray-600">Your complete plan for the day</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onNavigateToSchedule}
                                    className="text-orange-600"
                                >
                                    Full Calendar
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {todaysSchedule.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <Card
                                            key={idx}
                                            className="border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all group"
                                        >
                                            <CardContent className="p-6">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color === "orange" ? "bg-orange-100" :
                                                    item.color === "purple" ? "bg-purple-100" :
                                                        "bg-green-100"
                                                    }`}>
                                                    <Icon className={`h-6 w-6 ${item.color === "orange" ? "text-orange-600" :
                                                        item.color === "purple" ? "text-purple-600" :
                                                            "text-green-600"
                                                        }`} />
                                                </div>
                                                <div className={`text-sm mb-2 ${item.color === "orange" ? "text-orange-600" :
                                                    item.color === "purple" ? "text-purple-600" :
                                                        "text-green-600"
                                                    }`}>
                                                    {item.time}
                                                </div>
                                                <h4 className="text-lg text-gray-900 mb-1">{item.title}</h4>
                                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                                <Badge variant="outline" className="border-0 bg-gray-100 text-xs">
                                                    {item.type}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Next Trainer Session - Only if trainer exists */}
                        {nextSession && trainer && (
                            <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all mb-8">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-gray-900">Next Trainer Session</CardTitle>
                                            <p className="text-sm text-gray-600">One-on-one with {trainer.name}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                                            <div className="text-center">
                                                <div className="text-5xl text-orange-600 mb-2">{nextSession.hoursUntil}h</div>
                                                <div className="text-sm text-gray-600 mb-4">until your session</div>
                                                <div className="space-y-2 text-left">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">When</span>
                                                        <span className="text-gray-900">{nextSession.date}, {nextSession.time}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Type</span>
                                                        <span className="text-gray-900 flex items-center gap-1">
                                                            <Users className="h-3 w-3" />
                                                            {nextSession.mode}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center gap-3">
                                            <Button
                                                variant="outline"
                                                className="border-gray-300"
                                                onClick={onNavigateToMyTrainer}
                                            >
                                                <Video className="h-4 w-4 mr-2" />
                                                Message {trainer.name.split(' ')[0]}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border-gray-300"
                                                onClick={onNavigateToSchedule}
                                            >
                                                <Calendar className="h-4 w-4 mr-2" />
                                                View All Sessions
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Progress & Updates */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Progress */}
                            <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-gray-900 mb-1">Your Week</CardTitle>
                                            <p className="text-sm text-gray-600">{progressData.gymVisits} gym visits this week</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={onNavigateToProgress}
                                            className="text-orange-600"
                                        >
                                            Full Stats
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-7 gap-2">
                                        {progressData.lastSevenDays.map((day, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                                                <div className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all relative ${day.workout
                                                    ? 'bg-orange-100'
                                                    : 'bg-gray-50 border border-dashed border-gray-300'
                                                    }`}>
                                                    {day.workout && <Trophy className="h-5 w-5 text-orange-600" />}
                                                    {day.gym && day.workout && (
                                                        <div className="absolute bottom-0.5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                                                        </div>
                                                    )}
                                                </div>
                                                {day.workout && (
                                                    <div className="text-xs text-green-600 mt-1">
                                                        {day.gym ? "Gym" : "Home"}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Updates */}
                            <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5 text-orange-600" />
                                        Recent Updates
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {notifications.map((notif, idx) => (
                                            <div
                                                key={idx}
                                                className={`rounded-xl p-4 ${notif.type === "trainer"
                                                    ? "bg-orange-50"
                                                    : "bg-gray-50"
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <Badge className={`${notif.type === "trainer"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-gray-200 text-gray-700"
                                                        } border-0 text-xs`}>
                                                        {notif.type === "trainer" && trainer ? "From " + trainer.name.split(' ')[0] : "Gym Update"}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500">{notif.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">{notif.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
