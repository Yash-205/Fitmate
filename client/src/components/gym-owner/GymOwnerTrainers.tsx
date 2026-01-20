import { useState, useEffect } from "react";
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Calendar,
    DollarSign,
    Briefcase,
    Phone,
    MessageSquare,
    Clock,
    Star,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    UserCheck,
    ChevronRight,
    Award
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const mockTrainers: Trainer[] = [
    {
        id: "1",
        name: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1612928414075-bc722ade44f1?w=150&auto=format&fit=crop&q=80",
        role: "Senior Trainer",
        clients: 24,
        sessionsThisWeek: 42,
        busyPercentage: 85,
        rating: 4.9,
        phone: "+1 (555) 123-4567",
        email: "sarah.j@fitmate.com",
        joinDate: "2023-01-15",
        workingHours: "6:00 AM - 2:00 PM",
        attendanceRate: 98,
        revenueGenerated: 12500,
        status: "On Duty"
    },
    {
        id: "2",
        name: "Mike Ross",
        avatar: "https://images.unsplash.com/photo-1611881290245-dea287db1269?w=150&auto=format&fit=crop&q=80",
        role: "HIIT Specialist",
        clients: 18,
        sessionsThisWeek: 30,
        busyPercentage: 72,
        rating: 4.8,
        phone: "+1 (555) 234-5678",
        email: "mike.r@fitmate.com",
        joinDate: "2023-03-20",
        workingHours: "2:00 PM - 10:00 PM",
        attendanceRate: 95,
        revenueGenerated: 8900,
        status: "On Duty"
    },
    {
        id: "3",
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=80",
        role: "Strength Coach",
        clients: 8,
        sessionsThisWeek: 12,
        busyPercentage: 30,
        rating: 4.5,
        phone: "+1 (555) 345-6789",
        email: "david.c@fitmate.com",
        joinDate: "2023-11-05",
        workingHours: "8:00 AM - 4:00 PM",
        attendanceRate: 85,
        revenueGenerated: 3200,
        status: "Off Duty"
    },
    {
        id: "4",
        name: "Jessica Williams",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        role: "Yoga Instructor",
        clients: 32,
        sessionsThisWeek: 28,
        busyPercentage: 92,
        rating: 5.0,
        phone: "+1 (555) 456-7890",
        email: "jessica.w@fitmate.com",
        joinDate: "2022-08-10",
        workingHours: "7:00 AM - 3:00 PM",
        attendanceRate: 100,
        revenueGenerated: 15400,
        status: "Off Duty"
    }
];

// Types
interface Trainer {
    id: string;
    name: string;
    avatar: string;
    role: string;
    clients: number;
    sessionsThisWeek: number;
    busyPercentage: number;
    rating: number;
    phone: string;
    email: string;
    joinDate: string;
    // Detailed stats
    workingHours: string;
    attendanceRate: number; // percentage
    revenueGenerated: number;
    status: "On Duty" | "Off Duty";
}

