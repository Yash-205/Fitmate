import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut } from "lucide-react";
import { Progress } from "./ui/progress";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Users,
  TrendingUp,
  Target,
  Calendar,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Dumbbell,
  Heart,
  Activity,
  Send
} from "lucide-react";

interface ClientProgress {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  program: string;
  progress: number;
  sessionsCompleted: number;
  totalSessions: number;
  currentWeight: number;
  startWeight: number;
  goalWeight: number;
  status: "active" | "inactive" | "on-track" | "needs-attention";
  lastWorkout: string;
  metrics: {
    strength: number;
    cardio: number;
    flexibility: number;
    consistency: number;
  };
  recentActivity: {
    date: string;
    type: string;
    duration: number;
    notes: string;
  }[];
  goals: {
    title: string;
    target: number;
    current: number;
    unit: string;
  }[];
}

const mockClients: ClientProgress[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    email: "sarah.m@email.com",
    joinDate: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    program: "Weight Loss & Nutrition",
    progress: 75,
    sessionsCompleted: 36,
    totalSessions: 48,
    currentWeight: 145,
    startWeight: 165,
    goalWeight: 140,
    status: "on-track",
    lastWorkout: "2 hours ago",
    metrics: {
      strength: 82,
      cardio: 90,
      flexibility: 65,
      consistency: 88
    },
    recentActivity: [
      { date: "2024-11-30", type: "Cardio + Strength", duration: 60, notes: "Great energy today!" },
      { date: "2024-11-28", type: "HIIT Training", duration: 45, notes: "Pushed hard, feeling strong" },
      { date: "2024-11-26", type: "Core & Flexibility", duration: 50, notes: "Improved flexibility" }
    ],
    goals: [
      { title: "Weight Loss", target: 165, current: 145, unit: "lbs" },
      { title: "Body Fat %", target: 20, current: 24, unit: "%" },
      { title: "Weekly Workouts", target: 5, current: 4, unit: "sessions" }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@email.com",
    joinDate: "2024-02-20",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    program: "Strength & Muscle Building",
    progress: 60,
    sessionsCompleted: 28,
    totalSessions: 48,
    currentWeight: 180,
    startWeight: 165,
    goalWeight: 185,
    status: "active",
    lastWorkout: "1 day ago",
    metrics: {
      strength: 95,
      cardio: 70,
      flexibility: 55,
      consistency: 75
    },
    recentActivity: [
      { date: "2024-11-29", type: "Upper Body Strength", duration: 75, notes: "New PR on bench press!" },
      { date: "2024-11-27", type: "Leg Day", duration: 80, notes: "Squats getting stronger" },
      { date: "2024-11-25", type: "Back & Shoulders", duration: 70, notes: "Good form maintained" }
    ],
    goals: [
      { title: "Muscle Gain", target: 185, current: 180, unit: "lbs" },
      { title: "Bench Press", target: 225, current: 205, unit: "lbs" },
      { title: "Squat", target: 315, current: 285, unit: "lbs" }
    ]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    joinDate: "2024-03-10",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    program: "Yoga & Flexibility",
    progress: 85,
    sessionsCompleted: 40,
    totalSessions: 48,
    currentWeight: 125,
    startWeight: 125,
    goalWeight: 125,
    status: "on-track",
    lastWorkout: "5 hours ago",
    metrics: {
      strength: 70,
      cardio: 75,
      flexibility: 95,
      consistency: 92
    },
    recentActivity: [
      { date: "2024-11-30", type: "Vinyasa Flow", duration: 60, notes: "Nailed headstand!" },
      { date: "2024-11-29", type: "Restorative Yoga", duration: 45, notes: "Much needed recovery" },
      { date: "2024-11-27", type: "Power Yoga", duration: 55, notes: "Building strength" }
    ],
    goals: [
      { title: "Flexibility Score", target: 95, current: 88, unit: "%" },
      { title: "Weekly Sessions", target: 5, current: 5, unit: "sessions" },
      { title: "Stress Reduction", target: 90, current: 85, unit: "%" }
    ]
  },
  {
    id: "4",
    name: "David Thompson",
    email: "david.t@email.com",
    joinDate: "2024-04-05",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    program: "Weight Loss & Nutrition",
    progress: 45,
    sessionsCompleted: 18,
    totalSessions: 48,
    currentWeight: 210,
    startWeight: 225,
    goalWeight: 190,
    status: "needs-attention",
    lastWorkout: "5 days ago",
    metrics: {
      strength: 60,
      cardio: 55,
      flexibility: 45,
      consistency: 40
    },
    recentActivity: [
      { date: "2024-11-25", type: "Full Body", duration: 40, notes: "Struggled with motivation" },
      { date: "2024-11-20", type: "Cardio", duration: 30, notes: "Short session" },
      { date: "2024-11-18", type: "Strength Training", duration: 45, notes: "Need to stay consistent" }
    ],
    goals: [
      { title: "Weight Loss", target: 225, current: 210, unit: "lbs" },
      { title: "Weekly Workouts", target: 4, current: 2, unit: "sessions" },
      { title: "Consistency", target: 80, current: 40, unit: "%" }
    ]
  }
];

