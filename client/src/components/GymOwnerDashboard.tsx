import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Dumbbell,
  Activity,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
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
  ComposedChart,
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
import { useEffect } from "react";

// Chart data
const revenueGrowthData = [
  { month: 'Jun', revenue: 38500, members: 265, trainers: 8 },
  { month: 'Jul', revenue: 41200, members: 270, trainers: 8 },
  { month: 'Aug', revenue: 42800, members: 275, trainers: 8 },
  { month: 'Sep', revenue: 43900, members: 280, trainers: 8 },
  { month: 'Oct', revenue: 44200, members: 282, trainers: 8 },
  { month: 'Nov', revenue: 45680, members: 287, trainers: 8 },
];

const membershipTypeData = [
  { name: 'Premium', value: 35, members: 100, color: '#ea580c' },
  { name: 'Standard', value: 45, members: 129, color: '#9333ea' },
  { name: 'Basic', value: 20, members: 58, color: '#3b82f6' },
];

const dailyAttendanceData = [
  { day: 'Mon', morning: 82, afternoon: 65, evening: 95 },
  { day: 'Tue', morning: 78, afternoon: 70, evening: 88 },
  { day: 'Wed', morning: 85, afternoon: 68, evening: 92 },
  { day: 'Thu', morning: 80, afternoon: 72, evening: 90 },
  { day: 'Fri', morning: 88, afternoon: 75, evening: 85 },
  { day: 'Sat', morning: 95, afternoon: 82, evening: 70 },
  { day: 'Sun', morning: 75, afternoon: 60, evening: 55 },
];

const programPopularityData = [
  { program: 'HIIT', participants: 87, growth: 15, revenue: 8700 },
  { program: 'Yoga', participants: 72, growth: 22, revenue: 7200 },
  { program: 'Strength', participants: 68, growth: 10, revenue: 6800 },
  { program: 'Cardio', participants: 54, growth: -5, revenue: 5400 },
  { program: 'CrossFit', participants: 45, growth: 8, revenue: 4500 },
];

const memberRetentionData = [
  { month: 'Jun', retained: 92, new: 15, churned: 8 },
  { month: 'Jul', retained: 93, new: 18, churned: 7 },
  { month: 'Aug', retained: 94, new: 20, churned: 6 },
  { month: 'Sep', retained: 93, new: 16, churned: 7 },
  { month: 'Oct', retained: 95, new: 12, churned: 5 },
  { month: 'Nov', retained: 96, new: 14, churned: 4 },
];

const trainerPerformanceComparison = [
  { name: 'Sarah J.', clients: 24, rating: 5.0, revenue: 4800 },
  { name: 'Mike R.', clients: 18, rating: 4.9, revenue: 3600 },
  { name: 'Lisa W.', clients: 20, rating: 4.8, revenue: 4000 },
  { name: 'Marcus T.', clients: 16, rating: 4.9, revenue: 3200 },
  { name: 'Amanda F.', clients: 12, rating: 5.0, revenue: 2400 },
];

interface Trainer {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  specializations?: string[];
  certifications?: string[];
}

interface Member {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessGoals?: string[];
  profileCompleted: boolean;
  createdAt: string;
}