export function GymOwnerTrainers() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await api.get('/gyms/trainers');
                const fetchedTrainers = (response.data as any[]).map((user: any) => ({
                    id: user._id,
                    name: user.name,
                    avatar: user.avatar || "https://github.com/shadcn.png",
                    role: user.specializations?.[0] || user.role || "Trainer",
                    clients: user.clients || 0,
                    sessionsThisWeek: user.sessionsThisWeek || 0,
                    specialization: (user.specializations && user.specializations.length > 0) ? user.specializations[0] : "General Fitness",
                    experience: user.yearsOfExperience ? `${user.yearsOfExperience} Years` : "N/A",
                    rating: user.rating || 5.0,
                    busyPercentage: user.busyPercentage || 0,
                    phone: user.phone || "N/A",
                    email: user.email,
                    joinDate: user.createdAt,
                    workingHours: user.workingHours || "Flexible", // Still placeholder if not in DB, but consistent with earlier logic
                    attendanceRate: user.attendanceRate || 100, // Default to 100 if missing
                    revenueGenerated: user.revenueGenerated || 0,
                    status: (user.status as "On Duty" | "Off Duty") || (user.sessionsThisWeek > 0 ? "On Duty" : "Off Duty")
                }));
                setTrainers(fetchedTrainers);
            } catch (error) {
                console.error("Failed to fetch trainers:", error);
                // Fallback to mock?? No, user asked for real.
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    const filteredTrainers = trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getUtilizationColor = (percentage: number) => {
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 50) return "text-blue-600";
        return "text-red-600";
    };

    const getUtilizationBadge = (percentage: number) => {
        if (percentage >= 80) return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none">High Utilization</Badge>;
        if (percentage >= 50) return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 shadow-none">Optimal</Badge>;
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none">Underutilized</Badge>;
    };

    const openTrainerDetails = async (trainer: Trainer) => {
        setIsSheetOpen(true);
        setSelectedTrainer(trainer);

        try {
            const response = await api.get(`/gyms/trainers/${trainer.id}`);
            const detailData = response.data as any;

            // Enrich with fresh stats from detail endpoint
            const enrichedTrainer = {
                ...trainer,
                clients: detailData.stats?.clients ?? trainer.clients,
                sessionsThisWeek: detailData.stats?.sessionsThisWeek ?? trainer.sessionsThisWeek,
                revenueGenerated: detailData.stats?.revenueGenerated ?? trainer.revenueGenerated,
                workingHours: detailData.stats?.workingHours || trainer.workingHours,
                attendanceRate: detailData.stats?.attendanceRate ?? trainer.attendanceRate
            };

            setSelectedTrainer(enrichedTrainer);
        } catch (error) {
            console.error("Failed to fetch trainer details:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-purple-50/20 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Trainer Management</h1>
                        <p className="text-gray-500 text-lg">Track performance, utilization, and earnings.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2 bg-white hover:bg-gray-50 border-gray-200 shadow-sm h-11 px-6 rounded-xl">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button className="gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/20 h-11 px-6 rounded-xl transition-all">
                            <Briefcase className="w-4 h-4" />
                            Hire Trainer
                        </Button>
                    </div>
                </div>

                {/* Trainer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-3 text-center text-gray-500 p-8">Loading trainers...</div>
                    ) : filteredTrainers.length === 0 ? (
                        <div className="col-span-3 text-center text-gray-500 p-8">No trainers found.</div>
                    ) : (
                        <>
                            {filteredTrainers.map((trainer) => (
                                <Card
                                    key={trainer.id}
                                    className="bg-white/80 backdrop-blur-sm border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                                    onClick={() => navigate(`/gym-owner/trainers/${trainer.id}`)}
                                >
                                    <div className={`h-2 w-full ${trainer.busyPercentage >= 80 ? 'bg-green-500' : trainer.busyPercentage >= 50 ? 'bg-blue-500' : 'bg-red-500'}`} />
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <ImageWithFallback
                                                        src={trainer.avatar}
                                                        alt={trainer.name}
                                                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-md"
                                                    />
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${trainer.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900">{trainer.name}</h3>
                                                    <p className="text-sm text-gray-500">{trainer.role}</p>
                                                    <div className="flex items-center gap-1 mt-1 text-xs font-medium text-orange-500">
                                                        <Star className="w-3 h-3 fill-orange-500" />
                                                        {trainer.rating} Rating
                                                    </div>
                                                </div>
                                            </div>
                                            {getUtilizationBadge(trainer.busyPercentage)}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50 my-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">{trainer.clients}</div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wide">Clients</div>
                                            </div>
                                            <div className="text-center border-l border-gray-50">
                                                <div className="text-2xl font-bold text-gray-900">{trainer.sessionsThisWeek}</div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wide">Sessions/Wk</div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Schedule Utilization</span>
                                                <span className={`font-bold ${getUtilizationColor(trainer.busyPercentage)}`}>{trainer.busyPercentage}%</span>
                                            </div>
                                            <Progress value={trainer.busyPercentage} className="h-2" indicatorClassName={trainer.busyPercentage >= 80 ? 'bg-green-500' : trainer.busyPercentage >= 50 ? 'bg-blue-500' : 'bg-red-500'} />
                                            <p className="text-xs text-center text-gray-400 mt-2">
                                                {trainer.busyPercentage >= 80 ? 'High efficiency! Earning well.' : trainer.busyPercentage < 40 ? 'Action needed: Increase assignments.' : 'Steady performance.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}

                    {/* Add New Trainer Card */}
                    <Card className="bg-gray-50/50 border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group h-full min-h-[300px]">
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-orange-500" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-700">Hire New Trainer</h3>
                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto mt-2">Expand your team to handle more clients and classes.</p>
                    </Card>
                </div>

                {/* Trainer Detail Drawer */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto border-l-0 shadow-2xl p-0 bg-gray-50/50">
                        {selectedTrainer && (
                            <div className="h-full flex flex-col">
                                {/* Header */}
                                <div className="bg-white border-b border-gray-100 p-6 pb-8">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-4">
                                            <ImageWithFallback
                                                src={selectedTrainer.avatar}
                                                alt={selectedTrainer.name}
                                                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-xl"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ring-4 ring-white flex items-center justify-center ${selectedTrainer.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                {selectedTrainer.status === 'On Duty' ? <Clock className="w-3 h-3 text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedTrainer.name}</h2>
                                        <Badge variant="secondary" className="mb-4">{selectedTrainer.role}</Badge>

                                        <div className="flex gap-2 w-full max-w-xs">
                                            <Button className="flex-1 bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200">
                                                <MessageSquare className="w-4 h-4 mr-2" /> Message
                                            </Button>
                                            <Button variant="outline" className="flex-1 bg-white border-gray-200 shadow-sm">
                                                <Phone className="w-4 h-4 mr-2" /> Call
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs uppercase tracking-wide font-semibold">
                                                <Clock className="w-3 h-3" /> Working Hours
                                            </div>
                                            <div className="text-sm font-bold text-gray-900">{selectedTrainer.workingHours}</div>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs uppercase tracking-wide font-semibold">
                                                <UserCheck className="w-3 h-3" /> Attendance
                                            </div>
                                            <div className={`text-2xl font-bold ${selectedTrainer.attendanceRate >= 95 ? 'text-green-600' : 'text-orange-600'}`}>{selectedTrainer.attendanceRate}%</div>
                                        </div>
                                    </div>

                                    {/* Revenue Card */}
                                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-green-500/20">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2 text-green-100 text-sm font-medium">
                                                <DollarSign className="w-4 h-4" /> Revenue Generated
                                            </div>
                                            <Award className="w-5 h-5 text-yellow-300" />
                                        </div>
                                        <div className="text-3xl font-bold mb-1">${selectedTrainer.revenueGenerated.toLocaleString()}</div>
                                        <p className="text-xs text-green-100 opacity-80">This month so far</p>
                                    </div>

                                    {/* Action Center */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                        <h3 className="font-bold text-gray-900 text-sm mb-4">Management Actions</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm">Assign Members</div>
                                                    <div className="text-xs text-gray-500">Currently has {selectedTrainer.clients} active clients</div>
                                                </div>
                                                <Button size="sm" className="bg-black hover:bg-gray-800 text-white h-8">
                                                    Assign +
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm">Work Schedule</div>
                                                    <div className="text-xs text-gray-500">Modify shifts & hours</div>
                                                </div>
                                                <Button size="sm" variant="outline" className="bg-white h-8">
                                                    Edit
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm">Commission Rate</div>
                                                    <div className="text-xs text-gray-500">Adjust payout percentage</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="icon" variant="outline" className="h-7 w-7 bg-white">-</Button>
                                                    <span className="text-sm font-bold w-8 text-center">15%</span>
                                                    <Button size="icon" variant="outline" className="h-7 w-7 bg-white">+</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 h-10">
                                        Remove Trainer from Gym
                                    </Button>

                                </div>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