export function TrainerDashboard() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProgress | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalClients: mockClients.length,
    activeClients: mockClients.filter(c => c.status === "active" || c.status === "on-track").length,
    avgProgress: Math.round(mockClients.reduce((sum, c) => sum + c.progress, 0) / mockClients.length),
    needsAttention: mockClients.filter(c => c.status === "needs-attention").length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-green-100 text-green-700 border-green-200";
      case "active": return "bg-blue-100 text-blue-700 border-blue-200";
      case "needs-attention": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "on-track": return "On Track";
      case "active": return "Active";
      case "needs-attention": return "Needs Attention";
      default: return "Inactive";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-gray-900 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Trainer Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Manage and track your clients' progress</p>
          {/* 🔥 Logout Button Added */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-600" />
                <Badge variant="outline" className="text-xs">Total</Badge>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.totalClients}</div>
              <p className="text-sm text-gray-600">Total Clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-green-600" />
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.activeClients}</div>
              <p className="text-sm text-gray-600">Active Clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <Badge variant="outline" className="text-xs">Avg</Badge>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.avgProgress}%</div>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-red-600" />
                {stats.needsAttention > 0 && <ArrowDownRight className="h-5 w-5 text-red-600" />}
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.needsAttention}</div>
              <p className="text-sm text-gray-600">Needs Attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Clients</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className={`p-4 border-b cursor-pointer transition-all hover:bg-orange-50 ${selectedClient?.id === client.id ? 'bg-orange-50 border-l-4 border-l-orange-600' : ''
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm text-gray-900 truncate">{client.name}</h4>
                            <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                              {getStatusLabel(client.status)}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{client.program}</p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span>Progress</span>
                              <span>{client.progress}%</span>
                            </div>
                            <Progress value={client.progress} className="h-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Details */}
          <div className="lg:col-span-2">
            {selectedClient ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedClient.avatar}
                        alt={selectedClient.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle>{selectedClient.name}</CardTitle>
                        <p className="text-sm text-gray-500">{selectedClient.email}</p>
                        <Badge className={`mt-2 ${getStatusColor(selectedClient.status)}`}>
                          {getStatusLabel(selectedClient.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Member since</p>
                      <p className="text-sm">{new Date(selectedClient.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="goals">Goals</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      {/* Program Info */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-3">Program Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Current Program</p>
                            <p className="text-sm text-gray-900">{selectedClient.program}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Sessions</p>
                            <p className="text-sm text-gray-900">{selectedClient.sessionsCompleted}/{selectedClient.totalSessions}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Last Workout</p>
                            <p className="text-sm text-gray-900">{selectedClient.lastWorkout}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Overall Progress</p>
                            <p className="text-sm text-gray-900">{selectedClient.progress}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Weight Progress */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-3">Weight Progress</h4>
                        <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-4 border border-orange-200">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-gray-600">Start Weight</p>
                              <p className="text-lg text-gray-900">{selectedClient.startWeight} lbs</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Current</p>
                              <p className="text-2xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                                {selectedClient.currentWeight} lbs
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">Goal Weight</p>
                              <p className="text-lg text-gray-900">{selectedClient.goalWeight} lbs</p>
                            </div>
                          </div>
                          <Progress
                            value={((selectedClient.startWeight - selectedClient.currentWeight) / (selectedClient.startWeight - selectedClient.goalWeight)) * 100}
                            className="h-2"
                          />
                          <p className="text-xs text-center text-gray-600 mt-2">
                            {Math.abs(selectedClient.startWeight - selectedClient.currentWeight)} lbs changed
                          </p>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-3">Performance Metrics</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Dumbbell className="h-4 w-4 text-orange-600" />
                                <span className="text-sm text-gray-700">Strength</span>
                              </div>
                              <span className="text-sm text-gray-900">{selectedClient.metrics.strength}%</span>
                            </div>
                            <Progress value={selectedClient.metrics.strength} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Heart className="h-4 w-4 text-orange-600" />
                                <span className="text-sm text-gray-700">Cardio</span>
                              </div>
                              <span className="text-sm text-gray-900">{selectedClient.metrics.cardio}%</span>
                            </div>
                            <Progress value={selectedClient.metrics.cardio} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-orange-600" />
                                <span className="text-sm text-gray-700">Flexibility</span>
                              </div>
                              <span className="text-sm text-gray-900">{selectedClient.metrics.flexibility}%</span>
                            </div>
                            <Progress value={selectedClient.metrics.flexibility} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-orange-600" />
                                <span className="text-sm text-gray-700">Consistency</span>
                              </div>
                              <span className="text-sm text-gray-900">{selectedClient.metrics.consistency}%</span>
                            </div>
                            <Progress value={selectedClient.metrics.consistency} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <h4 className="text-sm text-gray-900">Recent Activity</h4>
                      {selectedClient.recentActivity.map((activity, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Dumbbell className="h-4 w-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-900">{activity.type}</p>
                                <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="h-3 w-3" />
                              {activity.duration} min
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 bg-gray-50 rounded p-2">{activity.notes}</p>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-4">
                      <h4 className="text-sm text-gray-900">Current Goals</h4>
                      {selectedClient.goals.map((goal, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-orange-600" />
                              <h5 className="text-sm text-gray-900">{goal.title}</h5>
                            </div>
                            <Badge variant="outline">
                              {goal.current}/{goal.target} {goal.unit}
                            </Badge>
                          </div>
                          <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Select a Client</h3>
                  <p className="text-gray-500">Choose a client from the list to view their details and progress</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
