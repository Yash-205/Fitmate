import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Users,
    Search,
    ArrowLeft,
    MessageSquare,
    Calendar,
    Edit,
    TrendingUp,
    TrendingDown,
    Activity,
    Target,
    FileText,
    Award,
    ChevronRight,
    Mail,
    Phone,
    CheckCircle,
    AlertTriangle,
    Star,
    Zap
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useNavigate } from "react-router-dom";

interface Client {
    id: string;
    name: string;
    avatar: string;
    goal: string;
    adherence: number;
    lastActive: string;
    status: "on-track" | "at-risk" | "new";
    email: string;
    phone: string;
    joinDate: string;
    sessionsCompleted: number;
    currentPlan: string;
    notes: string;
}

export function TrainerClients() {
    const navigate = useNavigate();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Mock client data
    const clients: Client[] = [
        {
            id: "1",
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1645081522795-231884bfcbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc0NjUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
        {
            id: "2",
            name: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1530029081-120107a0c377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzQ2NTAzOHww&ixlib=rb-4.1.0&q=80&w=1080",
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
        },
        {
            id: "3",
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1648863397001-cd77a7e98bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwd29tYW58ZW58MXx8fHwxNzY3NDY1MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
            goal: "Athletic Performance",
            adherence: 92,
            lastActive: "5 hours ago",
            status: "on-track",
            email: "emily.r@email.com",
            phone: "+1 (555) 345-6789",
            joinDate: "Nov 10, 2024",
            sessionsCompleted: 71,
            currentPlan: "Competition Prep - Phase 2",
            notes: "Excellent form on Olympic lifts. Ready to compete next month. Focus on recovery this week."
        },
        {
            id: "4",
            name: "Alex Martinez",
            avatar: "https://images.unsplash.com/photo-1734191979156-57972139dfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZW50aHVzaWFzdHxlbnwxfHx8fDE3Njc0NjUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            goal: "General Fitness",
            adherence: 45,
            lastActive: "4 days ago",
            status: "at-risk",
            email: "alex.m@email.com",
            phone: "+1 (555) 456-7890",
            joinDate: "Jan 5, 2025",
            sessionsCompleted: 12,
            currentPlan: "Beginner Full Body",
            notes: "Missed last 3 scheduled sessions. Need to reach out and discuss barriers. May need schedule adjustment."
        },
        {
            id: "5",
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1630415187965-236477b0b659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3Njc0NjUwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            goal: "Marathon Training",
            adherence: 89,
            lastActive: "3 hours ago",
            status: "on-track",
            email: "d.kim@email.com",
            phone: "+1 (555) 567-8901",
            joinDate: "Oct 20, 2024",
            sessionsCompleted: 85,
            currentPlan: "16-Week Marathon Prep",
            notes: "On track for sub-4 hour marathon. Watch for overtraining - HRV has been trending down slightly."
        },
        {
            id: "6",
            name: "Rachel Green",
            avatar: "https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrb3V0JTIwd29tYW4lMjBoYXBweXxlbnwxfHx8fDE3Njc0NjUwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
            goal: "Weight Loss",
            adherence: 62,
            lastActive: "2 days ago",
            status: "at-risk",
            email: "rachel.g@email.com",
            phone: "+1 (555) 678-9012",
            joinDate: "Dec 15, 2024",
            sessionsCompleted: 28,
            currentPlan: "12-Week Transformation",
            notes: "Logging has become inconsistent. Discussed stress at work affecting adherence. Need accountability check-in."
        },
        {
            id: "7",
            name: "Tom Anderson",
            avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3Mzg2MzczfDA&ixlib=rb-4.1.0&q=80&w=1080",
            goal: "Bodybuilding",
            adherence: 96,
            lastActive: "1 hour ago",
            status: "on-track",
            email: "tom.a@email.com",
            phone: "+1 (555) 789-0123",
            joinDate: "Sep 1, 2024",
            sessionsCompleted: 112,
            currentPlan: "Contest Prep - Final Phase",
            notes: "Amazing dedication. Competition in 2 weeks. Peak week protocol ready to implement."
        }
    ];

    // Top metrics
    const metrics = [
        {
            title: "Total Clients",
            value: clients.length.toString(),
            change: "+2",
            changeLabel: "this month",
            trend: "up",
            icon: Users,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "On Track",
            value: clients.filter(c => c.status === "on-track").length.toString(),
            change: "85%",
            changeLabel: "success rate",
            trend: "up",
            icon: TrendingUp,
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "At Risk",
            value: clients.filter(c => c.status === "at-risk").length.toString(),
            change: "2",
            changeLabel: "need attention",
            trend: "alert",
            icon: AlertTriangle,
            gradient: "from-red-500 to-orange-500"
        },
        {
            title: "Avg Adherence",
            value: Math.round(clients.reduce((sum, c) => sum + c.adherence, 0) / clients.length) + "%",
            change: "+8%",
            changeLabel: "vs last month",
            trend: "up",
            icon: Activity,
            gradient: "from-purple-500 to-indigo-500"
        }
    ];

    // Progress chart data for selected client
    const progressData = [
        { week: "Week 1", adherence: 75, performance: 68 },
        { week: "Week 2", adherence: 82, performance: 74 },
        { week: "Week 3", adherence: 88, performance: 79 },
        { week: "Week 4", adherence: 91, performance: 85 },
        { week: "Week 5", adherence: 89, performance: 88 },
        { week: "Week 6", adherence: 94, performance: 92 }
    ];

    const sessionHistoryData = [
        { month: "Aug", sessions: 12 },
        { month: "Sep", sessions: 15 },
        { month: "Oct", sessions: 18 },
        { month: "Nov", sessions: 16 },
        { month: "Dec", sessions: 19 },
        { month: "Jan", sessions: 14 }
    ];

    // Filter clients
    const filteredClients = clients.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.goal.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || client.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Client Profile View
    if (selectedClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-20 pb-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        className="mb-6 gap-2"
                        onClick={() => setSelectedClient(null)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Clients
                    </Button>

                    {/* Client Header Card */}
                    <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm mb-6 rounded-3xl">
                        <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img
                                            src={selectedClient.avatar}
                                            alt={selectedClient.name}
                                            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-orange-100 shadow-lg"
                                        />
                                        {selectedClient.status === "on-track" && (
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2 text-gray-900">{selectedClient.name}</h1>
                                        <p className="text-gray-600 mb-3">{selectedClient.goal}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {selectedClient.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {selectedClient.phone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button className="bg-gradient-to-r from-orange-600 to-purple-600 text-white gap-2 shadow-lg hover:shadow-xl transition-all rounded-xl">
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </Button>
                                    <Button variant="outline" className="gap-2 rounded-xl border-2">
                                        <Calendar className="w-4 h-4" />
                                        Schedule
                                    </Button>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                                    <p className="text-sm text-gray-600 mb-1">Adherence Rate</p>
                                    <p className="text-3xl font-bold mb-1 text-gray-900">{selectedClient.adherence}%</p>
                                    <p className="text-xs text-gray-500">Last 30 days</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                                    <p className="text-sm text-gray-600 mb-1">Sessions Done</p>
                                    <p className="text-3xl font-bold mb-1 text-gray-900">{selectedClient.sessionsCompleted}</p>
                                    <p className="text-xs text-gray-500">Total completed</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border border-orange-100">
                                    <p className="text-sm text-gray-600 mb-1">Last Active</p>
                                    <p className="text-lg font-bold mb-1 text-gray-900">{selectedClient.lastActive}</p>
                                    <p className="text-xs text-gray-500">Recent activity</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                                    <p className="text-sm text-gray-600 mb-1">Client Since</p>
                                    <p className="text-lg font-bold mb-1 text-gray-900">{selectedClient.joinDate}</p>
                                    <p className="text-xs text-gray-500">Member duration</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Left Column - Progress Charts */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Progress Tracking */}
                            <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardHeader className="bg-orange-50/50 border-b border-orange-100 px-8 py-6">
                                    <CardTitle className="flex items-center gap-3 text-orange-950">
                                        <div className="p-2.5 bg-orange-100 rounded-xl">
                                            <TrendingUp className="w-6 h-6 text-orange-600" />
                                        </div>
                                        Progress Tracking
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={progressData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="week" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="adherence"
                                                stroke="#f97316"
                                                strokeWidth={3}
                                                name="Adherence %"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="performance"
                                                stroke="#9333ea"
                                                strokeWidth={3}
                                                name="Performance Score"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Session History */}
                            <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardHeader className="bg-purple-50/50 border-b border-purple-100 px-8 py-6">
                                    <CardTitle className="flex items-center gap-3 text-purple-950">
                                        <div className="p-2.5 bg-purple-100 rounded-xl">
                                            <Calendar className="w-6 h-6 text-purple-600" />
                                        </div>
                                        Session History
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={sessionHistoryData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="sessions" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                                            <defs>
                                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.8} />
                                                </linearGradient>
                                            </defs>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Current Plan */}
                            <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardHeader className="bg-blue-50/50 border-b border-blue-100 px-8 py-6">
                                    <CardTitle className="flex items-center gap-3 text-blue-950">
                                        <div className="p-2.5 bg-blue-100 rounded-xl">
                                            <Target className="w-6 h-6 text-blue-600" />
                                        </div>
                                        Current Plan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold mb-2 text-gray-900">{selectedClient.currentPlan}</h3>
                                        <p className="text-sm text-gray-600 mb-4">Active since {selectedClient.joinDate}</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-medium">6 of 12 weeks</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div className="bg-gradient-to-r from-orange-600 to-purple-600 h-3 rounded-full shadow-lg" style={{ width: "50%" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full gap-2 hover:bg-blue-50 hover:border-blue-300 rounded-xl h-10 border-2">
                                        <FileText className="w-4 h-4" />
                                        View Full Plan
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Trainer Notes */}
                            <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardHeader className="bg-green-50/50 border-b border-green-100 px-8 py-6">
                                    <CardTitle className="flex items-center gap-3 text-green-950">
                                        <div className="p-2.5 bg-green-100 rounded-xl">
                                            <FileText className="w-6 h-6 text-green-600" />
                                        </div>
                                        Private Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
                                        <p className="text-sm text-gray-700 leading-relaxed">{selectedClient.notes}</p>
                                    </div>
                                    <Button variant="outline" className="w-full gap-2 hover:bg-green-50 hover:border-green-300 rounded-xl h-10 border-2">
                                        <Edit className="w-4 h-4" />
                                        Edit Notes
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Recent Milestones */}
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-600 to-purple-600 text-white rounded-3xl overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold">Recent Milestones</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                                <Star className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-medium">50 Sessions Milestone</p>
                                                <p className="text-xs text-white/70 mt-1">3 days ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                                <Zap className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-medium">Personal Best - Deadlift</p>
                                                <p className="text-xs text-white/70 mt-1">1 week ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Client List View
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Hero Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-6 mb-3">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-600 to-purple-600 flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-6">
                                    <Users className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                        My Clients
                                    </h1>
                                    <p className="text-gray-600 text-xl">Manage and track client progress</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button className="bg-gradient-to-r from-orange-600 to-purple-600 text-white gap-2 shadow-lg hover:shadow-xl transition-all rounded-xl h-12 px-6 font-medium">
                                <Users className="w-5 h-5" />
                                Add New Client
                            </Button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-8 max-w-2xl">
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search clients by name or goal..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-14 h-16 border-2 rounded-2xl text-lg shadow-sm focus:border-orange-300 transition-all"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        <Button
                            variant={filterStatus === "all" ? "default" : "outline"}
                            onClick={() => setFilterStatus("all")}
                            className={`rounded-xl h-10 px-6 font-medium border-2 ${filterStatus === "all" ? "bg-gradient-to-r from-orange-600 to-purple-600 text-white border-transparent" : "hover:border-orange-200"}`}
                        >
                            All Clients ({clients.length})
                        </Button>
                        <Button
                            variant={filterStatus === "on-track" ? "default" : "outline"}
                            onClick={() => setFilterStatus("on-track")}
                            className={`rounded-xl h-10 px-6 font-medium border-2 ${filterStatus === "on-track" ? "bg-green-600 text-white border-transparent" : "text-green-700 border-green-100 hover:bg-green-50"}`}
                        >
                            On Track
                        </Button>
                        <Button
                            variant={filterStatus === "at-risk" ? "default" : "outline"}
                            onClick={() => setFilterStatus("at-risk")}
                            className={`rounded-xl h-10 px-6 font-medium border-2 ${filterStatus === "at-risk" ? "bg-red-600 text-white border-transparent" : "text-red-700 border-red-100 hover:bg-red-50"}`}
                        >
                            At Risk
                        </Button>
                        <Button
                            variant={filterStatus === "new" ? "default" : "outline"}
                            onClick={() => setFilterStatus("new")}
                            className={`rounded-xl h-10 px-6 font-medium border-2 ${filterStatus === "new" ? "bg-blue-600 text-white border-transparent" : "text-blue-700 border-blue-100 hover:bg-blue-50"}`}
                        >
                            New
                        </Button>
                    </div>
                </div>

                {/* Top Metrics - Exact Copy from Trainer Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <div
                                key={index}
                                className="relative group h-full"
                            >
                                <Card className="relative hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 bg-white overflow-hidden rounded-3xl h-full">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.gradient} opacity-5 rounded-full -mr-16 -mt-16`} />
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-sm`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            {metric.trend === "up" && (
                                                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-bold">
                                                    <TrendingUp className="w-3.5 h-3.5" />
                                                    {metric.change}
                                                </div>
                                            )}
                                            {metric.trend === "alert" && (
                                                <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-xs font-bold">
                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                    {metric.change}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2 font-medium">{metric.title}</p>
                                            <p className="text-4xl font-bold mb-1 text-gray-900">{metric.value}</p>
                                            <p className="text-xs text-gray-500 font-medium">{metric.changeLabel}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* Clients List - Styled Like Today's Sessions */}
                <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                    <CardHeader className="bg-orange-50/50 border-b border-orange-100 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-3 text-orange-950">
                                <div className="p-2.5 bg-orange-100 rounded-xl">
                                    <Users className="w-6 h-6 text-orange-600" />
                                </div>
                                Client Directory
                            </CardTitle>
                            <Badge className="bg-white text-orange-700 shadow-sm hover:bg-orange-50 border-orange-100 px-3 py-1 text-sm">
                                {filteredClients.length} {filteredClients.length === 1 ? 'Client' : 'Clients'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="space-y-4">
                            {filteredClients.map((client) => (
                                <div
                                    key={client.id}
                                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${client.status === "at-risk"
                                        ? "bg-red-50/30 border-red-100 hover:border-red-300 hover:shadow-md"
                                        : "bg-white border-gray-100 hover:border-orange-300 hover:shadow-md hover:bg-orange-50/30"
                                        }`}
                                    onClick={() => navigate(`/trainer/clients/${client.id}`)}
                                >
                                    <div className="p-5">
                                        <div className="flex items-center gap-6">
                                            {/* Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={client.avatar}
                                                    alt={client.name}
                                                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-md"
                                                />
                                                {client.status === "on-track" && (
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                )}
                                                {client.status === "at-risk" && (
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                                        <AlertTriangle className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Client Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <h4 className="text-xl font-bold text-gray-900">{client.name}</h4>
                                                    <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full font-medium ${client.status === 'at-risk' ? 'bg-red-100 text-red-700' : 'bg-green-50 text-green-700'
                                                        }`}>
                                                        <Activity className="w-4 h-4" />
                                                        {client.adherence}% adherence
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <span className="text-gray-700 font-medium">{client.goal}</span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-gray-500">{client.sessionsCompleted} sessions</span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-gray-500">Last active {client.lastActive}</span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                <Button
                                                    size="sm"
                                                    className="bg-white text-orange-600 border-2 border-orange-100 hover:bg-orange-50 hover:border-orange-200 rounded-xl"
                                                >
                                                    View Details
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
