import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Layout,
    ArrowLeft,
    Clock,
    Users,
    Calendar,
    Target,
    List,
    Dumbbell,
    PlayCircle,
    Copy,
    Edit,
    MoreVertical,
    CheckCircle,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function TrainerViewPlan() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [expandedWeek, setExpandedWeek] = useState<string | null>("week1");

    // Mock Data simulating fetching by ID
    const plan = {
        title: "12-Week Hypertrophy",
        description: "A comprehensive program designed to maximize muscle growth through progressive overload and volume cycling. Suitable for intermediate lifters.",
        level: "Intermediate",
        duration: "12 Weeks",
        frequency: "4 Days / Week",
        category: "Muscle Gain",
        tags: ["Strength", "Volume", "Split"],
        stats: {
            activeClients: 8,
            completions: 45,
            rating: 4.8
        },
        schedule: [
            {
                id: "week1",
                week: "Week 1 - Accumulation",
                sessions: [
                    { id: 1, name: "Upper Body Power", exercises: 6, duration: "60 mins" },
                    { id: 2, name: "Lower Body Squat Focus", exercises: 5, duration: "60 mins" },
                    { id: 3, name: "Rest / Active Recovery", exercises: 0, duration: "-" },
                    { id: 4, name: "Upper Body Hypertrophy", exercises: 7, duration: "55 mins" },
                    { id: 5, name: "Lower Body Hinge Focus", exercises: 6, duration: "60 mins" }
                ]
            },
            {
                id: "week2",
                week: "Week 2 - Accumulation",
                sessions: [
                    { id: 6, name: "Upper Body Power", exercises: 6, duration: "60 mins" },
                    { id: 7, name: "Lower Body Squat Focus", exercises: 5, duration: "65 mins" }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 gap-2 text-gray-600 hover:text-blue-600"
                    onClick={() => navigate("/trainer/programs")}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Programs
                </Button>

                {/* Hero Card */}
                <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden mb-8">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-8">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-6">
                                <div className="p-4 bg-white/50 backdrop-blur rounded-2xl border border-white/50 shadow-sm h-fit">
                                    <Layout className="w-10 h-10 text-blue-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                            {plan.category}
                                        </Badge>
                                        <Badge variant="outline" className="text-gray-600 border-gray-300">
                                            {plan.level}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.title}</h1>
                                    <p className="text-gray-600 max-w-2xl leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="gap-2 rounded-xl border-2">
                                    <Copy className="w-4 h-4" />
                                    Clone
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-xl shadow-lg">
                                    <Edit className="w-4 h-4" />
                                    Edit Plan
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
                            <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                                <p className="text-sm text-gray-500 mb-1">Duration</p>
                                <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    {plan.duration}
                                </p>
                            </div>
                            <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                                <p className="text-sm text-gray-500 mb-1">Frequency</p>
                                <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                    <Calendar className="w-5 h-5 text-purple-500" />
                                    {plan.frequency}
                                </p>
                            </div>
                            <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                                <p className="text-sm text-gray-500 mb-1">Active Clients</p>
                                <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                    <Users className="w-5 h-5 text-green-500" />
                                    {plan.stats.activeClients}
                                </p>
                            </div>
                            <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                                <p className="text-sm text-gray-500 mb-1">Rating</p>
                                <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                    <Target className="w-5 h-5 text-orange-500" />
                                    {plan.stats.rating}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Schedule */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Program Schedule</h2>
                            <Button variant="outline" size="sm" className="rounded-xl">
                                Expand All
                            </Button>
                        </div>

                        {plan.schedule.map((week) => (
                            <Card key={week.id} className="border border-gray-100 shadow-md rounded-2xl overflow-hidden bg-white">
                                <div
                                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                                    onClick={() => setExpandedWeek(expandedWeek === week.id ? null : week.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                                            <List className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900">{week.week}</h3>
                                    </div>
                                    {expandedWeek === week.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </div>

                                {expandedWeek === week.id && (
                                    <div className="bg-gray-50/50 p-4 space-y-3">
                                        {week.sessions.map((session) => (
                                            <div key={session.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${session.exercises > 0 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                                                        <Dumbbell className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{session.name}</h4>
                                                        <p className="text-xs text-gray-500 flex items-center gap-2">
                                                            {session.exercises > 0 ? (
                                                                <>
                                                                    <span>{session.exercises} Exercises</span>
                                                                    <span>•</span>
                                                                    <span>{session.duration}</span>
                                                                </>
                                                            ) : "Rest Day"}
                                                        </p>
                                                    </div>
                                                </div>
                                                {session.exercises > 0 && (
                                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View Details
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    {/* Right: Assignments & Notes */}
                    <div className="space-y-6">
                        <Card className="border border-gray-100 shadow-lg rounded-3xl overflow-hidden bg-white">
                            <CardHeader className="bg-green-50/50 border-b border-green-100 p-6">
                                <CardTitle className="flex items-center gap-2 text-green-900">
                                    <Users className="w-5 h-5 text-green-600" />
                                    Active Assignments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">SJ</div>
                                            <span className="text-sm font-medium">Sarah Johnson</span>
                                        </div>
                                        <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">Week 4</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">MC</div>
                                            <span className="text-sm font-medium">Mike Chen</span>
                                        </div>
                                        <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">Week 2</Badge>
                                    </div>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md">
                                    Assign to Client
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
                            <h3 className="font-bold text-lg mb-2">Trainer's Note</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                "This block highlights metabolite accumulation. Ensure clients are hitting the RPE 8-9 targets on accessories to drive hypertrophy."
                            </p>
                            <Button variant="outline" size="sm" className="bg-transparent text-white border-gray-600 hover:bg-white/10 w-full">
                                Edit Notes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
