import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
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
  Dumbbell,
  Activity,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Filter,
  Send,
  LogOut,
  Wallet,
  MoreHorizontal
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
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ChatModal } from '../common/ChatModal';
import { ImageWithFallback } from "../common/figma/ImageWithFallback";

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
  { name: 'Premium', value: 35, members: 100, color: '#f97316' }, // Orange-500
  { name: 'Standard', value: 45, members: 129, color: '#8b5cf6' }, // Violet-500
  { name: 'Basic', value: 20, members: 58, color: '#3b82f6' },   // Blue-500
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

  const statCards = [
    {
      title: "Total Members",
      value: mockStats.totalMembers,
      subtext: `${mockStats.activeMembers} active`,
      change: `+${mockStats.attendanceGrowth}%`,
      icon: Users,
      trend: "up",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Monthly Revenue",
      value: `$${(mockStats.monthlyRevenue / 1000).toFixed(1)}k`,
      subtext: "vs last month",
      change: `+${mockStats.revenueGrowth}%`,
      icon: Wallet,
      trend: "up",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Avg Attendance",
      value: `${mockStats.avgAttendance}%`,
      subtext: "Daily average",
      change: "+2.1%",
      icon: Activity,
      trend: "up",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "Trainers Active",
      value: mockStats.activeTrainers,
      subtext: "All slots covered",
      change: "Stable",
      icon: Dumbbell,
      trend: "neutral",
      gradient: "from-orange-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-500 text-lg">
              Performance overview for {selectedPeriod === 'week' ? 'this week' : selectedPeriod === 'month' ? 'this month' : 'this year'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={`capitalize rounded-lg px-4 ${selectedPeriod === period
                  ? 'bg-orange-50 text-orange-700 font-medium'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-sm`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {stat.trend === 'up' ? (
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-gray-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Growth Trend */}
          <Card className="lg:col-span-2 border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">Revenue & Growth</CardTitle>
                  <p className="text-sm text-gray-500">Financial performance vs member acquisition</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={revenueGrowthData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      hide
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f9fafb' }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                      name="Revenue"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="members"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                      name="Members"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Membership Distribution */}
          <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-6 py-6">
              <CardTitle className="text-lg font-bold text-gray-900">Member Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {membershipTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-gray-900">{mockStats.totalMembers}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Members</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                {membershipTypeData.map((type, index) => (
                  <div key={index} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white" style={{ backgroundColor: type.color }}></div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{type.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{type.members} users</span>
                      <span className="text-sm font-bold text-gray-900">{type.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Attendance & Program Popularity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Attendance Pattern */}
          <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-6 py-6">
              <CardTitle className="text-lg font-bold text-gray-900">Attendance Heatmap</CardTitle>
              <p className="text-sm text-gray-500">Peak traffic times by day</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAttendanceData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                    <Tooltip
                      cursor={{ fill: '#f9fafb' }}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}
                    />
                    <Legend iconType="circle" />
                    <Bar dataKey="morning" stackId="a" fill="#ea580c" name="Morning" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="afternoon" stackId="a" fill="#8b5cf6" name="Afternoon" />
                    <Bar dataKey="evening" stackId="a" fill="#3b82f6" name="Evening" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Program Popularity */}
          <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 px-6 py-6">
              <CardTitle className="text-lg font-bold text-gray-900">Top Classes</CardTitle>
              <p className="text-sm text-gray-500">Revenue & participation by program</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {programPopularityData.map((program, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center font-bold text-orange-600 shadow-sm border border-orange-100">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{program.program}</h4>
                        <div className={`flex items-center text-xs font-medium ${program.growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {program.growth > 0 ? '+' : ''}{program.growth}%
                        </div>
                      </div>
                      <Progress value={(program.participants / 100) * 100} className="h-2 mb-1" />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{program.participants} participants</span>
                        <span>${program.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainers/Members List */}
          <div className="lg:col-span-1">
            <Card className="h-full border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="border-b border-gray-50 px-6 py-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">Directory</CardTitle>
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewMode("trainers")}
                      className={`h-7 px-3 rounded-md text-xs font-medium transition-all ${viewMode === "trainers"
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                      Trainers
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewMode("members")}
                      className={`h-7 px-3 rounded-md text-xs font-medium transition-all ${viewMode === "members"
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                      Members
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={`Search ${viewMode}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <div className="h-[500px] overflow-y-auto custom-scrollbar">
                  {viewMode === "trainers" ? (
                    filteredTrainers.map((trainer) => (
                      <div
                        key={trainer._id}
                        className="p-4 border-b border-gray-50 hover:bg-orange-50/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={trainer.avatar}
                            alt={trainer.name}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{trainer.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{trainer.email}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-orange-600 hover:bg-orange-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
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
                    filteredMembers.map((member) => (
                      <div
                        key={member._id}
                        className="p-4 border-b border-gray-50 hover:bg-orange-50/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h4>
                              {member.profileCompleted && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{member.email}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-orange-600 hover:bg-orange-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
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

          {/* Right Column - Equipment */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border border-gray-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-gray-50 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">Facilities Status</CardTitle>
                    <p className="text-sm text-gray-500">Equipment health & maintenance</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Operational
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{mockStats.equipmentStatus.total}</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Units</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-green-50 border border-green-100">
                    <div className="text-3xl font-bold text-green-700 mb-1">{mockStats.equipmentStatus.working}</div>
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">Working</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
                    <div className="text-3xl font-bold text-yellow-700 mb-1">{mockStats.equipmentStatus.maintenance}</div>
                    <div className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">Service</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-red-50 border border-red-100">
                    <div className="text-3xl font-bold text-red-700 mb-1">{mockStats.equipmentStatus.broken}</div>
                    <div className="text-xs font-semibold text-red-600 uppercase tracking-wide">Broken</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700">Overall Health Score</span>
                    <span className="text-green-600">94%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[94%] rounded-full shadow-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-xl rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none" />
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Quick Commands</h3>
                    <p className="text-gray-400 text-sm">Common actions for gym management</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                    <Button className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm">
                      <Dumbbell className="w-4 h-4 mr-2" />
                      Add Trainer
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-lg shadow-orange-900/20">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
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
