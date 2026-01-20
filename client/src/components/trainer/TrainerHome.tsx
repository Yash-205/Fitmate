import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Users,
    Calendar,
    DollarSign,
    FileCheck,
    Clock,
    CheckCircle,
    AlertTriangle,
    TrendingDown,
    Zap,
    Activity,
    ChevronRight,
    PlayCircle,
    MessageSquare,
    Phone,
    Mail,
    TrendingUp,
    Award,
    Star,
    Brain,
    User,
    Bell,
    Target
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";

export function TrainerHome() {
    const { user } = useAuth();
    const [selectedSession, setSelectedSession] = useState<string | null>(null);

    // Use user's name if available, otherwise default
    const firstName = user?.name?.split(' ')[0] || "Trainer";

    // Mock data - in real app, this would come from API
    const metrics = [
        {
            title: "Active Clients",
            value: "24",
            change: "+3",
            changeLabel: "this week",
            trend: "up",
            icon: Users,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Sessions Today",
            value: "6",
            change: "3",
            changeLabel: "completed",
            trend: "neutral",
            icon: Calendar,
            gradient: "from-orange-500 to-pink-500"
        },
        {
            title: "Pending Reviews",
            value: "8",
            change: "2",
            changeLabel: "urgent",
            trend: "alert",
            icon: FileCheck,
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            title: "Monthly Earnings",
            value: "$8.2k",
            change: "+12%",
            changeLabel: "vs last month",
            trend: "up",
            icon: DollarSign,
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    const todaysSessions = [
        {
            id: "1",
            time: "8:00 AM",
            duration: "60 min",
            client: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1612928414075-bc722ade44f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3NDYzMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
            type: "Strength Training",
            status: "completed",
            location: "Elite Performance Center"
        },
        {
            id: "2",
            time: "10:00 AM",
            duration: "45 min",
            client: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3Mzg2MzczfDA&ixlib=rb-4.1.0&q=80&w=1080",
            type: "HIIT",
            status: "completed",
            location: "Elite Performance Center"
        },
        {
            id: "3",
            time: "12:00 PM",
            duration: "60 min",
            client: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1607286908165-b8b6a2874fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwd29tYW4lMjB0cmFpbmluZ3xlbnwxfHx8fDE3Njc0NjMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            type: "Personal Training",
            status: "completed",
            location: "Elite Performance Center"
        },
        {
            id: "4",
            time: "2:00 PM",
            duration: "45 min",
            client: "David Kim",
            avatar: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHdvcmtvdXR8ZW58MXx8fHwxNzY3NDYzMDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            type: "Cardio Focus",
            status: "upcoming",
            location: "Elite Performance Center"
        },
        {
            id: "5",
            time: "4:00 PM",
            duration: "60 min",
            client: "Lisa Thompson",
            avatar: "https://images.unsplash.com/photo-1759476532819-e37ac3d05cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2NzQ2MzA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
            type: "Strength & Conditioning",
            status: "upcoming",
            location: "Elite Performance Center"
        },
        {
            id: "6",
            time: "6:00 PM",
            duration: "45 min",
            client: "James Wilson",
            avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3Mzg2MzczfDA&ixlib=rb-4.1.0&q=80&w=1080",
            type: "Functional Training",
            status: "upcoming",
            location: "Elite Performance Center"
        }
    ];

    const pendingApprovals = [
        {
            id: "1",
            client: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1612928414075-bc722ade44f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3NDYzMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
            plan: "4-Week Strength Building",
            submitted: "2 hours ago",
            type: "New Plan",
            priority: "high"
        },
        {
            id: "2",
            client: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3Mzg2MzczfDA&ixlib=rb-4.1.0&q=80&w=1080",
            plan: "Updated HIIT Protocol",
            submitted: "5 hours ago",
            type: "Update",
            priority: "medium"
        },
        {
            id: "3",
            client: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1607286908165-b8b6a2874fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwd29tYW4lMjB0cmFpbmluZ3xlbnwxfHx8fDE3Njc0NjMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            plan: "Nutrition Adjustment",
            submitted: "1 day ago",
            type: "Edit",
            priority: "low"
        }
    ];

    const atRiskClients = [
        {
            id: "1",
            name: "Alex Martinez",
            avatar: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHdvcmtvdXR8ZW58MXx8fHwxNzY3NDYzMDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            issue: "3 missed sessions",
            lastContact: "4 days ago",
            adherence: 45,
            severity: "high"
        },
        {
            id: "2",
            name: "Rachel Green",
            avatar: "https://images.unsplash.com/photo-1759476532819-e37ac3d05cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2NzQ2MzA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
            issue: "No logs in 5 days",
            lastContact: "2 days ago",
            adherence: 62,
            severity: "medium"
        },
        {
            id: "3",
            name: "Tom Anderson",
            avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3Mzg2MzczfDA&ixlib=rb-4.1.0&q=80&w=1080",
            issue: "Declining engagement",
            lastContact: "1 day ago",
            adherence: 71,
            severity: "low"
        }
    ];

    const aiInsights = [
        {
            type: "consistency",
            icon: TrendingDown,
            title: "3 Clients Losing Consistency",
            description: "Alex, Rachel, and Tom showing declining adherence",
            action: "Review Now",
            gradient: "from-red-500 to-orange-500"
        },
        {
            type: "plan",
            icon: Zap,
            title: "Suggested Plan Edits",
            description: "Sarah's progression ahead of schedule",
            action: "Adjust Plan",
            gradient: "from-orange-500 to-yellow-500"
        },
        {
            type: "recovery",
            icon: Activity,
            title: "Recovery Alert",
            description: "Mike showing elevated HRV metrics",
            action: "Check Data",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            type: "milestone",
            icon: Star,
            title: "Client Milestone",
            description: "Emily completed 50 consecutive workout days!",
            action: "Celebrate",
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Hero Header */}
                <div className="mb-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white">
                                    <ImageWithFallback
                                        src={user?.avatar || "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmaXRuZXNzJTIwdHJhaW5lciUyMHdvbWFufGVufDF8fHx8MTc2NzQ2MzA5M3ww&ixlib=rb-4.1.0&q=80&w=1080"}
                                        alt="Profile"
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                                        Welcome Back, {firstName}!
                                    </h1>
                                    <p className="text-gray-500 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                        You have <span className="font-bold text-gray-900">3 sessions</span> remaining today
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="gap-2 rounded-xl h-12 px-6 border-2 hover:bg-white hover:border-orange-200 transition-all">
                                <Bell className="w-5 h-5" />
                                <span className="font-medium">Notifications</span>
                            </Button>
                            <Button className="bg-gradient-to-r from-orange-600 to-purple-600 text-white gap-2 shadow-lg hover:shadow-xl transition-all rounded-xl h-12 px-6 font-medium">
                                <MessageSquare className="w-5 h-5" />
                                Messages
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Top Metrics - Redesigned */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <div
                                key={index}
                                className="relative group"
                            >
                                <Card className="relative hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 bg-white overflow-hidden rounded-2xl h-full">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.gradient} opacity-5 rounded-full -mr-16 -mt-16`} />
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient}`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            {metric.trend === "up" && (
                                                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {metric.change}
                                                </div>
                                            )}
                                            {metric.trend === "alert" && (
                                                <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    {metric.change}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                                            <p className="text-4xl mb-1">{metric.value}</p>
                                            <p className="text-xs text-gray-500">{metric.changeLabel}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Today's Sessions - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
                            <CardHeader className="bg-orange-50/50 border-b border-orange-100 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3 text-orange-950">
                                        <div className="p-2.5 bg-orange-100 rounded-xl">
                                            <Calendar className="w-6 h-6 text-orange-600" />
                                        </div>
                                        Today's Sessions
                                    </CardTitle>
                                    <Badge className="bg-white text-orange-700 shadow-sm hover:bg-orange-50 border-orange-100">
                                        6 Total • 3 Remaining
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {todaysSessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${session.status === "completed"
                                                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 opacity-60"
                                                : "bg-gradient-to-r from-white to-orange-50/50 border-orange-200 hover:border-orange-400 hover:shadow-lg"
                                                }`}
                                        >
                                            <div className="p-5">
                                                <div className="flex items-center gap-4">
                                                    {/* Avatar */}
                                                    <div className="relative flex-shrink-0">
                                                        <img
                                                            src={session.avatar}
                                                            alt={session.client}
                                                            className="w-14 h-14 rounded-xl object-cover ring-2 ring-white shadow-lg"
                                                        />
                                                        {session.status === "completed" && (
                                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                                                <CheckCircle className="w-3 h-3 text-white" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Session Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-gray-900">{session.client}</h4>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Clock className="w-4 h-4" />
                                                                {session.time}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-sm">
                                                            <span className="text-gray-600">{session.type}</span>
                                                            <span className="text-gray-400">•</span>
                                                            <span className="text-gray-500">{session.duration}</span>
                                                        </div>
                                                    </div>

                                                    {/* Action Button */}
                                                    <div className="flex-shrink-0">
                                                        {session.status === "completed" ? (
                                                            <Badge className="bg-green-100 text-green-700 border-green-300 gap-1">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Done
                                                            </Badge>
                                                        ) : (
                                                            <Button
                                                                size="sm"
                                                                className="bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:shadow-lg transition-all"
                                                            >
                                                                <PlayCircle className="w-4 h-4 mr-1" />
                                                                Start
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Pending Reviews */}
                        <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                            <CardHeader className="bg-purple-50/50 border-b border-purple-100 px-8 py-6">
                                <CardTitle className="flex items-center gap-3 text-purple-950">
                                    <div className="p-2.5 bg-purple-100 rounded-xl">
                                        <FileCheck className="w-5 h-5 text-purple-600" />
                                    </div>
                                    Pending Reviews
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    {pendingApprovals.map((approval) => (
                                        <div
                                            key={approval.id}
                                            className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:border-purple-400 transition-all group"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <img
                                                    src={approval.avatar}
                                                    alt={approval.client}
                                                    className="w-10 h-10 rounded-lg object-cover ring-2 ring-white shadow"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm text-gray-900 mb-1">{approval.client}</div>
                                                    <div className="text-xs text-gray-600 truncate">{approval.plan}</div>
                                                </div>
                                                <Badge variant="outline" className="text-xs bg-white/70">
                                                    {approval.type}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">{approval.submitted}</span>
                                                <Button size="sm" variant="ghost" className="h-7 text-xs group-hover:bg-purple-100">
                                                    Review
                                                    <ChevronRight className="w-3 h-3 ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl overflow-hidden">
                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Weekly Target</p>
                                            <p className="text-4xl font-bold">28/30</p>
                                            <p className="text-gray-400 text-sm mt-1">Sessions completed</p>
                                        </div>
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                            <Target className="w-7 h-7 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                            <span>Progress</span>
                                            <span>93%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 w-[93%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.3)]"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Award className="w-4 h-4 text-yellow-500" />
                                        <span>On track to hit enhanced bonus!</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Section - AI Insights and At-Risk */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* AI Assistant */}
                    <Card className="border border-indigo-100 shadow-lg bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden h-full">
                        <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 px-8 py-6">
                            <CardTitle className="flex items-center gap-3 text-indigo-950">
                                <div className="p-2.5 bg-indigo-100 rounded-xl">
                                    <Brain className="w-6 h-6 text-indigo-600" />
                                </div>
                                AI Assistant Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="space-y-4">
                                {aiInsights.map((insight, index) => {
                                    const Icon = insight.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-purple-200 transition-all bg-white p-5 hover:shadow-lg hover:scale-[1.01] duration-300"
                                        >
                                            <div className="flex items-start gap-5">
                                                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${insight.gradient} shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-gray-900 font-bold mb-1.5">{insight.title}</h4>
                                                    <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">{insight.description}</p>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="w-full rounded-xl border-2 group-hover:bg-purple-50 group-hover:border-purple-200 group-hover:text-purple-700 transition-all font-semibold h-9"
                                                    >
                                                        {insight.action}
                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* At-Risk Clients */}
                    <Card className="border border-red-100 shadow-lg bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden h-full">
                        <CardHeader className="bg-red-50/50 border-b border-red-100 px-8 py-6">
                            <CardTitle className="flex items-center gap-3 text-red-950">
                                <div className="p-2.5 bg-red-100 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                                At-Risk Clients
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="space-y-4">
                                {atRiskClients.map((client) => (
                                    <div
                                        key={client.id}
                                        className={`group relative overflow-hidden rounded-2xl border transition-all p-5 hover:shadow-lg hover:scale-[1.01] duration-300 ${client.severity === "high"
                                            ? "bg-red-50/50 border-red-100 hover:border-red-200"
                                            : client.severity === "medium"
                                                ? "bg-orange-50/50 border-orange-100 hover:border-orange-200"
                                                : "bg-yellow-50/50 border-yellow-100 hover:border-yellow-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-5 mb-5">
                                            <img
                                                src={client.avatar}
                                                alt={client.name}
                                                className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:shadow-lg transition-all"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <h4 className="text-gray-900 font-bold text-lg">{client.name}</h4>
                                                    <Badge
                                                        className={`rounded-lg px-2.5 py-0.5 shadow-sm border-0 ${client.severity === "high"
                                                            ? "bg-red-100 text-red-700"
                                                            : client.severity === "medium"
                                                                ? "bg-orange-100 text-orange-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >
                                                        {client.severity.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-1 font-medium flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                                    {client.issue}
                                                </p>
                                                <p className="text-xs text-gray-500 pl-3.5">Last contact: {client.lastContact}</p>
                                            </div>
                                        </div>

                                        {/* Adherence Bar */}
                                        <div className="mb-5 bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-black/5">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-gray-600 font-semibold tracking-wide uppercase">Adherence Score</span>
                                                <span className="text-gray-900 font-bold text-sm">{client.adherence}%</span>
                                            </div>
                                            <div className="w-full bg-black/5 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${client.adherence < 50
                                                        ? "bg-gradient-to-r from-red-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                                                        : client.adherence < 70
                                                            ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                                                            : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                                                        }`}
                                                    style={{ width: `${client.adherence}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <Button size="sm" variant="outline" className="flex-1 gap-2 bg-white hover:bg-white/80 border-gray-200 hover:border-gray-300 rounded-xl font-semibold h-9 shadow-sm">
                                                <Phone className="w-3.5 h-3.5" />
                                                Call
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1 gap-2 bg-white hover:bg-white/80 border-gray-200 hover:border-gray-300 rounded-xl font-semibold h-9 shadow-sm">
                                                <Mail className="w-3.5 h-3.5" />
                                                Email
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
