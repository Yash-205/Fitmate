import {
    User,
    MapPin,
    Clock,
    Target,
    Edit,
    Camera,
    Check,
    Dumbbell,
    Video,
    Building2,
    Heart,
    AlertCircle,
    Bell,
    MessageSquare,
    Bot,
    Lock,
    Pause,
    LogOut,
    CheckCircle,
    Zap,
    TrendingUp,
    CreditCard,
    Calendar,
    ChevronRight,
    UserCog,
    AlertTriangle,
    Percent,
    PauseCircle,
    Phone,
    DollarSign,
    Settings
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



export function GymOwnerMemberDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                // @ts-ignore
                const response = await api.get(`/gyms/members/${id}`);
                const data = response.data as any;

                setMember({
                    id: data._id,
                    name: data.name,
                    photo: data.avatar || "https://github.com/shadcn.png",
                    coverPhoto: "https://images.unsplash.com/photo-1550345332-09e3ac982699?w=1000&auto=format&fit=crop&q=80",
                    plan: data.plan || "Premium Monthly",
                    status: data.stats?.monthlyVisits > 0 ? "Active" : "Risk",
                    joinDate: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    email: data.email,
                    attendanceRate: data.stats?.attendanceScore || 0,
                    totalVisits: data.stats?.totalVisits || 0,
                    lastVisit: data.recentActivity?.[0] ? new Date(data.recentActivity[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : "Never",
                    trainer: "Unassigned", // TODO: Populate if trainerId exists
                    trainerAvatar: "https://github.com/shadcn.png",
                    goal: data.fitnessGoals?.[0] || "General Fitness",
                    spent: "$890" // Placeholder until Payment model connected
                });
            } catch (error) {
                console.error("Failed to fetch member details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMemberDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!member) {
        return <div className="min-h-screen flex items-center justify-center">Member not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Cover Photo */}
            <section className="relative bg-gradient-to-br from-orange-600 to-purple-600 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <ImageWithFallback
                        src={member.coverPhoto}
                        alt="Member Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 to-purple-900/80"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <Button
                                    variant="ghost"
                                    className="text-white/70 hover:text-white hover:bg-white/10 pl-0 mb-4"
                                    onClick={() => navigate(-1)}
                                >
                                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back to Members
                                </Button>
                                <h1 className="text-white mb-2 text-3xl font-bold">Member Profile</h1>
                                <p className="text-orange-100">Detailed view and management actions</p>
                            </div>
                            <Badge className={`border-0 text-sm px-3 py-1 ${member.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {member.status === 'Active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                                {member.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Overlapping Cards */}
            <section className="-mt-20 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Profile Header Card */}
                        <Card className="border-0 shadow-xl relative overflow-hidden bg-white/95 backdrop-blur-sm">
                            <CardContent className="p-8 relative z-10">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                    {/* Profile Photo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                                            <ImageWithFallback
                                                src={member.photo}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h2 className="text-3xl text-gray-900 mb-2 font-bold">{member.name}</h2>
                                                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <CreditCard className="h-4 w-4 text-orange-600" />
                                                        <span>{member.plan}</span>
                                                    </div>
                                                    <span className="text-gray-400">•</span>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-purple-600" />
                                                        <span>Joined {member.joinDate}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                                                    <User className="h-4 w-4" /> Member ID: #{member.id.padStart(4, '0')}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button className="bg-orange-600 hover:bg-orange-700 shadow-md">
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

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-green-100 rounded-full mb-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{member.attendanceRate}%</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Attendance</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-blue-100 rounded-full mb-2">
                                        <Dumbbell className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{member.totalVisits}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total Visits</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-purple-100 rounded-full mb-2">
                                        <Target className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <p className="text-lg font-bold text-gray-900 truncate px-2">{member.goal}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Primary Goal</p>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all text-center">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-center w-10 h-10 mx-auto bg-yellow-100 rounded-full mb-2">
                                        <DollarSign className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{member.spent}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Lifetime Value</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Assigned Trainer */}
                            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <UserCog className="w-5 h-5 text-orange-600" />
                                        Assigned Trainer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <ImageWithFallback
                                            src={member.trainerAvatar}
                                            alt={member.trainer}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{member.trainer}</h3>
                                            <p className="text-sm text-gray-500">Working together since Jan 2023</p>
                                        </div>
                                        <Button variant="outline" className="h-9">Change</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Admin Actions */}
                            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="border-b border-gray-50 bg-gray-50/50">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Settings className="w-5 h-5 text-gray-600" />
                                        Plan Management
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="justify-start gap-2 h-10 bg-white hover:bg-gray-50 border-gray-200">
                                            <PauseCircle className="w-4 h-4 text-orange-500" />
                                            Pause Plan
                                        </Button>
                                        <Button variant="outline" className="justify-start gap-2 h-10 bg-white hover:bg-gray-50 border-gray-200">
                                            <Percent className="w-4 h-4 text-blue-500" />
                                            Add Discount
                                        </Button>
                                        <Button variant="outline" className="col-span-2 justify-start gap-2 h-10 bg-white hover:border-red-200 hover:bg-red-50 text-red-600 border-gray-200">
                                            <AlertTriangle className="w-4 h-4" />
                                            Cancel Membership (Danger)
                                        </Button>
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
