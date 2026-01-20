import {
    Users,
    Dumbbell,
    TrendingUp,
    AlertTriangle,
    Phone,
    ArrowDown,
    CheckCircle,
    Clock,
    Activity,
    Wallet,
    Bell,
    MessageSquare,
    ChevronRight,
    Target,
    Zap
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";

// Mock Data
const stats = {
    membersToday: 124,
    membersActive: 124,
    trainersActive: 6,
    totalTrainers: 8,
    crowdLevel: 72,
    todaysRevenue: 18400
};

const trainers = [
    { id: 1, name: "Sarah J.", status: "On Duty", busy: true, avatar: "https://images.unsplash.com/photo-1612928414075-bc722ade44f1?w=150&auto=format&fit=crop&q=80" },
    { id: 2, name: "Mike R.", status: "On Duty", busy: false, avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?w=150&auto=format&fit=crop&q=80" },
    { id: 3, name: "Lisa W.", status: "Off Duty", busy: false, avatar: "https://images.unsplash.com/photo-1759476532819-e37ac3d05cff?w=150&auto=format&fit=crop&q=80" },
    { id: 4, name: "Marcus T.", status: "On Duty", busy: true, avatar: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=150&auto=format&fit=crop&q=80" },
];

const warnings = [
    {
        id: 1,
        type: "Retention",
        message: "12 members inactive for 10+ days",
        action: "Send Offer",
        icon: Users,
        gradient: "from-red-500 to-orange-500"
    },
    {
        id: 2,
        type: "Staffing",
        message: "1 trainer absent today",
        action: "Call Trainer",
        icon: Phone,
        gradient: "from-orange-500 to-yellow-500"
    },
    {
        id: 3,
        type: "Revenue",
        message: "Evening slots 40% under-booked",
        action: "Reduce Price",
        icon: ArrowDown,
        gradient: "from-blue-500 to-cyan-500"
    },
];

export function GymOwnerHome() {
    const { user } = useAuth();
    const firstName = user?.name?.split(' ')[0] || "Owner";

    const metrics = [
        {
            title: "Members Today",
            value: stats.membersToday.toString(),
            change: "+12",
            changeLabel: "vs last week",
            trend: "up",
            icon: Users,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Trainers Active",
            value: `${stats.trainersActive}/${stats.totalTrainers}`,
            change: "All Critical Slots",
            changeLabel: "covered",
            trend: "neutral",
            icon: Dumbbell,
            gradient: "from-orange-500 to-pink-500"
        },
        {
            title: "Current Crowd",
            value: `${stats.crowdLevel}%`,
            change: "Peak Time",
            changeLabel: "approaching",
            trend: "alert",
            icon: Activity,
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            title: "Today's Revenue",
            value: `₹${stats.todaysRevenue.toLocaleString()}`,
            change: "+8%",
            changeLabel: "vs yesterday",
            trend: "up",
            icon: Wallet,
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
                                        src={user?.avatar || "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=200"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                                        Welcome, {firstName}!
                                    </h1>
                                    <p className="text-gray-500 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Gym is currently <span className="font-bold text-gray-900">Open</span> • {stats.membersToday} check-ins today
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <Button variant="outline" className="gap-2 rounded-xl h-12 px-6 border-2 hover:bg-white hover:border-orange-200 transition-all">
                                <Bell className="w-5 h-5" />
                                <span className="font-medium">Alerts</span>
                            </Button>
                            <Button className="bg-gradient-to-r from-orange-600 to-purple-600 text-white gap-2 shadow-lg hover:shadow-xl transition-all rounded-xl h-12 px-6 font-medium">
                                <MessageSquare className="w-5 h-5" />
                                Staff Chat
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <div key={index} className="relative group">
                                <Card className="relative hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 bg-white overflow-hidden rounded-2xl h-full">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.gradient} opacity-5 rounded-full -mr-16 -mt-16`} />
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-sm`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            {metric.trend === "up" && (
                                                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-medium">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {metric.change}
                                                </div>
                                            )}
                                            {metric.trend === "alert" && (
                                                <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full text-xs font-medium">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    {metric.change}
                                                </div>
                                            )}
                                            {metric.trend === "neutral" && (
                                                <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-medium">
                                                    <CheckCircle className="w-3 h-3" />
                                                    {metric.change}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium mb-1">{metric.title}</p>
                                            <p className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{metric.value}</p>
                                            <p className="text-xs text-gray-400 font-medium capitalize">{metric.changeLabel}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Live Crowd & Trainer Status - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Live Status Card */}
                        <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                            <CardHeader className="bg-orange-50/50 border-b border-orange-100 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3 text-orange-950">
                                        <div className="p-2.5 bg-orange-100 rounded-xl">
                                            <Activity className="w-6 h-6 text-orange-600" />
                                        </div>
                                        Live Gym Status
                                    </CardTitle>
                                    <Badge variant="outline" className="bg-white text-orange-700 border-orange-200">
                                        Updated 2m ago
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                    {/* Crowd Meter */}
                                    <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50/30">
                                        <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
                                            {/* Circular Progress Background */}
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    stroke="currentColor"
                                                    strokeWidth="12"
                                                    fill="transparent"
                                                    className="text-gray-100"
                                                />
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    stroke="currentColor"
                                                    strokeWidth="12"
                                                    fill="transparent"
                                                    strokeDasharray={440}
                                                    strokeDashoffset={440 - (440 * stats.crowdLevel) / 100}
                                                    className={`${stats.crowdLevel > 80 ? 'text-red-500' :
                                                            stats.crowdLevel > 50 ? 'text-orange-500' : 'text-green-500'
                                                        } transition-all duration-1000 ease-out`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-bold text-gray-900">{stats.crowdLevel}%</span>
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Capacity</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-center mb-1">
                                            {stats.crowdLevel < 40 ? "Quiet" :
                                                stats.crowdLevel < 70 ? "Comfortable" :
                                                    stats.crowdLevel < 90 ? "Busy" : "Overcrowded"}
                                        </h3>
                                        <p className="text-sm text-gray-500 text-center">Peak expected at 6:00 PM</p>
                                    </div>

                                    {/* Trainers List */}
                                    <div className="md:col-span-2 p-6 bg-white">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold text-gray-900">Active Trainers</h4>
                                            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-xs">
                                                View Schedule
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {trainers.slice(0, 4).map((t) => (
                                                <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all group bg-gray-50/50 hover:bg-white">
                                                    <div className="relative">
                                                        <ImageWithFallback src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                                                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${t.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-bold text-gray-900 text-sm truncate">{t.name}</p>
                                                            {t.status === 'On Duty' && (
                                                                <span className={`w-2 h-2 rounded-full ${t.busy ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 mb-1">{t.status}</p>
                                                        {t.status === 'On Duty' && (
                                                            <Badge variant="secondary" className={`text-[10px] px-1.5 h-5 ${t.busy
                                                                    ? 'bg-orange-100 text-orange-700'
                                                                    : 'bg-green-100 text-green-700'
                                                                }`}>
                                                                {t.busy ? 'In Session' : 'Available'}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Items - Right Column */}
                    <div className="space-y-6">
                        <Card className="border border-red-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
                            <CardHeader className="bg-red-50/50 border-b border-red-100 px-8 py-6">
                                <CardTitle className="flex items-center gap-3 text-red-950">
                                    <div className="p-2.5 bg-red-100 rounded-xl">
                                        <Zap className="w-5 h-5 text-red-600" />
                                    </div>
                                    Action Required
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {warnings.map((warning, index) => {
                                        const Icon = warning.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-red-200 transition-all bg-white p-4 hover:shadow-md"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${warning.gradient} shadow-md flex-shrink-0 mt-1`}>
                                                        <Icon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <Badge variant="outline" className="text-[10px] border-red-200 text-red-600 bg-red-50">
                                                                {warning.type}
                                                            </Badge>
                                                            <span className="text-[10px] text-gray-400">Just now</span>
                                                        </div>
                                                        <h4 className="text-gray-900 font-bold text-sm mb-1">{warning.message}</h4>
                                                        <Button
                                                            size="sm"
                                                            className="w-full mt-3 bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-xs h-8 shadow-sm group-hover:shadow"
                                                        >
                                                            {warning.action}
                                                            <ChevronRight className="w-3 h-3 ml-1" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
