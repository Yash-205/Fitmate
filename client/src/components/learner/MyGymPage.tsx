import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Dumbbell, AlertCircle, CalendarCheck, TrendingUp, Wifi, Car, ShowerHead, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

interface MyGymPageProps {
    onBack?: () => void;
}

export function MyGymPage({ onBack }: MyGymPageProps) {
    const navigate = useNavigate();
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };
    const [selectedDay, setSelectedDay] = useState<string>('monday');

    const { user } = useAuth();
    const [gymData, setGymData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock crowd data relative to component for now, as backend likely doesn't have it
    const mockCrowdData = {
        monday: [20, 30, 60, 85, 95, 90, 75, 60, 80, 90, 85, 70, 60, 50, 55, 65, 85, 95, 90, 70, 50, 30],
        tuesday: [25, 35, 65, 80, 90, 85, 70, 55, 75, 85, 80, 65, 55, 45, 50, 60, 80, 90, 85, 65, 45, 25],
        wednesday: [22, 32, 62, 82, 92, 88, 72, 58, 78, 88, 82, 68, 58, 48, 52, 62, 82, 92, 88, 68, 48, 28],
        thursday: [24, 34, 64, 84, 94, 86, 74, 56, 76, 86, 84, 66, 56, 46, 54, 64, 84, 94, 86, 66, 46, 26],
        friday: [26, 36, 66, 86, 96, 92, 76, 60, 82, 92, 88, 72, 62, 52, 58, 68, 88, 98, 92, 72, 52, 32],
        saturday: [0, 0, 0, 0, 0, 0, 35, 55, 75, 85, 90, 85, 75, 65, 60, 55, 50, 40, 30, 20, 0, 0],
        sunday: [0, 0, 0, 0, 0, 0, 40, 60, 80, 90, 85, 75, 65, 55, 50, 45, 35, 25, 15, 0, 0, 0]
    };

    useEffect(() => {
        const fetchGym = async () => {
            if (user?.gymId) {
                try {
                    const response = await import('../../services/api').then(m => m.default.get(`/gyms/${user.gymId}`));
                    const data = response.data as any;
                    setGymData({
                        name: data.gymName || data.name,
                        photo: data.avatar || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                        address: data.gymLocation || "Main St, City Center",
                        phone: data.phone || "+1 (555) 000-0000",
                        email: data.email || "contact@gym.com",
                        hours: {
                            monday: "5:00 AM - 11:00 PM", // Placeholder
                            tuesday: "5:00 AM - 11:00 PM",
                            wednesday: "5:00 AM - 11:00 PM",
                            thursday: "5:00 AM - 11:00 PM",
                            friday: "5:00 AM - 10:00 PM",
                            saturday: "7:00 AM - 9:00 PM",
                            sunday: "7:00 AM - 8:00 PM"
                        },
                        crowdData: mockCrowdData,
                        amenities: [
                            { icon: Wifi, name: "Free WiFi", available: true },
                            { icon: Car, name: "Parking", available: true },
                            { icon: ShowerHead, name: "Showers & Lockers", available: true },
                            { icon: Zap, name: "Sauna", available: !!data.features?.includes('Sauna') }
                        ]
                    });
                } catch (error) {
                    console.error("Failed to fetch gym", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchGym();
    }, [user?.gymId]);

    if (loading) return <div className="min-h-screen pt-24 text-center">Loading gym details...</div>;
    if (!gymData) return <div className="min-h-screen pt-24 text-center">No gym assigned.</div>;

    const equipment = [
        { category: "Cardio", items: ["Treadmills (12)", "Ellipticals (8)", "Rowing Machines (6)", "Stationary Bikes (10)", "Stair Climbers (4)"] },
        { category: "Strength", items: ["Smith Machines (3)", "Power Racks (4)", "Cable Machines (6)", "Leg Press (2)", "Hack Squat (1)"] },
        { category: "Free Weights", items: ["Dumbbells (5-120 lbs)", "Barbells (Olympic)", "Kettlebells (10-70 lbs)", "Weight Plates (Standard & Olympic)"] },
        { category: "Functional", items: ["TRX Suspension Trainers (4)", "Battle Ropes (2)", "Plyometric Boxes (Various)", "Resistance Bands", "Medicine Balls (4-30 lbs)"] },
        { category: "Specialized", items: ["Assault Bikes (3)", "SkiErg (2)", "Prowler Sleds (2)", "GHD Machine (1)", "Reverse Hyper (1)"] }
    ];

    const peakOffPeak = [
        { time: "5:00 AM - 7:00 AM", status: "Moderate", color: "bg-yellow-500", recommendation: "Good for focused training" },
        { time: "7:00 AM - 9:00 AM", status: "Peak", color: "bg-red-500", recommendation: "Very busy - expect wait times" },
        { time: "9:00 AM - 12:00 PM", status: "Off-Peak", color: "bg-green-500", recommendation: "Ideal time - equipment readily available" },
        { time: "12:00 PM - 2:00 PM", status: "Moderate", color: "bg-yellow-500", recommendation: "Lunch crowd - somewhat busy" },
        { time: "2:00 PM - 5:00 PM", status: "Off-Peak", color: "bg-green-500", recommendation: "Great time for long sessions" },
        { time: "5:00 PM - 8:00 PM", status: "Peak", color: "bg-red-500", recommendation: "Busiest period - plan alternatives" },
        { time: "8:00 PM - Close", status: "Moderate", color: "bg-yellow-500", recommendation: "Winding down - good availability" }
    ];

    const trainerNotes = [
        {
            date: "Jan 2, 2026",
            note: "Sarah will meet you in the functional training area on Mondays and Thursdays. Look for the orange mat zone.",
            type: "Meeting Point"
        },
        {
            date: "Dec 28, 2025",
            note: "Gym has new assault bikes in the cardio section. We'll incorporate these into your HIIT sessions.",
            type: "Equipment Update"
        },
        {
            date: "Dec 20, 2025",
            note: "Power rack #3 (near the mirrors) has the best setup for your Olympic lifts. Try to use that one when available.",
            type: "Equipment Preference"
        }
    ];

    const gymRules = [
        { icon: AlertCircle, rule: "Wipe down equipment after use", impact: "Bring your own towel or use provided wipes" },
        { icon: Clock, rule: "30-minute cardio limit during peak hours", impact: "Plan cardio sessions during off-peak times for longer workouts" },
        { icon: Users, rule: "Allow work-in on shared equipment", impact: "Be prepared to share squat racks and benches during busy times" },
        { icon: Dumbbell, rule: "Re-rack all weights", impact: "Factor in 2-3 minutes at end of workout for cleanup" },
        { icon: AlertCircle, rule: "No chalk allowed", impact: "Use liquid chalk or lifting straps for heavy deadlifts" },
        { icon: CalendarCheck, rule: "Classes have priority in studios", impact: "Check class schedule before using studio spaces" }
    ];

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const getCrowdLevel = (percentage: number) => {
        if (percentage >= 80) return { text: 'Very Busy', color: 'bg-red-500' };
        if (percentage >= 60) return { text: 'Busy', color: 'bg-orange-500' };
        if (percentage >= 40) return { text: 'Moderate', color: 'bg-yellow-500' };
        return { text: 'Quiet', color: 'bg-green-500' };
    };

    const currentDayCrowdData = gymData.crowdData[selectedDay as keyof typeof gymData.crowdData];

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-purple-50 to-white pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                {/* Gym Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-orange-600 to-purple-600 p-8 text-white">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl mb-2">{gymData.name}</h1>
                                <div className="flex items-center gap-2 text-orange-100 mb-3">
                                    <MapPin className="w-4 h-4" />
                                    <span>{gymData.address}</span>
                                </div>
                                <div className="flex gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{gymData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{gymData.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden w-24 h-24 border-2 border-white/30 shadow-lg">
                                <ImageWithFallback
                                    src={gymData.photo}
                                    alt={gymData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="p-6 border-b">
                        <h3 className="text-lg mb-4 text-gray-800">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {gymData.amenities.map((amenity: any, index: number) => {
                                const Icon = amenity.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Icon className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm text-gray-700">{amenity.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="p-6">
                        <h3 className="text-lg mb-4 text-gray-800 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-600" />
                            Operating Hours
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(gymData.hours).map(([day, hours]) => (
                                <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="capitalize text-gray-700">{day}</span>
                                    <span className="text-gray-900">{hours as string}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Crowd Heatmap */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        Crowd Heatmap
                    </h2>

                    {/* Day Selector */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap transition-all ${selectedDay === day
                                    ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Heatmap */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>12 AM</span>
                            <span>6 AM</span>
                            <span>12 PM</span>
                            <span>6 PM</span>
                            <span>11 PM</span>
                        </div>
                        <div className="flex gap-1">
                            {currentDayCrowdData.map((crowd: any, index: number) => {
                                const level = getCrowdLevel(crowd);
                                return (
                                    <div
                                        key={index}
                                        className="relative group flex-1"
                                        style={{ minWidth: '20px' }}
                                    >
                                        <div
                                            className={`h-16 ${level.color} rounded transition-all hover:opacity-80`}
                                            style={{ opacity: crowd / 100 }}
                                        />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                                            {index}:00 - {crowd}% ({level.text})
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded" />
                                <span>Quiet (0-40%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded" />
                                <span>Moderate (40-60%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-orange-500 rounded" />
                                <span>Busy (60-80%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded" />
                                <span>Very Busy (80-100%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Peak/Off-Peak Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                        Peak & Off-Peak Guide
                    </h2>
                    <div className="space-y-3">
                        {peakOffPeak.map((period, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className={`w-3 h-3 ${period.color} rounded-full flex-shrink-0`} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-gray-900">{period.time}</span>
                                        <span className="text-sm px-3 py-1 bg-white rounded-full border border-gray-200">
                                            {period.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{period.recommendation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Equipment List */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
                            <Dumbbell className="w-6 h-6 text-purple-600" />
                            Available Equipment
                        </h2>
                        <div className="space-y-4">
                            {equipment.map((category, index) => (
                                <div key={index} className="border-l-4 border-orange-500 pl-4">
                                    <h3 className="text-gray-900 mb-2">{category.category}</h3>
                                    <ul className="space-y-1">
                                        {category.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trainer Coordination Notes */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
                            <CalendarCheck className="w-6 h-6 text-orange-600" />
                            Trainer–Gym Coordination
                        </h2>
                        <div className="space-y-4">
                            {trainerNotes.map((note, index) => (
                                <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg border-l-4 border-orange-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-purple-600 px-2 py-1 bg-white rounded-full">
                                            {note.type}
                                        </span>
                                        <span className="text-xs text-gray-500">{note.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{note.note}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-blue-900 mb-1">Coordination Tip</p>
                                    <p className="text-xs text-blue-700">
                                        Your trainer Sarah has reserved equipment access during your scheduled sessions.
                                        Always check her latest notes before heading to the gym.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gym Rules */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        Gym Rules & Workout Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {gymRules.map((rule, index) => {
                            const Icon = rule.icon;
                            return (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                                    <div className="flex items-start gap-3">
                                        <Icon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-gray-900 mb-1">{rule.rule}</h3>
                                            <p className="text-sm text-gray-600">{rule.impact}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">
                            <strong>Note:</strong> These rules are designed to create a better experience for all members.
                            Your trainer has planned your workouts with these guidelines in mind.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
