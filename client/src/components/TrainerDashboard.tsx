import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  Users,
  TrendingUp,
  Target,
  Calendar,
  Search,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Dumbbell,
  Heart,
  Activity,
  DollarSign,
  Star,
  Filter,
  Send,
  LogOut
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ChatModal } from './ChatModal';
import { ScheduleSessionModal } from './ScheduleSessionModal';

// Chart data
const revenueData = [
  { month: 'Jun', revenue: 3200, sessions: 42 },
  { month: 'Jul', revenue: 3800, sessions: 48 },
  { month: 'Aug', revenue: 4200, sessions: 52 },
  { month: 'Sep', revenue: 4600, sessions: 58 },
  { month: 'Oct', revenue: 4400, sessions: 55 },
  { month: 'Nov', revenue: 4800, sessions: 60 },
];

const clientProgressDistribution = [
  { name: 'On Track', value: 65, color: '#10b981' },
  { name: 'Active', value: 20, color: '#3b82f6' },
  { name: 'Needs Attention', value: 10, color: '#ef4444' },
  { name: 'Inactive', value: 5, color: '#6b7280' },
];

const sessionsByDay = [
  { day: 'Mon', sessions: 8, capacity: 10 },
  { day: 'Tue', sessions: 9, capacity: 10 },
  { day: 'Wed', sessions: 7, capacity: 10 },
  { day: 'Thu', sessions: 10, capacity: 10 },
  { day: 'Fri', sessions: 8, capacity: 10 },
  { day: 'Sat', sessions: 6, capacity: 8 },
  { day: 'Sun', sessions: 3, capacity: 5 },
];

const clientRetentionData = [
  { month: 'Jun', retained: 95, new: 3, churned: 1 },
  { month: 'Jul', retained: 96, new: 4, churned: 2 },
  { month: 'Aug', retained: 97, new: 5, churned: 1 },
  { month: 'Sep', retained: 96, new: 3, churned: 2 },
  { month: 'Oct', retained: 98, new: 6, churned: 1 },
  { month: 'Nov', retained: 97, new: 4, churned: 2 },
];

interface ClientProgress {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessGoals?: string[];
  profileCompleted: boolean;
  createdAt: string;
  program?: string;
  status?: string;
  sessionsCompleted?: number;
  totalSessions?: number;
  lastWorkout?: string;
  startWeight?: number;
  currentWeight?: number;
  goalWeight?: number;
  metrics?: {
    strength: number;
    cardio: number;
    flexibility: number;
    consistency: number;
  };
  recentActivity?: Array<{
    type: string;
    date: string;
    duration: number;
    notes: string;
  }>;
  goals?: Array<{
    title: string;
    current: number;
    target: number;
    unit: string;
  }>;
}

