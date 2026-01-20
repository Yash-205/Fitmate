import {
    User,
    Mail,
    MapPin,
    Calendar,
    Target,
    Edit,
    Camera,
    Check,
    Dumbbell,
    Video,
    Clock,
    // Home,
    Building2,
    Heart,
    AlertCircle,
    Bell,
    MessageSquare,
    Bot,
    Lock,
    Pause,
    LogOut,
    // ChevronRight,
    // X,
    CheckCircle,
    // XCircle,
    Zap,
    TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { MyGymPage } from "./MyGymPage";
import { useAuth } from "../../contexts/AuthContext";

interface LearnerProfilePageProps {
    onBack?: () => void;
    // Variants: none, trainer-only, trainer-gym
    variant?: "none" | "trainer-only" | "trainer-gym";
}


export function LearnerProfilePage({
    onBack,
    variant = "none" // Defaulting to none, will determine dynamically
}: LearnerProfilePageProps) {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [aiAssistantEnabled, setAiAssistantEnabled] = useState(variant === "none");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showGymPage, setShowGymPage] = useState(false);

    if (showGymPage) {
        return <MyGymPage onBack={() => setShowGymPage(false)} />;
    }

    // Common learner data
    const learnerData = {
        name: user?.name || "Guest User",
        photo: user?.avatar || "https://images.unsplash.com/photo-1645081522795-231884bfcbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjczMzg3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        age: user?.age || 28,
        location: user?.gymLocation || "Los Angeles", // Mock or from user if added
        fitnessLevel: user?.activityLevel?.replace('_', ' ') || "Beginner",
        accountStatus: "Active",
        joinDate: "January 2024", // Mock

        // Personal Details
        height: user?.height ? `${user.height} cm` : "Not set",
        weight: user?.weight ? `${user.weight} kg` : "Not set",
        injuries: (user?.injuries && user.injuries.length > 0) ? user.injuries.join(", ") : "None reported",
        preferredWorkoutTime: "Morning (6-8 AM)", // Mock
        workoutLocation: "Home gym", // Mock

        // Goals
        primaryGoal: (user?.fitnessGoals && user.fitnessGoals[0]) || "General Fitness",
        secondaryGoal: (user?.fitnessGoals && user.fitnessGoals[1]) || "Sustainability",
        timeCommitment: "45 min/day", // Mock

        // Preferences
        trainerCommunication: "In-app messaging", // Mock
    };

    // Determine variant based on user data
    // logic: if user.trainerId exists -> trainer-only or trainer-gym
    // for now, we'll stick to 'none' if no explicit trainer, or allow props to override
    // In a real app, we would fetch the trainer details here.
    // For this demo, let's assume if there's a trainer ID, we show a mock trainer.
    const hasTrainer = !!user?.trainerId;
    const hasGym = !!user?.gymId;

    const effectiveVariant = hasTrainer && hasGym ? "trainer-gym" : (hasTrainer ? "trainer-only" : "none");

    // Mock trainer/gym data if they exist (since we don't have full relational data loaded in context)
    const trainerData = effectiveVariant !== "none" ? {
        name: "Mike Johnson", // Would fetch from user.trainerId
        photo: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluZXIlMjBtYW58ZW58MXx8fHwxNzY3NDM3NTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        specialization: "Strength & Conditioning",
        assignedSince: "Jan 15, 2024",
        planName: "Fat Loss Progressive",
        daysPerWeek: 5,
        planLocation: "Home",
        intensity: "Moderate",
        currentStreak: 12,
        lastSession: "Today",
        trainerCheckIn: "Completed"
    } : null;

    const gymData = effectiveVariant === "trainer-gym" ? {
        name: "PowerFit Gym", // Would fetch from user.gymId
        photo: "https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjczMzkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        location: "Downtown LA",
        membershipType: "Premium Monthly",
        validTill: "Dec 31, 2024",
        trainerAssignedAtGym: true,
        gymAccessStatus: "Active",
        equipmentLevel: "Full",
        trainerApprovedUsage: "All zones"
    } : null;

    const getProfileTone = () => {
        if (effectiveVariant === "none") return "You're independent, but help is available.";
        if (effectiveVariant === "trainer-only") return "You're guided and accountable.";
        return "You're in a structured, supervised environment.";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Cover Photo Effect */}
            <section className="relative bg-gradient-to-br from-orange-600 to-purple-600 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAwIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-white mb-2">Learner Profile</h1>
                                <p className="text-orange-100">{getProfileTone()}</p>
                            </div>
                            {onBack && (
                                <Button
                                    variant="outline"
                                    onClick={onBack}
                                    className="bg-transparent border-none text-white hover:bg-white hover:text-orange-600"
                                >
                                    Back
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Overlapping Cards */}
            <section className="-mt-20 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Profile Header Card - Featured */}
                        <Card className="border-gray-200 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-purple-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
                            <CardContent className="p-8 relative z-10">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                    {/* Profile Photo - Larger & More Prominent */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                                            <ImageWithFallback
                                                src={learnerData.photo}
                                                alt={learnerData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg transform hover:scale-110">
                                            <Camera className="h-5 w-5" />
                                        </button>
                                        <div className="absolute -top-2 -left-2">
                                            <Badge className="bg-green-500 text-white border-0 shadow-md">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                {learnerData.accountStatus}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h2 className="text-3xl text-gray-900 mb-2">{learnerData.name}</h2>
                                                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-4 w-4 text-orange-600" />
                                                        <span>{learnerData.age} years old</span>
                                                    </div>
                                                    <span className="text-gray-400">•</span>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4 text-purple-600" />
                                                        <span>{learnerData.location}</span>
                                                    </div>
                                                    <span className="text-gray-400">•</span>
                                                    <Badge className="bg-gradient-to-r from-orange-100 to-purple-100 text-orange-700 border-0">
                                                        {learnerData.fitnessLevel}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => setIsEditing(!isEditing)}
                                                className={isEditing
                                                    ? "bg-green-600 hover:bg-green-700 shadow-md"
                                                    : "bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 shadow-md"
                                                }
                                            >
                                                {isEditing ? (
                                                    <>
                                                        <Check className="h-4 w-4 mr-2" />
                                                        Save Changes
                                                    </>
                                                ) : (
                                                    <>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit Profile
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>Member since {learnerData.joinDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <Target className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl text-gray-900 truncate">{learnerData.primaryGoal}</p>
                                        <p className="text-xs text-gray-500">Primary Goal</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <Clock className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl text-gray-900">{learnerData.timeCommitment}</p>
                                        <p className="text-xs text-gray-500">Daily Time</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Dumbbell className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900">{learnerData.workoutLocation}</p>
                                        <p className="text-xs text-gray-500">Location</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900">{learnerData.preferredWorkoutTime}</p>
                                        <p className="text-xs text-gray-500">Pref. Time</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VARIANT: Trainer + Gym */}
                        {effectiveVariant === "trainer-gym" && trainerData && gymData && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Active Trainer Card - Enhanced with Image */}
                                <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-orange-600 to-orange-700"></div>
                                    <CardHeader className="border-b border-gray-100">
                                        <CardTitle className="flex items-center gap-2">
                                            <Video className="h-5 w-5 text-orange-600" />
                                            Active Trainer
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-orange-100 flex-shrink-0">
                                                <ImageWithFallback
                                                    src={trainerData.photo}
                                                    alt={trainerData.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg text-gray-900 mb-1">{trainerData.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{trainerData.specialization}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Since {trainerData.assignedSince}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <Button className="bg-orange-600 hover:bg-orange-700">
                                                <Video className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                            <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Message
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Gym Association Card - Enhanced with Image */}
                                <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-700"></div>
                                    <CardHeader className="border-b border-gray-100">
                                        <CardTitle className="flex items-center gap-2">
                                            <Building2 className="h-5 w-5 text-purple-600" />
                                            Gym Association
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-purple-100 flex-shrink-0">
                                                <ImageWithFallback
                                                    src={gymData.photo}
                                                    alt={gymData.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg text-gray-900 mb-1">{gymData.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {gymData.location}
                                                </p>
                                                <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                                                    {gymData.membershipType}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowGymPage(true)}>
                                                <Building2 className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                                                <Mail className="h-4 w-4 mr-2" />
                                                Contact
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* VARIANT: Trainer Only */}
                        {effectiveVariant === "trainer-only" && trainerData && (
                            <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-orange-600 to-orange-700"></div>
                                <CardHeader className="border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2">
                                        <Video className="h-5 w-5 text-orange-600" />
                                        Active Trainer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-orange-100 flex-shrink-0">
                                            <ImageWithFallback
                                                src={trainerData.photo}
                                                alt={trainerData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg text-gray-900 mb-1">{trainerData.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{trainerData.specialization}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Since {trainerData.assignedSince}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button className="bg-orange-600 hover:bg-orange-700">
                                            <Video className="h-4 w-4 mr-2" />
                                            View Trainer
                                        </Button>
                                        <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Message
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* VARIANT: No Trainer, No Gym */}
                        {effectiveVariant === "none" && (
                            <Card className="border-2 border-dashed border-orange-300 shadow-sm bg-gradient-to-br from-orange-50 to-purple-50">
                                <CardContent className="p-8 text-center">
                                    <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                                        <Zap className="h-10 w-10 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl text-gray-900 mb-2">Ready to Start Your Journey?</h3>
                                    <p className="text-gray-600 mb-6">Get personalized guidance from a trainer or start with AI coaching</p>

                                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                        <div className="p-6 bg-white rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                                            <Dumbbell className="h-8 w-8 text-orange-600 mb-3 mx-auto" />
                                            <h4 className="text-gray-900 mb-2">Get a Trainer</h4>
                                            <p className="text-sm text-gray-600 mb-4">Personal guidance for better results</p>
                                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                                Find a Trainer
                                            </Button>
                                        </div>

                                        <div className="p-6 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors">
                                            <Bot className="h-8 w-8 text-purple-600 mb-3 mx-auto" />
                                            <h4 className="text-gray-900 mb-2">AI-Guided Plan</h4>
                                            <p className="text-sm text-gray-600 mb-4">Start with AI coaching assistance</p>
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                                Explore Plans
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Two Column Layout for Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Personal Details */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-orange-600" />
                                            Personal Details
                                        </CardTitle>
                                        {isEditing && (
                                            <Badge className="bg-green-100 text-green-700 border-0">
                                                <Edit className="h-3 w-3 mr-1" />
                                                Editing
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Height</span>
                                            <span className="text-gray-900">{learnerData.height}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Weight</span>
                                            <span className="text-gray-900">{learnerData.weight}</span>
                                        </div>
                                        <div className="py-2">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertCircle className="h-4 w-4 text-orange-600" />
                                                <span className="text-sm text-gray-500">Injuries / Limitations</span>
                                            </div>
                                            <p className="text-gray-900 text-sm pl-6">{learnerData.injuries}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Goals */}
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="border-b border-gray-100 bg-gray-50">
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-purple-600" />
                                        Goals & Commitment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-gray-500 uppercase tracking-wide">Primary Goal</label>
                                            <div className="mt-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                                <p className="text-gray-900 flex items-center gap-2">
                                                    <Heart className="h-4 w-4 text-orange-600" />
                                                    {learnerData.primaryGoal}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 uppercase tracking-wide">Secondary Goal</label>
                                            <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                                <p className="text-gray-900">{learnerData.secondaryGoal}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preferences */}
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50">
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-orange-600" />
                                    Preferences & Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                                <Bell className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-900">Push Notifications</p>
                                                <p className="text-sm text-gray-500">Workout reminders and updates</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                            className={`relative w-14 h-7 rounded-full transition-colors ${notificationsEnabled ? 'bg-orange-600' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${notificationsEnabled ? 'translate-x-7' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                                <Bot className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-900">AI Assistant</p>
                                                <p className="text-sm text-gray-500">Enable AI coaching guidance</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setAiAssistantEnabled(!aiAssistantEnabled)}
                                            className={`relative w-14 h-7 rounded-full transition-colors ${aiAssistantEnabled ? 'bg-purple-600' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${aiAssistantEnabled ? 'translate-x-7' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Actions */}
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50">
                                <CardTitle>Account Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-3">
                                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50">
                                        <Lock className="h-4 w-4 mr-2" />
                                        Change Password
                                    </Button>
                                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50">
                                        <Pause className="h-4 w-4 mr-2" />
                                        Pause Training
                                    </Button>
                                    <Button variant="outline" className="justify-start border-red-300 text-red-600 hover:bg-red-50">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>
        </div>
    );
}
