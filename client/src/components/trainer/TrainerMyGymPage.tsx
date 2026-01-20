import {
    MapPin,
    Clock,
    Users,
    Info,
    Phone,
    Dumbbell,
    AlertTriangle,
    CheckCircle,
    Calendar,
    Settings,
    LogOut,
    Thermometer,
    Droplets
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from "../common/figma/ImageWithFallback"; // Reusing existing component

// Mock Data
const gymData = {
    name: "Iron Paradise Gym",
    location: "123 Fitness Blvd, Los Angeles, CA",
    status: "Open Now • Closes 11 PM",
    phone: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80",
    crowdLevel: 75, // Percentage
    temperature: "72°F",
    humidity: "45%",
    amenities: ["Sauna", "Pool", "Towel Service", "Juice Bar"],
    equipmentStatus: [
        { name: "Treadmill #4", status: "Maintenance", reportDate: "Oct 22" },
        { name: "Cable Machine #2", status: "Operational", reportDate: "-" },
    ]
};

const shifts = [
    { day: "Today", time: "6:00 AM - 12:00 PM", status: "Active" },
    { day: "Tomorrow", time: "2:00 PM - 8:00 PM", status: "Upcoming" },
    { day: "Friday", time: "6:00 AM - 12:00 PM", status: "Upcoming" },
];

export function TrainerMyGymPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* HER0 SECTION */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0">
                    <ImageWithFallback
                        src={gymData.image}
                        alt="Gym Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="text-white">
                            <Badge className="bg-green-500 hover:bg-green-600 border-none mb-3">Primary Location</Badge>
                            <h1 className="text-4xl font-bold mb-2">{gymData.name}</h1>
                            <div className="flex items-center gap-4 text-gray-300 text-sm">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {gymData.location}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-green-400" /> {gymData.status}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-white text-gray-900 hover:bg-gray-100">
                                <Phone className="w-4 h-4 mr-2" /> Call Front Desk
                            </Button>
                            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 bg-transparent">
                                <Settings className="w-4 h-4 mr-2" /> Manage Access
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN: LIVE STATUS */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Live Floor Status */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b border-gray-100 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        Live Floor Status
                                    </CardTitle>
                                    <CardDescription>Real-time facility insights</CardDescription>
                                </div>
                                <Badge variant="outline" className="border-gray-200">System Online</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex justify-center mb-2">
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">{gymData.crowdLevel}%</h3>
                                    <p className="text-sm text-gray-500 font-medium">Crowd Level</p>
                                    <Progress value={gymData.crowdLevel} className="h-1.5 mt-3 bg-gray-200" indicatorClassName={gymData.crowdLevel > 80 ? 'bg-red-500' : 'bg-blue-500'} />
                                    <p className="text-xs text-blue-600 mt-2 font-medium">Busy - Peak Hours</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex justify-center mb-2">
                                        <Thermometer className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">{gymData.temperature}</h3>
                                    <p className="text-sm text-gray-500 font-medium">Temperature</p>
                                    <div className="h-1.5 w-full bg-gray-200 mt-3 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 w-[60%]"></div>
                                    </div>
                                    <p className="text-xs text-green-600 mt-2 font-medium">Optimal</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex justify-center mb-2">
                                        <Droplets className="w-8 h-8 text-cyan-600" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">{gymData.humidity}</h3>
                                    <p className="text-sm text-gray-500 font-medium">Humidity</p>
                                    <div className="h-1.5 w-full bg-gray-200 mt-3 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500 w-[45%]"></div>
                                    </div>
                                    <p className="text-xs text-green-600 mt-2 font-medium">Comfortable</p>
                                </div>
                            </div>

                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-gray-400" />
                                Equipment Health
                            </h4>
                            <div className="space-y-3">
                                {gymData.equipmentStatus.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.status === 'Maintenance' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            <span className="font-medium text-gray-700">{item.name}</span>
                                        </div>
                                        {item.status === 'Maintenance' ? (
                                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
                                                <AlertTriangle className="w-3 h-3" /> Under Repair
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                                                <CheckCircle className="w-3 h-3" /> Operational
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full mt-2 text-gray-500 border-dashed border-gray-300">
                                    + Report Broken Equipment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Amenities */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>Amenities Availability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {gymData.amenities.map((amenity, i) => (
                                    <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                                        <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                        <div className="mt-1 flex justify-center">
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none text-[10px] h-5">Available</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: STAFF ACTIONS */}
                <div className="space-y-6">
                    {/* Shift Card */}
                    <Card className="border-0 shadow-lg bg-gray-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-400" />
                                Shift Tracker
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-6 border border-white/10">
                                <p className="text-gray-400 text-xs uppercase mb-1">Current Status</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-white tracking-wide">ON DUTY</span>
                                    <div className="h-3 w-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">Started at 6:00 AM</p>
                            </div>

                            <h4 className="font-bold text-sm text-gray-400 uppercase mb-3">Upcoming Shifts</h4>
                            <div className="space-y-3">
                                {shifts.map((shift, i) => (
                                    <div key={i} className={`flex justify-between items-center p-3 rounded-lg border ${shift.status === 'Active' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/10'}`}>
                                        <div>
                                            <p className="font-medium text-white text-sm">{shift.day}</p>
                                            <p className="text-xs text-gray-400">{shift.time}</p>
                                        </div>
                                        {shift.status === 'Active' && <Badge className="bg-blue-500 text-white border-none">Now</Badge>}
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white">
                                <LogOut className="w-4 h-4 mr-2" /> Clock Out
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Guidelines */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Staff Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <p className="text-sm text-gray-600">Ensure all weights are racked before ending your shift.</p>
                            </div>
                            <div className="flex gap-3">
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <p className="text-sm text-gray-600">Report any client incidents immediately via the Incident Log.</p>
                            </div>
                            <Button variant="outline" className="w-full">View Employee Handbook</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
