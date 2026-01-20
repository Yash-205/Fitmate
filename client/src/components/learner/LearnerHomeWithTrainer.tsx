
import { useState, useEffect } from "react";
import api from "../../services/api";
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
    Star,
    Sparkles,
    Trophy,
    ArrowRight,
    Users,
    Zap,
    Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";

interface LearnerHomeWithTrainerProps {
    onNavigateToWorkouts?: () => void;
    onNavigateToMyTrainer?: () => void;
    onNavigateToGyms?: () => void;
    onNavigateToProgress?: () => void;
}

export function LearnerHomeWithTrainer({
    onNavigateToWorkouts,
    onNavigateToMyTrainer,
    onNavigateToGyms,
    onNavigateToProgress
}: LearnerHomeWithTrainerProps) {
    const userName = "Sarah";

    const trainer = {
        name: "Mike Johnson",
        avatar: "MJ",
        specialty: "Strength & Conditioning"
    };

    const todaysWorkout = {
        title: "Upper Body Power",
        duration: 45,
        intensity: "High",
        status: "Pending",
        exercises: 6,
        calories: 420,
        location: "Home",
        equipmentAvailable: true
    };

    const nextSession = {
        date: "Tomorrow",
        time: "10:00 AM",
        mode: "Video Call",
        hoursUntil: 18
    };

    const todaysSchedule = [
        {
            time: "9:00 AM",
            type: "Morning Routine",
            title: "Warm-up & Mobility",
            description: "10 min stretch routine",
            icon: Target,
            color: "orange"
        },
        {
            time: "2:00 PM",
            type: "Main Workout",
            title: "Upper Body Power",
            description: "At home training",
            icon: Dumbbell,
            color: "purple"
        },
        {
            time: "6:30 PM",
            type: "Trainer Session",
            title: "Video Check-in",
            description: "with Mike",
            icon: Video,
            color: "green"
        }
    ];

    const progressData = {
        weekStreak: 5,
        workoutsThisWeek: 4,
        totalWorkouts: 7,
        homeWorkouts: 4,
        lastSevenDays: [
            { day: "Mon", workout: true, gym: false },
            { day: "Tue", workout: true, gym: false },
            { day: "Wed", workout: false, gym: false },
            { day: "Thu", workout: true, gym: false },
            { day: "Fri", workout: true, gym: false },
            { day: "Sat", workout: false, gym: false },
            { day: "Sun", workout: false, gym: false }
        ]
    };

    const notifications = [
        {
            type: "trainer",
            message: "Great form on those push-ups yesterday! Ready to add resistance today? 💪",
            time: "2h ago"
        },
        {
            type: "tip",
            message: "Pro tip: A gym membership could unlock 3x faster results with proper equipment!",
            time: "1d ago"
        }
    ];

    const [nearbyGyms, setNearbyGyms] = useState<any[]>([]);

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const response = await api.get('/gyms');
                // Transform API data to component format
                // In a real app, we would calculate distance based on user location
                const gyms = (response.data as any[]).map((gym: any) => ({
                    _id: gym._id,
                    name: gym.gymName,
                    distance: "2.5 mi", // Placeholder as we don't have geo-location
                    rating: 4.8, // Default or mock if not in API
                    price: "$49/mo", // Default or mock
                    amenities: gym.facilities?.slice(0, 3).join(" • ") || "Weights • Cardio",
                    image: gym.avatar || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
                })).slice(0, 3); // Take first 3

                setNearbyGyms(gyms);
            } catch (error) {
                console.error("Failed to fetch gyms", error);
            }
        };

        fetchGyms();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
                                🔥 {progressData.weekStreak} Day Streak Going Strong!
                            </div>
                            <h1 className="text-gray-900">
                                Ready to Train, {userName}!
                            </h1>
                            <p className="text-gray-600">
                                {trainer.name} has designed today's perfect home workout for you.
                                Let's build on yesterday's progress and keep that momentum going!
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
                                <Button variant="outline" className="border-gray-300" onClick={onNavigateToMyTrainer}>
                                    <Video className="h-4 w-4 mr-2" />
                                    Message {trainer.name.split(' ')[0]}
                                </Button>
                            </div>
                            <div className="flex gap-8 pt-4">
                                <div>
                                    <div className="text-orange-600">{progressData.workoutsThisWeek}/{progressData.totalWorkouts}</div>
                                    <div className="text-gray-600">Workouts Done</div>
                                </div>
                                <div>
                                    <div className="text-orange-600">{progressData.homeWorkouts}</div>
                                    <div className="text-gray-600">Home Sessions</div>
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
                                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                                    alt="Workout Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                        {trainer.avatar}
                                    </div>
                                    <div>
                                        <div className="text-gray-900">{trainer.name}</div>
                                        <div className="text-sm text-gray-600">{trainer.specialty}</div>
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
                                <span className="text-sm">Ready at {todaysWorkout.location}</span>
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
                                            🏠 {todaysWorkout.location}
                                        </Badge>
                                        {todaysWorkout.equipmentAvailable && (
                                            <Badge className="bg-green-100 text-green-700 border-0">
                                                ✓ Bodyweight Ready
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
                                    onClick={onNavigateToMyTrainer}
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

                        {/* Next Trainer Session */}
                        <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all mb-8">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <Calendar className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-gray-900">Next Trainer Session</CardTitle>
                                        <p className="text-sm text-gray-600">Video call with {trainer.name}</p>
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
                                                        <Video className="h-3 w-3" />
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
                                            onClick={onNavigateToMyTrainer}
                                        >
                                            <Calendar className="h-4 w-4 mr-2" />
                                            View All Sessions
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Progress & Updates */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Progress */}
                            <Card className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-gray-900 mb-1">Your Week</CardTitle>
                                            <p className="text-sm text-gray-600">{progressData.homeWorkouts} home sessions this week</p>
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
                                                </div>
                                                {day.workout && (
                                                    <div className="text-xs text-green-600 mt-1">
                                                        Home
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
                                                    : "bg-purple-50"
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <Badge className={`${notif.type === "trainer"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-purple-100 text-purple-700"
                                                        } border-0 text-xs`}>
                                                        {notif.type === "trainer" ? "From " + trainer.name.split(' ')[0] : "Training Tip"}
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

            {/* Unlock Your Potential - Gym Discovery */}
            <section className="py-20 md:py-32 bg-gradient-to-br from-orange-50 via-white to-purple-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full mb-6">
                                <Sparkles className="h-4 w-4 text-orange-600" />
                                <span className="text-sm text-gray-700">Take Your Training Further</span>
                            </div>
                            <h2 className="text-gray-900 mb-6">
                                Ready for the Next Level?
                            </h2>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                You're doing amazing training at home! Imagine what you could achieve with access to
                                professional equipment, group energy, and a full gym environment.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {nearbyGyms.map((gym, idx) => (
                                <Card
                                    key={idx}
                                    className="border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        <ImageWithFallback
                                            src={gym.image}
                                            alt={gym.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-xl text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                    {gym.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                    <MapPin className="h-4 w-4 text-orange-600" />
                                                    {gym.distance} from you
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3">{gym.amenities}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                                                <span className="text-gray-900">{gym.rating}</span>
                                            </div>
                                            <div className="text-xl text-orange-600">{gym.price}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 shadow-xl"
                                onClick={onNavigateToGyms}
                            >
                                <Dumbbell className="h-5 w-5 mr-2" />
                                Explore All Gyms Near You
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                            <p className="text-sm text-gray-600 mt-4">
                                Find the perfect gym to complement your training with {trainer.name}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