export function GymOwnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"trainers" | "members">("trainers");
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<{ id: string; name: string } | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        const data = response.data as { trainers: Trainer[]; members: Member[] };
        setTrainers(data.trainers || []);
        setMembers(data.members || []);
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

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mockStats = {
    totalMembers: members.length || 287,
    activeMembers: members.length || 245,
    totalTrainers: trainers.length || 8,
    activeTrainers: trainers.length || 8,
    monthlyRevenue: 45680,
    revenueGrowth: 12.5,
    avgAttendance: 78,
    attendanceGrowth: 8.3,
    equipmentStatus: {
      total: 150,
      working: 142,
      maintenance: 6,
      broken: 2
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 border-green-200";
      case "on-track": return "bg-green-100 text-green-700 border-green-200";
      case "expired": return "bg-red-100 text-red-700 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  Gym Owner Dashboard
                </h1>
                <p className="text-gray-600">Manage your gym, trainers, and members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex gap-2">
                <Button
                  variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('week')}
                  className={selectedPeriod === 'week' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                >
                  Week
                </Button>
                <Button
                  variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('month')}
                  className={selectedPeriod === 'month' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                >
                  Month
                </Button>
                <Button
                  variant={selectedPeriod === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('year')}
                  className={selectedPeriod === 'year' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                >
                  Year
                </Button>
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
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+{mockStats.attendanceGrowth}%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{mockStats.totalMembers}</div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-xs text-gray-500 mt-1">{mockStats.activeMembers} active</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Dumbbell className="h-8 w-8 text-orange-600" />
                <Badge variant="outline" className="text-xs">All Active</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{mockStats.totalTrainers}</div>
              <p className="text-sm text-gray-600">Trainers</p>
              <p className="text-xs text-gray-500 mt-1">{mockStats.activeTrainers} active</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+{mockStats.revenueGrowth}%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">${(mockStats.monthlyRevenue / 1000).toFixed(1)}k</div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-purple-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+{mockStats.attendanceGrowth}%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{mockStats.avgAttendance}%</div>
              <p className="text-sm text-gray-600">Avg Attendance</p>
              <p className="text-xs text-gray-500 mt-1">Daily average</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Growth Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue & Member Growth</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">6-month performance overview</p>
                </div>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={revenueGrowthData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                    name="Revenue ($)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="members"
                    fill="#ea580c"
                    radius={[8, 8, 0, 0]}
                    name="Members"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Membership Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Types</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Distribution by tier</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={membershipTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {membershipTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {membershipTypeData.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <span className="text-sm text-gray-600">{type.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{type.members} ({type.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Attendance & Program Popularity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Attendance Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Pattern</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Peak hours by day</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="morning" stackId="a" fill="#ea580c" name="Morning" />
                  <Bar dataKey="afternoon" stackId="a" fill="#9333ea" name="Afternoon" />
                  <Bar dataKey="evening" stackId="a" fill="#3b82f6" name="Evening" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Program Popularity */}
          <Card>
            <CardHeader>
              <CardTitle>Program Popularity & Revenue</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Top performing programs</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programPopularityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="program" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participants" fill="#ea580c" name="Participants" />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Member Retention & Trainer Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Member Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Member Retention Analysis</CardTitle>
              <p className="text-sm text-gray-500 mt-1">6-month retention trends</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={memberRetentionData}>
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
                    name="Retention %"
                    dot={{ fill: '#10b981', r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="New Members"
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

          {/* Trainer Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Trainer Performance Comparison</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Client count & revenue</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trainerPerformanceComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="clients"
                    fill="#ea580c"
                    radius={[8, 8, 0, 0]}
                    name="Clients"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    name="Revenue ($)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainers/Members List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>
                    {viewMode === "trainers" ? `Trainers (${filteredTrainers.length})` : `Members (${filteredMembers.length})`}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={viewMode === "trainers" ? "default" : "outline"}
                      onClick={() => setViewMode("trainers")}
                      className={viewMode === "trainers" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      <Dumbbell className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "members" ? "default" : "outline"}
                      onClick={() => setViewMode("members")}
                      className={viewMode === "members" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={`Search ${viewMode}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {viewMode === "trainers" ? (
                    // Trainers List
                    filteredTrainers.map((trainer) => (
                      <div
                        key={trainer._id}
                        className="p-4 border-b hover:bg-orange-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden"
                            onClick={() => navigate(`/trainers/${trainer._id}`)}
                          >
                            {trainer.avatar ? (
                              <img src={trainer.avatar} alt={trainer.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-full h-full p-3 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 truncate">{trainer.name}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{trainer.email}</p>
                            {trainer.specializations && (
                              <div className="flex flex-wrap gap-1">
                                {trainer.specializations.slice(0, 2).map((spec, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs font-normal">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setChatRecipient({ id: trainer._id, name: trainer.name });
                              setIsChatOpen(true);
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Members List
                    filteredMembers.map((member) => (
                      <div
                        key={member._id}
                        className="p-4 border-b hover:bg-orange-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-full h-full p-3 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 truncate">{member.name}</h4>
                              {member.profileCompleted && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{member.email}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar className="h-3 w-3" />
                              <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setChatRecipient({ id: member._id, name: member.name });
                              setIsChatOpen(true);
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Program Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Program Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programPopularityData.map((program, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{program.program}</p>
                            <p className="text-xs text-gray-500">{program.participants} participants • ${program.revenue} revenue</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${program.growth >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {program.growth >= 0 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>{Math.abs(program.growth)}%</span>
                        </div>
                      </div>
                      <Progress
                        value={(program.participants / mockStats.totalMembers) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-orange-600" />
                  Equipment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{mockStats.equipmentStatus.total}</div>
                    <p className="text-xs text-gray-600">Total Equipment</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-700 mb-1">
                      <CheckCircle className="h-5 w-5" />
                      {mockStats.equipmentStatus.working}
                    </div>
                    <p className="text-xs text-green-700">Working</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-700 mb-1">
                      <Clock className="h-5 w-5" />
                      {mockStats.equipmentStatus.maintenance}
                    </div>
                    <p className="text-xs text-yellow-700">Maintenance</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-red-700 mb-1">
                      <AlertCircle className="h-5 w-5" />
                      {mockStats.equipmentStatus.broken}
                    </div>
                    <p className="text-xs text-red-700">Broken</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Equipment Health</span>
                    <span className="font-medium text-gray-900">
                      {Math.round((mockStats.equipmentStatus.working / mockStats.equipmentStatus.total) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(mockStats.equipmentStatus.working / mockStats.equipmentStatus.total) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-orange-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    <Users className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Add Trainer
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {chatRecipient && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setChatRecipient(null);
          }}
          recipientId={chatRecipient.id}
          recipientName={chatRecipient.name}
        />
      )}
    </div>
  );
}
