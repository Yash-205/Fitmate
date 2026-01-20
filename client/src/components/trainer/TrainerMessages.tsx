import { useState } from "react";
import {
    Search,
    MessageSquare,
    Phone,
    Video,
    MoreVertical,
    Send,
    Plus,
    Clock,
    CheckCircle,
    AlertTriangle,
    FileText,
    Calendar,
    ChevronLeft,
    ChevronRight,
    User,
    ArrowRight,
    Zap,
    TrendingUp,
    Dumbbell,
    X,
    Filter
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

// --- Mock Data ---

interface Client {
    id: string;
    name: string;
    avatar: string;
    status: "needs-review" | "missed-workout" | "plan-update" | "silent" | "active";
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    goal: string;
}

const clients: Client[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1645081522795-231884bfcbfc?w=100&h=100&fit=crop",
        status: "needs-review",
        lastMessage: "Submitted workout: Leg Day A",
        timestamp: "10m",
        unreadCount: 1,
        goal: "Strength",
    },
    {
        id: "2",
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1530029081-120107a0c377?w=100&h=100&fit=crop",
        status: "missed-workout",
        lastMessage: "Hey, I couldn't make it yesterday...",
        timestamp: "2h",
        unreadCount: 2,
        goal: "Fat Loss",
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1648863397001-cd77a7e98bd8?w=100&h=100&fit=crop",
        status: "plan-update",
        lastMessage: "Finished the 4-week block!",
        timestamp: "5h",
        unreadCount: 0,
        goal: "Endurance",
    },
    {
        id: "4",
        name: "Alex Martinez",
        avatar: "https://images.unsplash.com/photo-1734191979156-57972139dfee?w=100&h=100&fit=crop",
        status: "silent",
        lastMessage: "Thanks!",
        timestamp: "3d",
        unreadCount: 0,
        goal: "General",
    },
    {
        id: "5",
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1630415187965-236477b0b659?w=100&h=100&fit=crop",
        status: "active",
        lastMessage: "How is my form on the deadlift?",
        timestamp: "1d",
        unreadCount: 0,
        goal: "Hypertrophy",
    },
];

interface Message {
    id: string;
    sender: "user" | "client";
    type: "text" | "workout-submission" | "system-alert" | "image";
    content: string | any;
    timestamp: string;
}

const initialMessages: Message[] = [
    {
        id: "1",
        sender: "client",
        type: "text",
        content: "Hey coach, just finished my session!",
        timestamp: "10:30 AM",
    },
    {
        id: "2",
        sender: "client",
        type: "workout-submission",
        content: {
            title: "Leg Day A",
            duration: "55 min",
            volume: "12,400 lbs",
            exercises: [
                { name: "Squat", sets: "3x5", weight: "225 lbs", rpe: 8 },
                { name: "RDL", sets: "3x8", weight: "185 lbs", rpe: 7 },
            ],
            notes: "Felt strong on squats, but lower back tired on RDLs.",
            metrics: { adherence: 100, intensity: "High" }
        },
        timestamp: "10:32 AM",
    },
];

// --- Components ---

const StatusBadge = ({ status }: { status: Client["status"] }) => {
    switch (status) {
        case "needs-review":
            return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none">Needs Review</Badge>;
        case "missed-workout":
            return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Missed Workout</Badge>;
        case "plan-update":
            return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Plan Update</Badge>;
        case "silent":
            return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">Silent {">"} 48h</Badge>;
        default:
            return null;
    }
};

const WorkoutCard = ({ data, onReview }: { data: any, onReview: () => void }) => (
    <Card className="w-full max-w-sm border-2 border-orange-100 bg-white/50 backdrop-blur-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 flex justify-between items-center border-b border-orange-100">
            <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-900">{data.title}</span>
            </div>
            <span className="text-xs font-mono text-orange-700">{data.duration}</span>
        </div>
        <CardContent className="p-3 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
                <span>Volume</span>
                <span className="font-medium">{data.volume}</span>
            </div>
            <div className="space-y-1">
                {data.exercises.map((ex: any, i: number) => (
                    <div key={i} className="flex justify-between text-xs bg-white p-1.5 rounded border border-gray-100">
                        <span className="font-medium">{ex.name}</span>
                        <span className="text-gray-500">{ex.weight} • {ex.sets}</span>
                    </div>
                ))}
            </div>
            <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 italic">
                "{data.notes}"
            </div>
        </CardContent>
        <CardFooter className="p-2 bg-gray-50 border-t border-gray-100">
            <Button size="sm" className="w-full h-8 bg-orange-600 hover:bg-orange-700 text-white" onClick={onReview}>
                Review Workout
            </Button>
        </CardFooter>
    </Card>
);

