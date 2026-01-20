import { useState } from "react";
import { format, addDays, startOfWeek, addHours, startOfDay, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
    Calendar as CalendarIcon,
    Clock,
    ChevronLeft,
    ChevronRight,
    Users,
    Video,
    MapPin,
    MoreVertical,
    Plus,
    Bell
} from "lucide-react";
import "react-day-picker/dist/style.css";

// Mock Data
const SESSIONS = [
    {
        id: 1,
        client: "Sarah Johnson",
        type: "Personal Training",
        start: addHours(startOfDay(new Date()), 9), // Today 9 AM
        duration: 60, // minutes
        status: "confirmed",
        location: "Elite Gym",
        avatar: "https://images.unsplash.com/photo-1645081522795-231884bfcbfc?w=100&h=100&fit=crop"
    },
    {
        id: 2,
        client: "Mike Chen",
        type: "Consultation",
        start: addHours(startOfDay(new Date()), 14), // Today 2 PM
        duration: 30,
        status: "confirmed",
        location: "Video Call",
        avatar: "https://images.unsplash.com/photo-1530029081-120107a0c377?w=100&h=100&fit=crop"
    },
    {
        id: 3,
        client: "Emily Rodriguez",
        type: "Check-in",
        start: addHours(startOfDay(addDays(new Date(), 1)), 10), // Tomorrow 10 AM
        duration: 45,
        status: "pending",
        location: "Video Call",
        avatar: "https://images.unsplash.com/photo-1648863397001-cd77a7e98bd8?w=100&h=100&fit=crop"
    }
];

export function TrainerSchedule() {
    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<"daily" | "weekly">("daily");

    // Helper to generate time slots (6 AM to 8 PM)
    const timeSlots = Array.from({ length: 15 }, (_, i) => i + 6);

    const getSessionsForTime = (hour: number, currentDay: Date) => {
        return SESSIONS.filter(s => {
            const sessionHour = s.start.getHours();
            return sessionHour === hour && isSameDay(s.start, currentDay);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg transform rotate-3">
                            <CalendarIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">
                                Schedule
                            </h1>
                            <p className="text-gray-600 text-lg">Manage bookings and availability</p>
                        </div>
                    </div>

                    <div className="flex bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200">
                        <button
                            onClick={() => setView("daily")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${view === "daily"
                                    ? "bg-white text-pink-600 shadow-md"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                                }`}
                        >
                            Daily
                        </button>
                        <button
                            onClick={() => setView("weekly")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${view === "weekly"
                                    ? "bg-white text-pink-600 shadow-md"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                                }`}
                        >
                            Weekly
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl border-gray-200 h-12 gap-2">
                            <Bell className="w-5 h-5" />
                            Waitlist
                        </Button>
                        <Button className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl h-12 px-6 shadow-lg hover:shadow-xl transition-all font-medium gap-2">
                            <Plus className="w-5 h-5" />
                            New Booking
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar: Calendar & Stats */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                            <div className="p-4 flex justify-center bg-white">
                                <DayPicker
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => d && setDate(d)}
                                    className="border-0"
                                    modifiersClassNames={{
                                        selected: "bg-pink-600 text-white rounded-full hover:bg-pink-700"
                                    }}
                                />
                            </div>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl rounded-3xl overflow-hidden">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-pink-400" />
                                    Today's Overview
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Total Sessions</span>
                                        <span className="text-xl font-bold">5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Open Slots</span>
                                        <span className="text-xl font-bold text-green-400">3</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Est. Revenue</span>
                                        <span className="text-xl font-bold text-yellow-400">$450</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Calendar Grid */}
                    <div className="lg:col-span-9">
                        <Card className="border border-gray-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden min-h-[800px]">
                            <CardHeader className="border-b border-gray-100 p-6 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl" onClick={() => setDate(addDays(date, -1))}>
                                        <ChevronLeft className="w-5 h-5" />
                                    </Button>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {format(date, "MMMM d, yyyy")}
                                    </h2>
                                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl" onClick={() => setDate(addDays(date, 1))}>
                                        <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </div>
                                <Badge className="bg-pink-50 text-pink-700 border-pink-100 px-3 py-1">
                                    {view === "daily" ? "Daily View" : "Weekly View"}
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-100">
                                    {timeSlots.map((hour) => {
                                        const sessions = getSessionsForTime(hour, date);
                                        const isCurrentHour = new Date().getHours() === hour && isSameDay(date, new Date());

                                        return (
                                            <div key={hour} className={`flex min-h-[100px] group ${isCurrentHour ? "bg-pink-50/30" : "hover:bg-gray-50"}`}>
                                                {/* Time Column */}
                                                <div className="w-24 p-4 text-right border-r border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wide">
                                                    {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                                                </div>

                                                {/* Content Column */}
                                                <div className="flex-1 p-2 relative">
                                                    {/* Render Sessions */}
                                                    {sessions.map(session => (
                                                        <div
                                                            key={session.id}
                                                            className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-[90%]"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex items-center gap-3">
                                                                    <img src={session.avatar} alt={session.client} className="w-8 h-8 rounded-full object-cover" />
                                                                    <div>
                                                                        <h4 className="font-bold text-gray-900 text-sm">{session.client}</h4>
                                                                        <p className="text-xs text-blue-700">{session.type}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {session.location === "Video Call" ? <Video className="w-4 h-4 text-gray-400" /> : <MapPin className="w-4 h-4 text-gray-400" />}
                                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                                                                        <MoreVertical className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Render "Add Slot" on Hover */}
                                                    {sessions.length === 0 && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button variant="ghost" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 gap-2">
                                                                <Plus className="w-4 h-4" />
                                                                Add Availability
                                                            </Button>
                                                        </div>
                                                    )}
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