export function TrainerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProgress | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScheduleSessionOpen, setIsScheduleSessionOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        const data = response.data as { clients: ClientProgress[] };

        // Enhance clients with mock data for demo purposes
        const enhancedClients = (data.clients || []).map((client, index) => ({
          ...client,
          program: client.fitnessGoals?.[0] || "General Fitness",
          status: client.profileCompleted ? (index % 3 === 0 ? "on-track" : "active") : "needs-attention",
          sessionsCompleted: Math.floor(Math.random() * 20) + 5,
          totalSessions: 24,
          lastWorkout: "2 days ago",
          startWeight: 180 + Math.floor(Math.random() * 40),
          currentWeight: 170 + Math.floor(Math.random() * 30),
          goalWeight: 160 + Math.floor(Math.random() * 20),
          metrics: {
            strength: 60 + Math.floor(Math.random() * 30),
            cardio: 50 + Math.floor(Math.random() * 40),
            flexibility: 40 + Math.floor(Math.random() * 50),
            consistency: 70 + Math.floor(Math.random() * 25)
          },
          recentActivity: [
            {
              type: "Strength Training",
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              duration: 45,
              notes: "Great form on squats, increased weight by 10lbs"
            },
            {
              type: "Cardio Session",
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              duration: 30,
              notes: "Completed 5K run, improving pace"
            }
          ],
          goals: [
            { title: "Weight Loss", current: 8, target: 15, unit: "lbs" },
            { title: "Weekly Workouts", current: 3, target: 5, unit: "sessions" }
          ]
        }));

        setClients(enhancedClients);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.program?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === "active" || c.status === "on-track").length,
    avgProgress: clients.length > 0
      ? Math.round(clients.reduce((sum, c) => sum + ((c.sessionsCompleted || 0) / (c.totalSessions || 1) * 100), 0) / clients.length)
      : 0,
    needsAttention: clients.filter(c => c.status === "needs-attention").length,
    monthlyRevenue: 4800,
    sessionsThisMonth: 60,
    avgRating: 4.9,
    clientRetention: 97
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  Trainer Dashboard
                </h1>
                <p className="text-gray-600">Manage and track your clients' progress</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+8%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalClients}</div>
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-xs text-gray-500 mt-1">{stats.activeClients} active</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">${(stats.monthlyRevenue / 1000).toFixed(1)}k</div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xs text-gray-500 mt-1">{stats.sessionsThisMonth} sessions</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Star className="h-8 w-8 text-purple-600 fill-purple-600" />
                <Badge variant="outline" className="text-xs">Top Rated</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.avgRating}</div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-xs text-gray-500 mt-1">Based on 48 reviews</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-blue-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+2%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.clientRetention}%</div>
              <p className="text-sm text-gray-600">Client Retention</p>
              <p className="text-xs text-gray-500 mt-1">Last 6 months</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue & Sessions Trend</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Monthly performance overview</p>
                </div>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ea580c"
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                    name="Revenue ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="sessions"
                    stroke="#9333ea"
                    strokeWidth={2}
                    name="Sessions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Client Progress Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Client Progress Status</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Distribution overview</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={clientProgressDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {clientProgressDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {clientProgressDistribution.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <span className="text-sm text-gray-600">{type.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{type.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Schedule Capacity */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule Capacity</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Session utilization by day</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionsByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sessions" fill="#ea580c" radius={[8, 8, 0, 0]} name="Booked" />
                  <Bar dataKey="capacity" fill="#e5e7eb" radius={[8, 8, 0, 0]} name="Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Client Retention Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Client Retention Analysis</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Monthly retention metrics</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="retained"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Retained %"
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="New Clients"
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="churned"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Churned"
                    dot={{ fill: '#ef4444', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Clients ({filteredClients.length})</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Button
                    size="sm"
                    variant={filterStatus === "all" ? "default" : "outline"}
                    onClick={() => setFilterStatus("all")}
                    className={filterStatus === "all" ? "bg-orange-600 hover:bg-orange-700" : ""}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === "on-track" ? "default" : "outline"}
                    onClick={() => setFilterStatus("on-track")}
                    className={filterStatus === "on-track" ? "bg-orange-600 hover:bg-orange-700" : ""}
                  >
                    On Track
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === "needs-attention" ? "default" : "outline"}
                    onClick={() => setFilterStatus("needs-attention")}
                    className={filterStatus === "needs-attention" ? "bg-orange-600 hover:bg-orange-700" : ""}
                  >
                    Needs Help
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client._id}
                      onClick={() => setSelectedClient(client)}
                      className={`p-4 border-b cursor-pointer transition-all hover:bg-orange-50 ${selectedClient?._id === client._id ? 'bg-orange-50 border-l-4 border-l-orange-600' : ''
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                          {client.avatar ? (
                            <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-full h-full p-3 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{client.name}</h4>
                            <Badge className={`text-xs ${getStatusColor(client.status || 'active')}`}>
                              {getStatusLabel(client.status || 'active')}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{client.program}</p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span>Progress</span>
                              <span>{Math.round(((client.sessionsCompleted || 0) / (client.totalSessions || 1)) * 100)}%</span>
                            </div>
                            <Progress value={((client.sessionsCompleted || 0) / (client.totalSessions || 1)) * 100} className="h-1" />
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
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        {selectedClient.avatar ? (
                          <img src={selectedClient.avatar} alt={selectedClient.name} className="w-full h-full object-cover" />
                        ) : (
                          <Users className="w-full h-full p-3 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <CardTitle>{selectedClient.name}</CardTitle>
                        <p className="text-sm text-gray-500">{selectedClient.email}</p>
                        <Badge className={`mt-2 ${getStatusColor(selectedClient.status || 'active')}`}>
                          {getStatusLabel(selectedClient.status || 'active')}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Member since</p>
                      <p className="text-sm font-medium">{new Date(selectedClient.createdAt).toLocaleDateString()}</p>
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
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Program Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Current Program</p>
                            <p className="text-sm font-medium text-gray-900">{selectedClient.program}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Sessions</p>
                            <p className="text-sm font-medium text-gray-900">{selectedClient.sessionsCompleted}/{selectedClient.totalSessions}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Last Workout</p>
                            <p className="text-sm font-medium text-gray-900">{selectedClient.lastWorkout}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Overall Progress</p>
                            <p className="text-sm font-medium text-gray-900">{Math.round(((selectedClient.sessionsCompleted || 0) / (selectedClient.totalSessions || 1)) * 100)}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Weight Progress */}
                      {selectedClient.startWeight && selectedClient.currentWeight && selectedClient.goalWeight && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Weight Progress</h4>
                          <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-4 border border-orange-200">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-xs text-gray-600">Start Weight</p>
                                <p className="text-lg font-medium text-gray-900">{selectedClient.startWeight} lbs</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-600">Current</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                                  {selectedClient.currentWeight} lbs
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-600">Goal Weight</p>
                                <p className="text-lg font-medium text-gray-900">{selectedClient.goalWeight} lbs</p>
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
                      )}

                      {/* Performance Metrics */}
                      {selectedClient.metrics && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Dumbbell className="h-4 w-4 text-orange-600" />
                                  <span className="text-sm text-gray-700">Strength</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{selectedClient.metrics.strength}%</span>
                              </div>
                              <Progress value={selectedClient.metrics.strength} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Heart className="h-4 w-4 text-orange-600" />
                                  <span className="text-sm text-gray-700">Cardio</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{selectedClient.metrics.cardio}%</span>
                              </div>
                              <Progress value={selectedClient.metrics.cardio} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Activity className="h-4 w-4 text-orange-600" />
                                  <span className="text-sm text-gray-700">Flexibility</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{selectedClient.metrics.flexibility}%</span>
                              </div>
                              <Progress value={selectedClient.metrics.flexibility} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-orange-600" />
                                  <span className="text-sm text-gray-700">Consistency</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{selectedClient.metrics.consistency}%</span>
                              </div>
                              <Progress value={selectedClient.metrics.consistency} className="h-2" />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
                      {selectedClient.recentActivity && selectedClient.recentActivity.length > 0 ? (
                        selectedClient.recentActivity.map((activity, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <Dumbbell className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
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
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
                      )}
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-900">Current Goals</h4>
                      {selectedClient.goals && selectedClient.goals.length > 0 ? (
                        selectedClient.goals.map((goal, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-orange-600" />
                                <h5 className="text-sm font-medium text-gray-900">{goal.title}</h5>
                              </div>
                              <Badge variant="outline">
                                {goal.current}/{goal.target} {goal.unit}
                              </Badge>
                            </div>
                            <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-8">No active goals</p>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex gap-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700"
                      onClick={() => setIsScheduleSessionOpen(true)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsChatOpen(true)}
                    >
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Client</h3>
                  <p className="text-gray-500">Choose a client from the list to view their details and progress</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {selectedClient && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          recipientId={selectedClient._id}
          recipientName={selectedClient.name}
        />
      )}

      <ScheduleSessionModal
        isOpen={isScheduleSessionOpen}
        onClose={() => setIsScheduleSessionOpen(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </div>
  );
}
