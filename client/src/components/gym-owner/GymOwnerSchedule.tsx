import {
    Calendar,
    Clock,
    Users,
    TrendingUp,
    AlertTriangle,
    Plus,
    Move,
    Percent,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Sun,
    Moon,
    Filter,
    ArrowUpRight,
    Search,
    Dumbbell,
    PartyPopper,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";

export function GymOwnerSchedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock Hourly Data
    const hourlyData = [
        { time: "06:00 AM", crowd: 85, status: "High", type: "class", activity: "Morning HIIT" },
        { time: "07:00 AM", crowd: 95, status: "Critical", type: "peak", activity: "Peak Hour" },
        { time: "08:00 AM", crowd: 90, status: "High", type: "peak", activity: "Office Rush" },
        { time: "09:00 AM", crowd: 60, status: "Moderate", type: "normal", activity: "Standard Flow" },
        { time: "10:00 AM", crowd: 40, status: "Low", type: "normal", activity: "Mid-morning" },
        { time: "11:00 AM", crowd: 20, status: "Empty", type: "quiet", activity: "Quiet Time" },
        { time: "12:00 PM", crowd: 35, status: "Low", type: "normal", activity: "Lunch Break" },
        { time: "01:00 PM", crowd: 25, status: "Empty", type: "quiet", activity: "Maintenance Window" },
        { time: "02:00 PM", crowd: 20, status: "Empty", type: "quiet", activity: "Quiet Time" },
        { time: "03:00 PM", crowd: 30, status: "Low", type: "normal", activity: "Early Birds" },
        { time: "04:00 PM", crowd: 55, status: "Moderate", type: "normal", activity: "School's Out" },
        { time: "05:00 PM", crowd: 80, status: "High", type: "peak", activity: "Evening Rush" },
        { time: "06:00 PM", crowd: 98, status: "Critical", type: "peak", activity: "Maximum Capacity" },
        { time: "07:00 PM", crowd: 90, status: "High", type: "peak", activity: "Post-Work" },
        { time: "08:00 PM", crowd: 70, status: "Moderate", type: "normal", activity: "Winding Down" },
        { time: "09:00 PM", crowd: 40, status: "Low", type: "normal", activity: "Late Night" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Critical": return "bg-red-500 shadow-red-200 fill-red-500 text-red-600";
            case "High": return "bg-orange-500 shadow-orange-200 fill-orange-500 text-orange-600";
            case "Moderate": return "bg-blue-500 shadow-blue-200 fill-blue-500 text-blue-600";
            case "Low": return "bg-green-500 shadow-green-200 fill-green-500 text-green-600";
            default: return "bg-gray-300 shadow-gray-100 fill-gray-300 text-gray-400";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Critical": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none">Overcrowded</Badge>;
            case "High": return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 shadow-none">Busy</Badge>;
            case "Moderate": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 shadow-none">Moderate</Badge>;
            case "Low": return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none">Quiet</Badge>;
            default: return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200 shadow-none">Empty</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-purple-50/20 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Capacity Schedule
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg">Predict, monitor, and optimize gym traffic.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/80 p-2 rounded-2xl shadow-sm border border-gray-100 backdrop-blur-sm">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex flex-col items-center px-2 min-w-[120px]">
                            <span className="text-sm font-bold text-gray-900">Today</span>
                            <span className="text-xs text-gray-500 font-medium">Wed, Jan 24</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 rounded-xl">
                            Now
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Stats & Schedule */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Highlights Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-blue-500/20 transition-all"></div>
                                <CardContent className="p-5 relative z-10">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="p-3 bg-blue-50 rounded-xl">
                                            <Users className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Current</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-gray-900">55% Full</h3>
                                        <p className="text-xs text-gray-500 font-medium">142 members checked in</p>
                                    </div>
                                    <Progress value={55} className="h-1.5 mt-4 bg-blue-100" indicatorClassName="bg-blue-500" />
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-orange-500/20 transition-all"></div>
                                <CardContent className="p-5 relative z-10">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="p-3 bg-orange-50 rounded-xl">
                                            <TrendingUp className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Forecast</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-gray-900">6:00 PM</h3>
                                        <p className="text-xs text-gray-500 font-medium">Expected Peak (+125%)</p>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-orange-600 text-xs font-semibold bg-orange-50 px-2 py-1 rounded-lg w-fit">
                                        <AlertTriangle className="w-3 h-3" /> Near Capacity
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-green-500/20 transition-all"></div>
                                <CardContent className="p-5 relative z-10">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="p-3 bg-green-50 rounded-xl">
                                            <Zap className="w-5 h-5 text-green-600" />
                                        </div>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Opportunity</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-gray-900">1 PM - 4 PM</h3>
                                        <p className="text-xs text-gray-500 font-medium">Projected Quiet Hours</p>
                                    </div>
                                    <Button variant="link" className="mt-2 h-auto p-0 text-green-600 text-xs font-semibold hover:text-green-700">
                                        Boost Traffic &rarr;
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Timeline Card */}
                        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-gray-100 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold text-gray-900">Hourly Timeline</CardTitle>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="h-8 gap-2 bg-white border-gray-200 text-xs">
                                            <Filter className="w-3 h-3" /> Filter
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8 gap-2 bg-white border-gray-200 text-xs">
                                            <Search className="w-3 h-3" /> Find Slot
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-50">
                                    {hourlyData.map((slot, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-6 p-5 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent transition-all cursor-pointer relative overflow-hidden"
                                        >
                                            {/* Time Column */}
                                            <div className="w-20 text-right flex-shrink-0">
                                                <span className="block font-bold text-gray-900 text-sm">{slot.time.split(' ')[0]}</span>
                                                <span className="block text-xs text-gray-400 font-medium">{slot.time.split(' ')[1]}</span>
                                            </div>

                                            {/* Visual Progress Bar */}
                                            <div className="flex-1 relative z-10">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="font-semibold text-gray-700 text-sm">{slot.activity}</h4>
                                                        {getStatusBadge(slot.status)}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500">{slot.crowd}%</span>
                                                </div>
                                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${getStatusColor(slot.status).split(' ')[0]}`} // Extract bg class
                                                        style={{ width: `${slot.crowd}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Action Overlay (Visible on Hover) */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm border border-gray-100 z-20">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                                <div className="h-4 w-px bg-gray-200"></div>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        {/* Quick Action Card (Premium Style) */}
                        <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-0 shadow-2xl rounded-3xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-12 -mt-12 blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500 opacity-20 rounded-full -ml-8 -mb-8 blur-2xl pointer-events-none" />

                            <CardHeader className="relative z-10 pb-0">
                                <CardTitle className="text-xl font-bold">Crowd Control</CardTitle>
                                <CardDescription className="text-indigo-200">One-tap capacity management</CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10 p-6 space-y-4">
                                <Button className="w-full justify-between bg-white/10 hover:bg-white/20 border-0 backdrop-blur-md h-12 group">
                                    <span className="flex items-center gap-2">
                                        <Plus className="w-4 h-4 text-indigo-300" /> Add Group Class
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button className="w-full justify-between bg-white/10 hover:bg-white/20 border-0 backdrop-blur-md h-12 group">
                                    <span className="flex items-center gap-2">
                                        <Move className="w-4 h-4 text-purple-300" /> Adjust Trainer Shifts
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button className="w-full justify-between bg-white/10 hover:bg-white/20 border-0 backdrop-blur-md h-12 group">
                                    <span className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-300" /> Flash Discount
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Peak Warning Widget */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-orange-600">
                                    <AlertTriangle className="w-5 h-5 fill-orange-100" />
                                    <h3 className="font-bold">Peak Alert</h3>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    Gym is approaching <span className="font-bold text-gray-900">98% capacity</span> between 6 PM - 7 PM today.
                                </p>
                                <div className="space-y-2">
                                    <Button size="sm" variant="outline" className="w-full justify-center border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100">
                                        Restrict Guest Passes
                                    </Button>
                                    <Button size="sm" variant="ghost" className="w-full text-gray-400 hover:text-gray-600">
                                        Dismiss
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Event Promo */}
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-3xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <CardContent className="p-6 relative z-10 flex flex-col items-center text-center">
                                <div className="p-3 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                                    <PartyPopper className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">Theme Night?</h3>
                                <p className="text-pink-100 text-sm mb-4">Friday nights are quiet. Host a special event to boost attendance!</p>
                                <Button className="bg-white text-pink-600 hover:bg-pink-50 border-0 w-full shadow-lg">
                                    Plan Event
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
