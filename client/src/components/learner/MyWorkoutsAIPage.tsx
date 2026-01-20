
import { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    Flame,
    TrendingUp,
    CheckCircle,
    Play,
    Sparkles,
    Target,
    ArrowRight,
    MessageSquare,
    Brain,
    ChevronDown,
    ChevronUp,
    Loader2,
    Edit,
    RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getWorkoutPlan, generateWorkoutPlan } from "../../services/api";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface MyWorkoutsAIPageProps {
    onOpenChatbot?: () => void;
    onFindTrainer?: () => void;
}

// Types matching the API response
interface APIExercise {
    name: string;
    sets: string;
    reps: string;
    notes?: string;
}

interface APIDayPlan {
    day: string;
    focus: string;
    exercises: APIExercise[];
}

interface APIWorkoutPlan {
    schedule: APIDayPlan[];
    goal: string;
    duration: string;
}

interface DailyWorkout {
    day: string;
    title: string;
    duration: number;
    calories: number;
    exercises: {
        name: string;
        sets: string; // Keep as string to handle ranges like "8-10"
        reps: string;
        aiTip: string;
    }[];
    completed: number; // Number of exercises completed
    totalExercises: number;
}

export function MyWorkoutsAIPage({ onOpenChatbot, onFindTrainer }: MyWorkoutsAIPageProps) {
    const [selectedDay, setSelectedDay] = useState(0);
    const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [weekPlan, setWeekPlan] = useState<DailyWorkout[]>([]);

    // Edit Mode State
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editFeedback, setEditFeedback] = useState("");

    useEffect(() => {
        fetchPlan();
    }, []);

    const transformAndSetPlan = (apiPlan: APIWorkoutPlan) => {
        if (apiPlan && apiPlan.schedule) {
            const transformedPlan: DailyWorkout[] = apiPlan.schedule.map((day) => ({
                day: day.day,
                title: day.focus,
                duration: day.exercises.length * 10,
                calories: day.exercises.length * 80,
                exercises: day.exercises.map(ex => ({
                    name: ex.name,
                    sets: ex.sets,
                    reps: ex.reps,
                    aiTip: ex.notes || "Focus on form and controlled movements."
                })),
                completed: 0,
                totalExercises: day.exercises.length
            }));
            setWeekPlan(transformedPlan);
        }
    };

    const fetchPlan = async () => {
        try {
            setLoading(true);
            const response = await getWorkoutPlan();
            const apiPlan = response.data as APIWorkoutPlan;
            transformAndSetPlan(apiPlan);
        } catch (error) {
            console.error("Error fetching plan:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            const response = await generateWorkoutPlan({});
            const apiPlan = response.data as APIWorkoutPlan;
            transformAndSetPlan(apiPlan);
            toast.success("Workout plan generated successfully!");
        } catch (error) {
            console.error("Generation error:", error);
            toast.error("Failed to generate plan.");
        } finally {
            setGenerating(false);
        }
    };

    const handleEditPlan = async () => {
        if (!editFeedback.trim()) return;

        try {
            setGenerating(true);
            setIsEditOpen(false);

            // Construct a simplified version of the current plan to send as context
            const simplifiedPlan = {
                schedule: weekPlan.map(day => ({
                    day: day.day,
                    focus: day.title,
                    exercises: day.exercises.map(ex => ({
                        name: ex.name,
                        sets: ex.sets,
                        reps: ex.reps,
                        notes: ex.aiTip
                    }))
                }))
            };

            const response = await generateWorkoutPlan({
                feedback: editFeedback,
                currentPlan: simplifiedPlan
            });

            const apiPlan = response.data as APIWorkoutPlan;
            transformAndSetPlan(apiPlan);
            toast.success("Plan updated successfully!");
            setEditFeedback(""); // Reset feedback
        } catch (error) {
            console.error("Edit error:", error);
            toast.error("Failed to update plan.");
        } finally {
            setGenerating(false);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
            </div>
        );
    }

    // Fallback if no plan
    if (!weekPlan.length) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 pt-24 flex flex-col items-center justify-center">
                <Sparkles className="h-12 w-12 text-orange-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Plan Found</h2>
                <p className="text-gray-600 mb-6">Ask our AI to generate a workout plan for you.</p>
                <Button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="bg-orange-600 hover:bg-orange-700"
                >
                    {generating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        "Generate Plan with AI"
                    )}
                </Button>
            </div>
        )
    }

    const currentWorkout = weekPlan[selectedDay] || weekPlan[0];
    const weeklyProgress = weekPlan.reduce((sum, day) => sum + day.completed, 0);
    const totalExercises = weekPlan.reduce((sum, day) => sum + day.totalExercises, 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-24">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-orange-600 to-purple-600 flex items-center justify-center">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl text-gray-900">My Workouts</h1>
                            <p className="text-gray-600 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-orange-600" />
                                AI-Powered Workout Plan
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="bg-white border-orange-200 hover:bg-orange-50 text-orange-700">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Plan
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Your Workout Plan</DialogTitle>
                                    <DialogDescription>
                                        Tell the AI how you'd like to adjust your current schedule.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="feedback">Your Request</Label>
                                        <Textarea
                                            id="feedback"
                                            placeholder="e.g., 'Make the leg workouts harder', 'I don't have a barbell anymore', 'Swap Saturday to a rest day'"
                                            value={editFeedback}
                                            onChange={(e) => setEditFeedback(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleEditPlan} disabled={generating} className="bg-orange-600 hover:bg-orange-700">
                                        {generating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        Update Plan
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button
                            variant="outline"
                            onClick={handleGenerate}
                            disabled={generating}
                            className="bg-white"
                        >
                            {generating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                            Regenerate
                        </Button>
                    </div>
                </div>

                {/* Upgrade Banner */}
                <Card className="mb-6 bg-gradient-to-r from-orange-50 via-purple-50 to-orange-50 border-2 border-orange-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg text-gray-900 mb-1">Want Expert Guidance?</h3>
                                <p className="text-sm text-gray-600">Get a personal trainer for customized plans and accountability</p>
                            </div>
                            <Button
                                className="bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:from-orange-700 hover:to-purple-700 shadow-sm"
                                onClick={onFindTrainer}
                            >
                                Find a Trainer
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
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
                            <p className="text-2xl text-gray-900">{weeklyProgress}/{totalExercises}</p>
                            <p className="text-xs text-gray-600">Completed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                                <Flame className="h-5 w-5 text-purple-600" />
                            </div>
                            <p className="text-2xl text-gray-900">1,150</p>
                            <p className="text-xs text-gray-600">Calories (Est.)</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                                <Clock className="h-5 w-5 text-orange-600" />
                            </div>
                            <p className="text-2xl text-gray-900">3h 15m</p>
                            <p className="text-xs text-gray-600">Time (Est.)</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                                <TrendingUp className="h-5 w-5 text-purple-600" />
                            </div>
                            <p className="text-2xl text-gray-900">+12%</p>
                            <p className="text-xs text-gray-600">Consistency</p>
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
                                            : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
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
                                        )}
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        <Button
                            variant="outline"
                            className="w-full mt-4 border-orange-200 text-orange-700 hover:bg-orange-50"
                            onClick={onOpenChatbot}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Ask AI Coach
                        </Button>
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
                                            Start Workout
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {currentWorkout.duration === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                                            <Sparkles className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl text-gray-900 mb-2">Rest & Recover</h3>
                                        <p className="text-gray-600">Your body needs time to grow stronger. Enjoy your day off!</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Workout Info */}
                                        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-100">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Clock className="h-4 w-4 text-orange-600" />
                                                    <span className="text-xs text-gray-600">Duration</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{currentWorkout.duration} min</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Flame className="h-4 w-4 text-purple-600" />
                                                    <span className="text-xs text-gray-600">Calories</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{currentWorkout.calories}</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <Target className="h-4 w-4 text-orange-600" />
                                                    <span className="text-xs text-gray-600">Exercises</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">{currentWorkout.exercises.length}</p>
                                            </div>
                                        </div>

                                        {/* AI Insight */}
                                        <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                                            <div className="flex items-start gap-3">
                                                <Brain className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 mb-1">AI Coach Says:</p>
                                                    <p className="text-sm text-gray-700">
                                                        Based on your goal, focus on maintaining intensity throughout these exercises.
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
                                                                        {exercise.sets} sets × {exercise.reps} reps
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
                                                                        <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                                                        <div>
                                                                            <p className="text-xs font-semibold text-purple-700 mb-0.5">AI Tip</p>
                                                                            <p className="text-sm text-gray-700">{exercise.aiTip}</p>
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
