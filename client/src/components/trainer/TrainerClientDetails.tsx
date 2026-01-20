import {
    User,
    MapPin,
    Clock,
    Target,
    Edit,
    Camera,
    Check,
    Dumbbell,
    Video,
    Building2,
    Heart,
    AlertCircle,
    Bell,
    MessageSquare,
    Bot,
    Lock,
    Pause,
    LogOut,
    CheckCircle,
    Zap,
    TrendingUp,
    CreditCard,
    Calendar,
    ChevronRight,
    UserCog,
    AlertTriangle,
    Percent,
    PauseCircle,
    Phone,
    FileText,
    Activity,
    Mail,
    Award,
    Star,
    Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Progress } from "../ui/progress";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

// Mock Data (In real app, fetch by ID)
const mockClients = {
    "1": {
        id: "1",
        name: "Sarah Johnson",
        photo: "https://images.unsplash.com/photo-1645081522795-231884bfcbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc0NjUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        coverPhoto: "https://images.unsplash.com/photo-1574680096141-1cddd32e24f7?w=1000&auto=format&fit=crop&q=80",
        goal: "Build Muscle & Strength",
        adherence: 94,
        lastActive: "2 hours ago",
        status: "on-track",
        email: "sarah.j@email.com",
        phone: "+1 (555) 123-4567",
        joinDate: "Jan 15, 2025",
        sessionsCompleted: 48,
        currentPlan: "12-Week Strength Building",
        notes: "Very motivated. Responding well to progressive overload. Increase weight on compound lifts next week."
    },
    "2": {
        id: "2",
        name: "Mike Chen",
        photo: "https://images.unsplash.com/photo-1530029081-120107a0c377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzQ2NTAzOHww&ixlib=rb-4.1.0&q=80&w=1080",
        coverPhoto: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1000&auto=format&fit=crop&q=80",
        goal: "Fat Loss & Conditioning",
        adherence: 87,
        lastActive: "1 day ago",
        status: "on-track",
        email: "mchen@email.com",
        phone: "+1 (555) 234-5678",
        joinDate: "Dec 1, 2024",
        sessionsCompleted: 62,
        currentPlan: "8-Week HIIT Protocol",
        notes: "Great progress on cardio endurance. Consider adding more strength work to maintain muscle mass during cut."
    }
};

// Mock Chart Data
const progressData = [
    { week: "Week 1", adherence: 75, performance: 68 },
    { week: "Week 2", adherence: 82, performance: 74 },
    { week: "Week 3", adherence: 88, performance: 79 },
    { week: "Week 4", adherence: 91, performance: 85 },
    { week: "Week 5", adherence: 89, performance: 88 },
    { week: "Week 6", adherence: 94, performance: 92 }
];

export function TrainerClientDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // @ts-ignore
    const client = mockClients[id as keyof typeof mockClients] || mockClients["1"];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Cover Photo */}
            <section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <ImageWithFallback
                        src={client.coverPhoto}
                        alt="Client Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <Button
                                    variant="ghost"
                                    className="text-white/70 hover:text-white hover:bg-white/10 pl-0 mb-4"
                                    onClick={() => navigate(-1)}
                                >
                                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back to Clients
                                </Button>
                                <h1 className="text-white mb-2 text-3xl font-bold">Client Profile</h1>
                                <p className="text-blue-100">Track progress, manage plans, and notes</p>
                            </div>
                            <Badge className={`border-0 text-sm px-3 py-1 ${client.status === 'on-track' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {client.status === 'on-track' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                                {client.status === 'on-track' ? 'On Track' : 'At Risk'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Overlapping Cards */}
            <section className="-mt-20 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Profile Header Card */}
                        <Card className="border-0 shadow-xl relative overflow-hidden bg-white/95 backdrop-blur-sm">
                            <CardContent className="p-8 relative z-10">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                    {/* Profile Photo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                                            <ImageWithFallback
                                                src={client.photo}
                                                alt={client.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h2 className="text-3xl text-gray-900 mb-2 font-bold">{client.name}</h2>
                                                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Target className="h-4 w-4 text-blue-600" />
                                                        <span>{client.goal}</span>
                                                    </div>
                                                    <span className="text-gray-400">•</span>
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="h-4 w-4 text-gray-400" />
                                                        <span>{client.email}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                                                    <Clock className="h-4 w-4" /> Last active: {client.lastActive}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Message
                                                </Button>
                                                <Button variant="outline" className="bg-white hover:bg-gray-50">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    Schedule
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-green-100 rounded-full mb-2">
                                        <Activity className="h-5 w-5 text-green-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{client.adherence}%</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Adherence</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-blue-100 rounded-full mb-2">
                                        <Dumbbell className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{client.sessionsCompleted}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Sessions</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-purple-100 rounded-full mb-2">
                                        <Target className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <p className="text-lg font-bold text-gray-900 truncate px-2">{client.currentPlan}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Current Plan</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-orange-100 rounded-full mb-2">
                                        <Calendar className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{client.joinDate}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Start Date</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Progress Chart */}
                            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                        Progress Tracking
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={progressData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis dataKey="week" hide />
                                                <YAxis hide />
                                                <Tooltip />
                                                <Line
                                                    type="monotone"
                                                    dataKey="adherence"
                                                    stroke="#2563eb"
                                                    strokeWidth={3}
                                                    dot={{ r: 4, fill: "#2563eb" }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                        <span>Week 1</span>
                                        <span>Week 6</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Private Notes */}
                            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <FileText className="w-5 h-5 text-gray-600" />
                                            Trainer Notes
                                        </CardTitle>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit className="w-4 h-4 text-gray-500" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-4">
                                        <p className="text-gray-700 italic text-sm leading-relaxed">"{client.notes}"</p>
                                    </div>
                                    <Button variant="outline" className="w-full justify-center gap-2 h-10 bg-white hover:bg-gray-50 border-gray-200">
                                        View History
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Plan Management */}
                        <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                            <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Settings className="w-5 h-5 text-gray-600" />
                                    Plan Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button variant="outline" className="justify-center gap-2 h-12 bg-white hover:bg-blue-50 hover:border-blue-200 border-gray-200">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                        Edit Workout Plan
                                    </Button>
                                    <Button variant="outline" className="justify-center gap-2 h-12 bg-white hover:bg-green-50 hover:border-green-200 border-gray-200">
                                        <Bot className="w-4 h-4 text-green-500" />
                                        Generate New Plan (AI)
                                    </Button>
                                    <Button variant="outline" className="justify-center gap-2 h-12 bg-white hover:border-red-200 hover:bg-red-50 text-red-600 border-gray-200">
                                        <PauseCircle className="w-4 h-4" />
                                        Pause Training
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
