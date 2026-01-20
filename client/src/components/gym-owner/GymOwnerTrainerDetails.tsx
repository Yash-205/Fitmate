import {
    User,
    MapPin,
    Clock,
    Star,
    Award,
    TrendingUp,
    Shield,
    CheckCircle,
    Briefcase,
    Users,
    MessageSquare,
    DollarSign,
    Calendar,
    Settings,
    Edit,
    Camera,
    LogOut,
    ChevronRight,
    Globe,
    Phone,
    BarChart,
    Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Progress } from "../ui/progress";
import api from "../../services/api";



export function GymOwnerTrainerDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainerDetails = async () => {
            try {
                // @ts-ignore
                const response = await api.get(`/gyms/trainers/${id}`);
                const data = response.data as any;

                setTrainer({
                    id: data._id,
                    name: data.name,
                    avatar: data.avatar || "https://github.com/shadcn.png",
                    coverPhoto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0cmFpbmVyJTIwYWN0aW9ufGVufDF8fHx8MTc2NzQzNzY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
                    role: data.role || "Trainer",
                    clients: data.stats?.clients || 0,
                    sessionsThisWeek: data.stats?.sessionsThisWeek || 0,
                    busyPercentage: data.stats?.busyPercentage || 0, // Need to make sure backend returns this in stats
                    rating: data.rating || 5.0,
                    reviews: data.reviews?.length || 0,
                    phone: data.phone || "N/A",
                    email: data.email,
                    joinDate: new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                    workingHours: data.stats?.workingHours || "Flexible",
                    attendanceRate: data.stats?.attendanceRate || 100,
                    revenueGenerated: data.stats?.revenueGenerated || 0,
                    status: (data.status as "On Duty" | "Off Duty") || (data.stats?.sessionsThisWeek > 0 ? "On Duty" : "Off Duty"),
                    specializations: data.specializations || [],
                    certifications: data.certifications || []
                });
            } catch (error) {
                console.error("Failed to fetch trainer details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTrainerDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!trainer) {
        return <div className="min-h-screen flex items-center justify-center">Trainer not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Cover Photo */}
            <section className="relative bg-gradient-to-br from-blue-600 to-cyan-600 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <ImageWithFallback
                        src={trainer.coverPhoto}
                        alt="Trainer Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-cyan-900/80"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <Button
                                    variant="ghost"
                                    className="text-white/70 hover:text-white hover:bg-white/10 pl-0 mb-4"
                                    onClick={() => navigate(-1)}
                                >
                                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back to Trainers
                                </Button>
                                <h1 className="text-white mb-2 text-3xl font-bold">Trainer Profile</h1>
                                <p className="text-blue-100">Manage detailed performance and settings</p>
                            </div>
                            <Badge className={`border-0 text-sm px-3 py-1 ${trainer.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-500'}`}>
                                {trainer.status === 'On Duty' ? <Clock className="w-3 h-3 mr-1" /> : <LogOut className="w-3 h-3 mr-1" />}
                                {trainer.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Overlapping Cards */}
            <section className="-mt-20 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Identity Card */}
                        <Card className="border-0 shadow-xl relative overflow-hidden bg-white/95 backdrop-blur-sm">
                            <CardContent className="p-8 relative z-10">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                    {/* Photo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                                            <ImageWithFallback
                                                src={trainer.avatar}
                                                alt={trainer.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{trainer.name}</h2>
                                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                                    <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">{trainer.role}</Badge>
                                                    {trainer.certifications.map((cert: string, i: number) => (
                                                        <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600">
                                                            {cert}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4 text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                        {trainer.rating} ({trainer.reviews} reviews)
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        {trainer.workingHours}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Message
                                                </Button>
                                                <Button variant="outline" className="bg-white hover:bg-gray-50">
                                                    <Phone className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-3">
                                        <DollarSign className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">${trainer.revenueGenerated.toLocaleString()}</div>
                                    <div className="text-xs text-green-600 font-medium">+15% vs last month</div>
                                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Revenue</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{trainer.clients}</div>
                                    <div className="text-xs text-blue-600 font-medium">Full Capacity</div>
                                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Active Clients</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-3">
                                        <CheckCircle className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{trainer.attendanceRate}%</div>
                                    <div className="text-xs text-orange-600 font-medium">Excellent</div>
                                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Attendance</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-3">
                                        <BarChart className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{trainer.busyPercentage}%</div>
                                    <div className="text-xs text-purple-600 font-medium">High Load</div>
                                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Utilization</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Management Actions */}
                            <Card className="border-0 shadow-sm">
                                <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Settings className="w-5 h-5 text-gray-700" />
                                        Admin Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <div className="font-semibold text-gray-900">Assign Clients</div>
                                            <div className="text-xs text-gray-500">Add members to this trainer</div>
                                        </div>
                                        <Button size="sm" className="bg-gray-900 text-white">Manage +</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <div className="font-semibold text-gray-900">Adjust Commission</div>
                                            <div className="text-xs text-gray-500">Current Base: 15%</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">-</Button>
                                            <span className="font-bold">15%</span>
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">+</Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                                        <div>
                                            <div className="font-semibold text-red-900">Danger Zone</div>
                                            <div className="text-xs text-red-700">Remove trainer access</div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-100 hover:text-red-700">Fire Trainer</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Utilization Chart Placeholder */}
                            <Card className="border-0 shadow-sm">
                                <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <TrendingUp className="w-5 h-5 text-gray-700" />
                                        Weekly Load
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Monday</span>
                                                <span className="font-bold text-gray-900">85%</span>
                                            </div>
                                            <Progress value={85} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Tuesday</span>
                                                <span className="font-bold text-gray-900">92%</span>
                                            </div>
                                            <Progress value={92} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Wednesday</span>
                                                <span className="font-bold text-gray-900">78%</span>
                                            </div>
                                            <Progress value={78} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Thursday</span>
                                                <span className="font-bold text-gray-900">88%</span>
                                            </div>
                                            <Progress value={88} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Friday</span>
                                                <span className="font-bold text-gray-900">65%</span>
                                            </div>
                                            <Progress value={65} className="h-2" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