export function TrainerMessages() {
    const [selectedClientId, setSelectedClientId] = useState<string>("1");
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [contextPanel, setContextPanel] = useState<"default" | "workout-review" | "inactive">("default");
    const [inputText, setInputText] = useState("");

    const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            type: "text",
            content: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMsg]);
        setInputText("");
    };

    const handleReviewWorkout = () => {
        setContextPanel("workout-review");
    };

    const handleApproveWorkout = () => {
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            type: "system-alert",
            content: "Workout Approved! Great job on maintaining intensity.",
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMsg]);
        setContextPanel("default");
    };

    return (
        <div className="flex h-[calc(100vh-64px)] pt-16 bg-gray-50 overflow-hidden">
            {/* LEFT PANE: CLIENT THREADS */}
            <div className="w-80 border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search clients..." className="pl-9 bg-gray-50 border-gray-200" />
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                        <Badge variant="outline" className="cursor-pointer bg-orange-50 text-orange-700 border-orange-200">Needs Review</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Unread</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Pro</Badge>
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="divide-y divide-gray-50">
                        {clients.map(client => (
                            <div
                                key={client.id}
                                onClick={() => {
                                    setSelectedClientId(client.id);
                                    setContextPanel(client.status === "silent" ? "inactive" : "default");
                                    // Reset messages for demo if switching (in real app, fetch msgs)
                                    if (client.id !== "1") setMessages([]);
                                    else setMessages(initialMessages);
                                }}
                                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedClientId === client.id ? 'bg-orange-50/50 border-l-4 border-orange-500' : 'border-l-4 border-transparent'}`}
                            >
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={client.avatar} />
                                            <AvatarFallback>{client.name[0]}</AvatarFallback>
                                        </Avatar>
                                        {client.status === "active" && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-gray-900 truncate">{client.name}</h4>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{client.timestamp}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate mb-1.5">{client.lastMessage}</p>
                                        <div className="flex justify-between items-center">
                                            <StatusBadge status={client.status} />
                                            {client.unreadCount > 0 && (
                                                <Badge className="bg-orange-600 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">{client.unreadCount}</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* CENTER PANE: CONVERSATION */}
            <div className="flex-1 flex flex-col bg-slate-50 relative min-w-0">
                {/* Chat Header */}
                <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedClient.avatar} />
                            <AvatarFallback>{selectedClient.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-bold text-gray-900">{selectedClient.name}</h2>
                            <p className="text-xs text-gray-500">{selectedClient.goal} • Last active 10m ago</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Phone className="w-5 h-5 text-gray-400" /></Button>
                        <Button variant="ghost" size="icon"><Video className="w-5 h-5 text-gray-400" /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-gray-400" /></Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6 max-w-3xl mx-auto">
                        {/* Date Divider */}
                        <div className="flex justify-center">
                            <span className="text-xs font-medium text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">Today, Oct 24</span>
                        </div>

                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                                    {msg.sender === "client" && (
                                        <Avatar className="w-8 h-8 self-end">
                                            <AvatarImage src={selectedClient.avatar} />
                                            <AvatarFallback>{selectedClient.name[0]}</AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div className={`space-y-1 ${msg.sender === "user" ? "items-end flex flex-col" : ""}`}>
                                        {msg.type === "text" && (
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-tr-none shadow-md"
                                                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm"
                                                }`}>
                                                {msg.content}
                                            </div>
                                        )}

                                        {msg.type === "workout-submission" && (
                                            <WorkoutCard data={msg.content} onReview={handleReviewWorkout} />
                                        )}

                                        {msg.type === "system-alert" && (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100">
                                                <CheckCircle className="w-4 h-4" />
                                                {msg.content}
                                            </div>
                                        )}

                                        <span className="text-[10px] text-gray-400 px-1">{msg.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto relative">
                        {/* AI Draft Suggestion */}
                        {messages.length > 0 && messages[messages.length - 1].sender === "client" && (
                            <div className="absolute bottom-full left-0 mb-4 bg-purple-50 border border-purple-100 p-3 rounded-xl w-full shadow-lg animate-in slide-in-from-bottom-2">
                                <div className="flex items-start gap-3">
                                    <div className="p-1.5 bg-purple-100 rounded-lg">
                                        <Zap className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-purple-900 mb-1">AI Draft Suggestion</p>
                                        <p className="text-sm text-purple-800 mb-2">"Great work on the squat depth! For the RDLs, try keeping the bar closer to your shins to help with the lower back fatigue."</p>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="h-7 text-xs bg-white text-purple-700 border-purple-200 hover:bg-purple-100" onClick={() => setInputText("Great work on the squat depth! For the RDLs, try keeping the bar closer to your shins to help with the lower back fatigue.")}>
                                                Use Draft
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-7 text-xs text-purple-700 hover:bg-purple-100">Dismiss</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 items-center bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl">
                                <Plus className="w-5 h-5" />
                            </Button>
                            <Input
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Type a message..."
                                className="border-0 bg-transparent focus-visible:ring-0 px-0 placeholder:text-gray-400"
                            />
                            <Button size="icon" className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-md" onClick={handleSendMessage}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="text-center mt-2 text-[10px] text-gray-400">
                            No read receipts • No typing indicators
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANE: ACTION PANEL (Context Aware) */}
            <div className="w-80 border-l border-gray-200 bg-white flex-shrink-0 lg:block hidden">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-500 uppercase tracking-wider">Action Panel</span>
                        <Badge variant="outline" className="bg-gray-50 text-gray-600">Context: {contextPanel === "default" ? "General" : contextPanel === "workout-review" ? "Review" : "Inactive"}</Badge>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        {/* CONTEXT: WORKOUT REVIEW */}
                        {contextPanel === "workout-review" && (
                            <div className="space-y-6 animate-in slide-in-from-right-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Review Leg Day A</h3>
                                    <p className="text-sm text-gray-500">Submitted 10m ago</p>
                                </div>

                                <Card className="border-orange-100 bg-orange-50/50">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Squat</span>
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">On Target</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs w-12 text-gray-500">Weight</span>
                                                <Input className="h-8 bg-white" defaultValue="225" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs w-12 text-gray-500">Reps</span>
                                                <Input className="h-8 bg-white" defaultValue="5" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-3">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 shadow-md h-12" onClick={handleApproveWorkout}>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve & Log
                                    </Button>
                                    <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 h-12">
                                        <AlertTriangle className="w-4 h-4 mr-2" />
                                        Request Adjustment
                                    </Button>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="font-medium mb-3 text-sm">Quick Adjustments</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm" className="text-xs">+5lbs Next Session</Button>
                                        <Button variant="outline" size="sm" className="text-xs">Deload Next Week</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTEXT: INACTIVE CLIENT */}
                        {contextPanel === "inactive" && (
                            <div className="space-y-6 animate-in slide-in-from-right-4">
                                <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                        <h3 className="font-bold text-red-900">High Churn Risk</h3>
                                    </div>
                                    <p className="text-sm text-red-700">Client has been silent for 3 days and missed 2 sessions.</p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm text-gray-700">Recommended Actions</h4>
                                    <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 justify-start shadow-sm h-12">
                                        <MessageSquare className="w-4 h-4 mr-3 text-blue-500" />
                                        Send "Nudge" Draft
                                    </Button>
                                    <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 justify-start shadow-sm h-12">
                                        <Calendar className="w-4 h-4 mr-3 text-green-500" />
                                        Schedule Check-in Call
                                    </Button>
                                    <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 justify-start shadow-sm h-12">
                                        <ArrowRight className="w-4 h-4 mr-3 text-orange-500" />
                                        Downgrade Program Intensity
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* CONTEXT: DEFAULT */}
                        {contextPanel === "default" && (
                            <div className="space-y-6">
                                {/* Next Goals */}
                                <Card className="shadow-sm border-gray-100">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Next Goals</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 pt-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Squat 315lbs</span>
                                            <span className="font-bold text-orange-600">92%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-orange-500 h-1.5 rounded-full w-[92%]"></div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Weekly Volume</span>
                                            <span className="font-bold text-green-600">105%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Links */}
                                <div>
                                    <h4 className="font-medium mb-3 text-sm text-gray-700">Quick Access</h4>
                                    <div className="space-y-2">
                                        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                                            <FileText className="w-4 h-4 mr-2" />
                                            View Program Plan
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                                            <User className="w-4 h-4 mr-2" />
                                            Client Profile
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            Progress Charts
                                        </Button>
                                    </div>
                                </div>

                                {/* Private Notes */}
                                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 relative group">
                                    <h4 className="text-xs font-bold text-yellow-800 uppercase mb-2">Private Notes</h4>
                                    <p className="text-sm text-yellow-900 leading-relaxed italic">
                                        "Struggling with sleep lately. Keep volume moderate for next 2 weeks. Check in on stress levels."
                                    </p>
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-6 w-6 text-yellow-600 hover:bg-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
