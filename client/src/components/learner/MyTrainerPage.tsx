
import { ArrowLeft, Calendar, MessageCircle, Star, Clock, Award, Target, Video, Phone, Mail, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

interface MyTrainerPageProps {
    onBack?: () => void;
    onTrainerClick?: (trainerId: string) => void;
}



// Dummy chat history
const chatHistory = [
    {
        id: 1,
        sender: "Sarah Johnson",
        message: "Great job on today's workout! Your form on squats has really improved. 💪",
        time: "2 hours ago",
        isTrainer: true
    },
    {
        id: 2,
        sender: "You",
        message: "Thanks Sarah! I've been working on it. Should I increase the weight next session?",
        time: "1 hour ago",
        isTrainer: false
    },
    {
        id: 3,
        sender: "Sarah Johnson",
        message: "Yes, let's add 5 lbs. Your core stability is strong enough now. See you tomorrow!",
        time: "45 minutes ago",
        isTrainer: true
    },
    {
        id: 4,
        sender: "You",
        message: "Perfect! Looking forward to it 🙌",
        time: "40 minutes ago",
        isTrainer: false
    }
];

// Dummy upcoming sessions
const upcomingSessions = [
    {
        id: 1,
        date: "Tomorrow",
        time: "3:00 PM - 4:00 PM",
        type: "Strength Training",
        location: "PowerFit Gym - Studio A"
    },
    {
        id: 2,
        date: "Dec 31, 2025",
        time: "10:00 AM - 11:00 AM",
        type: "HIIT Cardio",
        location: "PowerFit Gym - Cardio Zone"
    },
    {
        id: 3,
        date: "Jan 2, 2026",
        time: "3:00 PM - 4:00 PM",
        type: "Upper Body Focus",
        location: "PowerFit Gym - Studio A"
    }
];

// Other available trainers
const otherTrainers = [
    {
        id: "2",
        name: "Mike Chen",
        specialty: "HIIT & Weight Loss",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
        experience: "6 years",
        hourlyRate: "$70/hour"
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        specialty: "Yoga & Flexibility",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
        experience: "10 years",
        hourlyRate: "$65/hour"
    },
    {
        id: "4",
        name: "David Kim",
        specialty: "Sports Performance",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
        experience: "7 years",
        hourlyRate: "$80/hour"
    },
    {
        id: "5",
        name: "Lisa Anderson",
        specialty: "Pilates & Core",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        experience: "9 years",
        hourlyRate: "$72/hour"
    }
];

export function MyTrainerPage({ onBack, onTrainerClick }: MyTrainerPageProps) {
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentTrainer, setCurrentTrainer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Initial dummy data for fallback or loading state structure if needed
    // But we will use loading state.

    useEffect(() => {
        const fetchTrainer = async () => {
            if (user?.trainerId) {
                try {
                    const response = await api.get(`/trainers/${user.trainerId}`);
                    const data = response.data as any;
                    setCurrentTrainer({
                        id: data._id,
                        name: data.name,
                        specialty: data.specializations?.[0] || "Fitness Coach",
                        rating: data.rating || 5.0,
                        image: data.avatar || "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
                        experience: `${data.yearsOfExperience || 5} years`,
                        certifications: data.certifications || ["Certified Trainer"],
                        bio: data.bio || "Passionate about helping clients build strength and confidence.",
                        availability: ["Mon-Fri: 6AM - 8PM", "Sat: 8AM - 2PM"], // Mock
                        hourlyRate: "$75/hour", // Mock
                        sessionsCompleted: data.stats?.sessionsCompleted || 24,
                        nextSession: "Tomorrow at 3:00 PM" // Mock
                    });
                } catch (error) {
                    console.error("Failed to fetch trainer", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchTrainer();
    }, [user?.trainerId]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/profile');
        }
    };

    const handleTrainerSwitch = (trainerId: string) => {
        if (trainerId === "all") {
            navigate('/trainers');
        } else {
            navigate(`/trainers/${trainerId}`);
        }
    };

    if (loading) return <div className="min-h-screen pt-24 text-center">Loading trainer details...</div>;
    // Keep sidebar and header even if no trainer? Maybe just show explore.
    // But for "My Trainer" page, if no trainer, we should probably redirect or show empty state.
    const hasTrainer = !!currentTrainer;

    // Dummy data for when no trainer is assigned, so UI doesn't break if we render
    const displayTrainer = currentTrainer || {
        id: "placeholder",
        name: "No Trainer Assigned",
        specialty: "-",
        rating: 0,
        image: "https://github.com/shadcn.png",
        experience: "-",
        certifications: [],
        bio: "You haven't selected a trainer yet.",
        availability: [],
        hourlyRate: "-",
        sessionsCompleted: 0,
        nextSession: "-"
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Dashboard</span>
                </button>

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                        My Trainer
                    </h1>
                    <p className="text-gray-600">Manage your training sessions and communicate with your trainer</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Trainer Profile Card */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <Avatar className="h-32 w-32 border-4 border-orange-100">
                                        <AvatarImage src={displayTrainer.image} alt={displayTrainer.name} className="object-cover" />
                                        <AvatarFallback>{displayTrainer.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h2 className="text-2xl font-bold mb-1">{displayTrainer.name}</h2>
                                                <p className="text-orange-600 mb-2 font-medium">{displayTrainer.specialty}</p>
                                            </div>
                                            {hasTrainer && (
                                                <Badge className="bg-gradient-to-r from-orange-600 to-purple-600 text-white border-0">
                                                    Your Trainer
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{displayTrainer.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Award className="h-4 w-4" />
                                                <span>{displayTrainer.experience}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Target className="h-4 w-4" />
                                                <span>{displayTrainer.sessionsCompleted} sessions completed</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4">{displayTrainer.bio}</p>

                                        <div className="flex gap-2 flex-wrap">
                                            <Button className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white shadow-md transition-all hover:shadow-lg">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Book Session
                                            </Button>
                                            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                                                <Video className="h-4 w-4 mr-2" />
                                                Video Call
                                            </Button>
                                            <Button variant="outline">
                                                <Phone className="h-4 w-4 mr-2" />
                                                Call
                                            </Button>
                                            <Button variant="outline">
                                                <Mail className="h-4 w-4 mr-2" />
                                                Email
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 mb-2">Certifications</p>
                                        <div className="flex flex-wrap gap-1">
                                            {displayTrainer.certifications.map((cert: string, index: number) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                                    {cert}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 mb-2">Availability</p>
                                        {displayTrainer.availability.map((time: string, index: number) => (
                                            <p key={index} className="text-sm text-gray-600 mb-1">{time}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 mb-2">Rate</p>
                                        <p className="text-lg font-bold text-orange-600">{displayTrainer.hourlyRate}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs Section */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="overview">Upcoming Sessions</TabsTrigger>
                                <TabsTrigger value="chat">Chat History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                                {/* Next Session Alert */}
                                <Card className="border-orange-200 bg-orange-50/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-orange-100 p-2 rounded-lg">
                                                <Clock className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Next Session</p>
                                                <p className="text-orange-600 font-semibold">{displayTrainer.nextSession}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Upcoming Sessions */}
                                {upcomingSessions.map((session) => (
                                    <Card key={session.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className="bg-orange-100 p-3 rounded-lg flex items-center justify-center h-12 w-12">
                                                        <Calendar className="h-6 w-6 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-gray-900">{session.type}</h3>
                                                            <Badge variant="outline" className="text-xs">{session.date}</Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-1 flex items-center">
                                                            <Clock className="h-3 w-3 inline mr-1" />
                                                            {session.time}
                                                        </p>
                                                        <p className="text-sm text-gray-600 flex items-center">
                                                            <Target className="h-3 w-3 inline mr-1" />
                                                            {session.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">Reschedule</Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>

                            <TabsContent value="chat" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageCircle className="h-5 w-5 text-orange-600" />
                                            Chat with {displayTrainer.name}
                                        </CardTitle>
                                        <CardDescription>Your recent conversation</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto p-2">
                                            {chatHistory.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`flex gap-3 ${!message.isTrainer ? 'flex-row-reverse' : ''}`}
                                                >
                                                    <Avatar className="h-8 w-8">
                                                        {message.isTrainer ? (
                                                            <>
                                                                <AvatarImage src={displayTrainer.image} />
                                                                <AvatarFallback>SJ</AvatarFallback>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <AvatarFallback className="bg-orange-100 text-orange-600">
                                                                    <User className="h-4 w-4" />
                                                                </AvatarFallback>
                                                            </>
                                                        )}
                                                    </Avatar>
                                                    <div className={`flex-1 ${!message.isTrainer ? 'flex flex-col items-end' : ''}`}>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-medium text-gray-900">{message.sender}</span>
                                                            <span className="text-xs text-gray-500">{message.time}</span>
                                                        </div>
                                                        <div
                                                            className={`inline-block p-3 rounded-lg max-w-[85%] ${message.isTrainer
                                                                ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                                                                : 'bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-tr-none'
                                                                }`}
                                                        >
                                                            <p className="text-sm">{message.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2 pt-4 border-t">
                                            <input
                                                type="text"
                                                placeholder="Type your message..."
                                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            />
                                            <Button className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700">
                                                Send
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar - Switch Trainer */}
                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-orange-600" />
                                    Switch Trainer
                                </CardTitle>
                                <CardDescription>Explore other trainers available for you</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {otherTrainers.map((trainer) => (
                                    <div
                                        key={trainer.id}
                                        className="p-3 border rounded-lg hover:border-orange-600 hover:shadow-md transition-all cursor-pointer bg-white group"
                                        onClick={() => handleTrainerSwitch(trainer.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={trainer.image} alt={trainer.name} />
                                                <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{trainer.name}</h4>
                                                <p className="text-xs text-gray-500 truncate mb-1">{trainer.specialty}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs font-medium text-gray-700">{trainer.rating}</span>
                                                    </div>
                                                    <span className="text-xs font-medium text-green-600">{trainer.hourlyRate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 mt-2"
                                    onClick={() => handleTrainerSwitch("all")}
                                >
                                    View All Trainers
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
