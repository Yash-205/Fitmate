
import { useState } from "react";
import {
    Calendar,
    Clock,
    Flame,
    TrendingUp,
    CheckCircle,
    Play,
    Target,
    Award,
    Star,
    User,
    MessageSquare,
    Video,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface MyWorkoutsTrainerPageProps {
    onOpenChat?: () => void;
    onViewTrainerProfile?: () => void;
}

export function MyWorkoutsTrainerPage({ onOpenChat, onViewTrainerProfile }: MyWorkoutsTrainerPageProps) {
    const [selectedDay, setSelectedDay] = useState(0);
    const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

    const trainer = {
        name: "Mike Johnson",
        specialization: "Strength Training",
        rating: 4.9,
        image: "MJ"
    };

    const weekPlan = [
        {
            day: "Monday",
            title: "Heavy Compound Day",
            duration: 60,
            calories: 450,
            difficulty: "Advanced",
            exercises: [
                { name: "Barbell Squats", sets: 5, reps: "5", weight: "225 lbs", trainerNote: "Go deep, focus on form. You're ready for this weight!" },
                { name: "Bench Press", sets: 5, reps: "5", weight: "185 lbs", trainerNote: "Keep your back tight. Explosive up, controlled down." },
                { name: "Deadlifts", sets: 3, reps: "5", weight: "275 lbs", trainerNote: "PR attempt today! You've got this!" },
                { name: "Overhead Press", sets: 4, reps: "8", weight: "95 lbs", trainerNote: "Press slightly back, engage core." },
                { name: "Barbell Rows", sets: 4, reps: "8", weight: "135 lbs", trainerNote: "Pull to lower chest, squeeze." }
            ],
            completed: 2
        },
        {
            day: "Tuesday",
            title: "Upper Body Volume",
            duration: 55,
            calories: 400,
            difficulty: "Intermediate",
            exercises: [
                { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", weight: "70 lbs", trainerNote: "Full range of motion" },
                { name: "Cable Flyes", sets: 3, reps: "12-15", weight: "40 lbs", trainerNote: "Feel the stretch" },
                { name: "Pull-ups", sets: 4, reps: "8-10", weight: "+25 lbs", trainerNote: "Add weight if too easy" },
                { name: "Face Pulls", sets: 4, reps: "15-20", weight: "30 lbs", trainerNote: "Great for posture" },
                { name: "Skull Crushers", sets: 3, reps: "12", weight: "60 lbs", trainerNote: "Keep elbows stable" },
                { name: "Preacher Curls", sets: 3, reps: "12", weight: "50 lbs", trainerNote: "Peak contraction" }
            ],
            completed: 0
        },
        {
            day: "Wednesday",
            title: "Active Recovery",
            duration: 30,
            calories: 200,
            difficulty: "Light",
            exercises: [
                { name: "Foam Rolling", sets: 1, reps: "10 min", weight: "-", trainerNote: "Hit all major muscles" },
                { name: "Stretching", sets: 1, reps: "15 min", weight: "-", trainerNote: "Hip flexors & shoulders" },
                { name: "Light Activity", sets: 1, reps: "20 min", weight: "-", trainerNote: "Walk or swim, stay under 120 bpm" }
            ],
            completed: 0
        },
        {
            day: "Thursday",
            title: "Lower Body Power",
            duration: 60,
            calories: 480,
            difficulty: "Advanced",
            exercises: [
                { name: "Front Squats", sets: 4, reps: "6-8", weight: "185 lbs", trainerNote: "Keep torso upright" },
                { name: "Romanian Deadlifts", sets: 4, reps: "8-10", weight: "185 lbs", trainerNote: "Hamstring stretch" },
                { name: "Bulgarian Split Squats", sets: 3, reps: "10 each", weight: "50 lbs", trainerNote: "Challenge balance" },
                { name: "Leg Press", sets: 3, reps: "15-20", weight: "360 lbs", trainerNote: "Quad burner!" },
                { name: "Calf Raises", sets: 4, reps: "15-20", weight: "135 lbs", trainerNote: "Full range, pause at top" }
            ],
            completed: 0
        },
        {
            day: "Friday",
            title: "Back & Shoulders",
            duration: 55,
            calories: 420,
            difficulty: "Intermediate",
            exercises: [
                { name: "Weighted Pull-ups", sets: 4, reps: "6-8", weight: "+25 lbs", trainerNote: "New weight challenge" },
                { name: "T-Bar Rows", sets: 4, reps: "10-12", weight: "135 lbs", trainerNote: "Pull to sternum" },
                { name: "Cable Rows", sets: 3, reps: "12-15", weight: "120 lbs", trainerNote: "Squeeze shoulder blades" },
                { name: "Dumbbell Shoulder Press", sets: 4, reps: "10", weight: "60 lbs", trainerNote: "Controlled movement" },
                { name: "Lateral Raises", sets: 4, reps: "12-15", weight: "25 lbs", trainerNote: "Perfect form" }
            ],
            completed: 0
        },
        {
            day: "Saturday",
            title: "Conditioning Circuit",
            duration: 45,
            calories: 500,
            difficulty: "Advanced",
            exercises: [
                { name: "Kettlebell Swings", sets: 4, reps: "20", weight: "53 lbs", trainerNote: "Hip power" },
                { name: "Box Jumps", sets: 4, reps: "12", weight: "24 inch", trainerNote: "Soft landings" },
                { name: "Battle Ropes", sets: 4, reps: "45s", weight: "-", trainerNote: "Max intensity" },
                { name: "Farmers Walk", sets: 3, reps: "50 yards", weight: "70 lbs", trainerNote: "Grip strength" }
            ],
            completed: 0
        },
        {
            day: "Sunday",
            title: "Rest Day",
            duration: 0,
            calories: 0,
            difficulty: "Rest",
            exercises: [],
            completed: 0
        }
    ];

    const currentWorkout = weekPlan[selectedDay];
    const weeklyProgress = weekPlan.reduce((sum, day) => sum + day.completed, 0);
    const totalExercises = weekPlan.reduce((sum, day) => sum + day.exercises.length, 0);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Advanced": return "bg-red-100 text-red-700 border-red-200";
            case "Intermediate": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Light": return "bg-green-100 text-green-700 border-green-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-24">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Trainer Header */}
                <Card className="mb-6 border-2 border-orange-200 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                                    {trainer.image}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-xl font-bold text-gray-900">{trainer.name}</h2>
                                        <Badge className="bg-gradient-to-r from-orange-600 to-purple-600 text-white">
                                            Your Trainer
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{trainer.specialization}</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                                        <span className="text-sm font-medium text-gray-900">{trainer.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={onOpenChat} className="hidden sm:flex">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Message
                                </Button>
                                <Button size="sm" variant="outline" className="hidden sm:flex">
                                    <Video className="h-4 w-4 mr-2" />
                                    Call
                                </Button>
                                <Button size="sm" variant="outline" onClick={onViewTrainerProfile}>
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                                <CheckCircle className="h-5 w-5 text-orange-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{weeklyProgress}/{totalExercises}</p>
                            <p className="text-xs text-gray-600">Completed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                                <Award className="h-5 w-5 text-purple-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">Week 3</p>
                            <p className="text-xs text-gray-600">Program</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                                <Flame className="h-5 w-5 text-orange-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">1,750</p>
                            <p className="text-xs text-gray-600">Calories</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                                <TrendingUp className="h-5 w-5 text-purple-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">+15%</p>
                            <p className="text-xs text-gray-600">Strength</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Week Calendar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-orange-600" />
                                    This Week
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {weekPlan.map((workout, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDay(index)}
                                        className={`w-full p-3 rounded-lg text-left transition-all ${selectedDay === index
                                                ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm ${selectedDay === index ? 'text-white' : 'text-gray-600'}`}>
                                                {workout.day}
                                            </span>
                                            {workout.completed > 0 && selectedDay !== index && (
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            )}
                                        </div>
                                        <p className={`text-sm font-medium ${selectedDay === index ? 'text-white/95' : 'text-gray-900'}`}>
                                            {workout.title}
                                        </p>
                                        {workout.duration > 0 && (
                                            <>
                                                <div className={`flex items-center gap-3 mt-2 text-xs ${selectedDay === index ? 'text-white/80' : 'text-gray-500'}`}>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {workout.duration}m
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Flame className="h-3 w-3" />
                                                        {workout.calories}
                                                    </span>
                                                </div>
                                                {workout.difficulty !== "Rest" && (
                                                    <Badge
                                                        variant="outline"
                                                        className={`mt-2 text-xs border ${selectedDay === index ? 'bg-white/20 text-white border-white/30' : getDifficultyColor(workout.difficulty)}`}
                                                    >
                                                        {workout.difficulty}
                                                    </Badge>
                                                )}
                                            </>
                                        )}
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="text-sm">Personal Records</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-green-50 rounded text-sm">
                                    <span className="text-gray-600">Bench Press</span>
                                    <span className="font-semibold text-gray-900">185 lbs</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-green-50 rounded text-sm">
                                    <span className="text-gray-600">Squat</span>
                                    <span className="font-semibold text-gray-900">225 lbs</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-orange-50 rounded text-sm">
                                    <span className="text-gray-600">Body Weight</span>
                                    <span className="font-semibold text-gray-900">-8 lbs</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Workout Detail */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-2xl">{currentWorkout.title}</CardTitle>
                                        <p className="text-sm text-gray-600 mt-1">{currentWorkout.day}</p>
                                    </div>
                                    {currentWorkout.duration > 0 && (
                                        <Button className="bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:from-orange-700 hover:to-purple-700 shadow-md">
                                            <Play className="h-4 w-4 mr-2" />
                                            Start
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {currentWorkout.duration === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                                            <Award className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl text-gray-900 mb-2">Rest Day</h3>
                                        <p className="text-gray-600">{trainer.name} scheduled a full rest day. Recovery is key to progress!</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Workout Info */}
                                        <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-100">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Clock className="h-4 w-4 text-orange-600" />
                                                    <span className="text-xs text-gray-600">Duration</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{currentWorkout.duration}m</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Flame className="h-4 w-4 text-purple-600" />
                                                    <span className="text-xs text-gray-600">Cal</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{currentWorkout.calories}</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Target className="h-4 w-4 text-orange-600" />
                                                    <span className="text-xs text-gray-600">Count</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{currentWorkout.exercises.length}</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Award className="h-4 w-4 text-purple-600" />
                                                    <span className="text-xs text-gray-600">Level</span>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 mt-1">{currentWorkout.difficulty}</p>
                                            </div>
                                        </div>

                                        {/* Trainer Note */}
                                        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-purple-50 border-l-4 border-orange-500 rounded-r-lg">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm">
                                                    {trainer.image}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{trainer.name}'s Note:</p>
                                                    <p className="text-sm text-gray-700">
                                                        You're crushing it! This week we're focusing on progressive overload. Track your weights carefully and push yourself!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Progress</span>
                                                <span className="text-sm font-medium text-gray-900">{currentWorkout.completed}/{currentWorkout.exercises.length} completed</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-orange-600 to-purple-600 transition-all duration-500"
                                                    style={{ width: `${(currentWorkout.completed / currentWorkout.exercises.length) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Exercises */}
                                        <div className="space-y-3">
                                            {currentWorkout.exercises.map((exercise, idx) => {
                                                const isExpanded = expandedExercise === idx;
                                                const isCompleted = idx < currentWorkout.completed;

                                                return (
                                                    <div key={idx} className={`border rounded-xl transition-all duration-200 ${isCompleted ? 'border-green-200 bg-green-50/50' : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-sm'
                                                        }`}>
                                                        <button
                                                            onClick={() => setExpandedExercise(isExpanded ? null : idx)}
                                                            className="w-full p-4 flex items-center justify-between group"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-600' : 'bg-gray-100 group-hover:bg-orange-100'
                                                                    }`}>
                                                                    {isCompleted ? (
                                                                        <CheckCircle className="h-5 w-5 text-white" />
                                                                    ) : (
                                                                        <span className="text-gray-500 text-sm font-medium group-hover:text-orange-600">{idx + 1}</span>
                                                                    )}
                                                                </div>
                                                                <div className="text-left">
                                                                    <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                                        {exercise.name}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {exercise.sets} sets × {exercise.reps} • {exercise.weight}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {isExpanded ? (
                                                                <ChevronUp className="h-5 w-5 text-gray-400" />
                                                            ) : (
                                                                <ChevronDown className="h-5 w-5 text-gray-400" />
                                                            )}
                                                        </button>

                                                        {isExpanded && (
                                                            <div className="px-4 pb-4">
                                                                <div className="pt-2 pb-4">
                                                                    <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                                                                        <User className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                                                        <div>
                                                                            <p className="text-xs font-semibold text-purple-700 mb-0.5">Trainer's Note</p>
                                                                            <p className="text-sm text-gray-700">{exercise.trainerNote}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {!isCompleted && (
                                                                    <Button size="sm" className="w-full bg-black text-white hover:bg-gray-800">
                                                                        Mark Complete
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
