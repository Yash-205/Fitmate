import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Layout,
    Search,
    Plus,
    FileText,
    Users,
    Edit3,
    MoreVertical,
    Clock,
    Target,
    Zap,
    Brain,
    ChevronRight,
    Copy,
    Trash2,
    Filter,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Program {
    id: string;
    title: string;
    type: "template" | "active" | "draft";
    category: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    clientCount?: number;
    lastEdited: string;
    tags: string[];
}

export function TrainerPrograms() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"templates" | "active" | "drafts">("templates");
    const [searchQuery, setSearchQuery] = useState("");

    const programs: Program[] = [
        {
            id: "1",
            title: "12-Week Hypertrophy",
            type: "template",
            category: "Muscle Gain",
            duration: "12 Weeks",
            level: "Intermediate",
            lastEdited: "2 days ago",
            tags: ["Strength", "Volume", "Split"]
        },
        {
            id: "2",
            title: "Post-Injury Knee Rehab",
            type: "template",
            category: "Rehab",
            duration: "8 Weeks",
            level: "Beginner",
            lastEdited: "1 week ago",
            tags: ["Mobility", "Stability", "Low Impact"]
        },
        {
            id: "3",
            title: "Summer Shred 2025",
            type: "active",
            category: "Fat Loss",
            duration: "6 Weeks",
            level: "Advanced",
            clientCount: 12,
            lastEdited: "Yesterday",
            tags: ["HIIT", "Cardio", "Diet"]
        },
        {
            id: "4",
            title: "Marathon Prep - Phase 1",
            type: "active",
            category: "Endurance",
            duration: "16 Weeks",
            level: "Intermediate",
            clientCount: 4,
            lastEdited: "3 days ago",
            tags: ["Running", "Stamina"]
        },
        {
            id: "5",
            title: "Powerlifting Peaking Block",
            type: "draft",
            category: "Strength",
            duration: "4 Weeks",
            level: "Advanced",
            lastEdited: "Just now",
            tags: ["Heavy", "Competition"]
        }
    ];

    const filteredPrograms = programs.filter(p =>
        (activeTab === "templates" ? p.type === "template" :
            activeTab === "active" ? p.type === "active" :
                p.type === "draft") &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Hero Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-6 mb-3">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg transform -rotate-3 transition-transform hover:rotate-0">
                                    <Layout className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                        Program Library
                                    </h1>
                                    <p className="text-gray-600 text-xl">Manage your training IP and templates</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                onClick={() => navigate("/trainer/programs/create")}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white gap-2 shadow-lg hover:shadow-xl transition-all rounded-xl h-12 px-6 font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                Create New Plan
                            </Button>
                        </div>
                    </div>

                    {/* AI Assist Banner */}
                    <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-3xl"></div>
                        <div className="relative p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                                    <Brain className="w-8 h-8 text-blue-200" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">AI Program Assistant</h3>
                                    <p className="text-blue-100 max-w-xl">
                                        Need inspiration? Ask AI to "Optimize for beginner knee pain" or "Create a 15-min HIIT finisher".
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => navigate("/trainer/programs/create")}
                                className="bg-white text-indigo-900 hover:bg-blue-50 border-0 rounded-xl h-12 px-8 font-bold shadow-lg"
                            >
                                Try AI Builder
                                <Zap className="w-4 h-4 ml-2 fill-current" />
                            </Button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                        {/* Tabs */}
                        <div className="flex p-1.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl w-full md:w-auto self-start">
                            <button
                                onClick={() => setActiveTab("templates")}
                                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "templates"
                                    ? "bg-white text-blue-700 shadow-md"
                                    : "text-gray-600 hover:bg-white/50"}`}
                            >
                                Templates
                            </button>
                            <button
                                onClick={() => setActiveTab("active")}
                                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "active"
                                    ? "bg-white text-green-700 shadow-md"
                                    : "text-gray-600 hover:bg-white/50"}`}
                            >
                                Active Plans
                            </button>
                            <button
                                onClick={() => setActiveTab("drafts")}
                                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "drafts"
                                    ? "bg-white text-orange-700 shadow-md"
                                    : "text-gray-600 hover:bg-white/50"}`}
                            >
                                Drafts
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search programs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 border-gray-200 rounded-xl bg-white/80 focus:bg-white focus:border-blue-300 transition-all"
                            />
                        </div>
                    </div>

                    {/* Programs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrograms.map((program) => (
                            <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden hover:-translate-y-1">
                                <CardHeader className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge className={`rounded-lg px-3 py-1 font-medium ${program.level === "Advanced" ? "bg-red-100 text-red-700" :
                                            program.level === "Intermediate" ? "bg-orange-100 text-orange-700" :
                                                "bg-green-100 text-green-700"
                                            }`}>
                                            {program.level}
                                        </Badge>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                                <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                        {program.title}
                                    </CardTitle>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                        <Badge variant="outline" className="text-xs bg-white border-gray-200 text-gray-600">
                                            {program.category}
                                        </Badge>
                                        <span>•</span>
                                        <span>Last edited {program.lastEdited}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                {program.duration}
                                            </div>
                                            {program.type === "active" && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Users className="w-4 h-4 text-green-500" />
                                                    {program.clientCount} Active Clients
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {program.tags.map((tag, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-md font-medium border border-gray-100">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex gap-3">
                                            <Button
                                                onClick={() => navigate(`/trainer/programs/${program.id}`)}
                                                className="flex-1 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium h-10 group-hover:bg-blue-600 transition-colors"
                                            >
                                                View Plan
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                            {activeTab === "templates" && (
                                                <Button variant="outline" className="rounded-xl border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 h-10 px-4">
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Create New Card (Empty State) */}
                        <div
                            onClick={() => navigate("/trainer/programs/create")}
                            className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group h-full min-h-[300px]"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Plus className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Create {activeTab === 'templates' ? 'Template' : 'Plan'}</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mb-6">
                                Start from scratch or use our AI builder to generate a personalized structure.
                            </p>
                            <Button variant="outline" className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-100 font-medium">
                                Start Builder
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
