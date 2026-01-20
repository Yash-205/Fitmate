import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  Activity,
  Award,
  Calendar,
  TrendingUp,
  TrendingDown,
  Dumbbell,
  Target,
  Flame,
  User as UserIcon,
  Trophy,
  Zap,
  ChevronRight,
  Star,
  MapPin,
  Mail,
  Phone,
  Users,
  CheckCircle2,
  Play,
  Sparkles,
  LogOut,
  Clock
} from 'lucide-react';
import { Progress } from '../ui/progress';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { TrainerDashboard } from '../trainer/TrainerDashboard';
import { GymOwnerDashboard } from '../gym-owner/GymOwnerDashboard';
import api from '../../services/api';
import { ChatModal } from './ChatModal';
import { LogProgressModal } from '../learner/LogProgressModal';
import { ScheduleSessionModal } from '../learner/ScheduleSessionModal';
import { WorkoutPlanGenerator } from '../learner/WorkoutPlanGenerator';
import { EditProfileModal } from './EditProfileModal';

// Mock data for charts - these would come from the learner's actual data
const weightProgressData = [
  { week: '1', weight: 165, target: 155, bodyFat: 28 },
  { week: '2', weight: 163, target: 155, bodyFat: 27.5 },
  { week: '3', weight: 161, target: 155, bodyFat: 27 },
  { week: '4', weight: 159, target: 155, bodyFat: 26.5 },
  { week: '5', weight: 158, target: 155, bodyFat: 26 },
  { week: '6', weight: 156, target: 155, bodyFat: 25.5 },
  { week: '7', weight: 155, target: 155, bodyFat: 25 },
  { week: '8', weight: 154, target: 155, bodyFat: 24 },
];

const workoutFrequencyData = [
  { day: 'Mon', workouts: 1, calories: 450 },
  { day: 'Tue', workouts: 1, calories: 520 },
  { day: 'Wed', workouts: 0, calories: 0 },
  { day: 'Thu', workouts: 1, calories: 480 },
  { day: 'Fri', workouts: 1, calories: 500 },
  { day: 'Sat', workouts: 1, calories: 550 },
  { day: 'Sun', workouts: 0, calories: 0 },
];

const caloriesBurnedData = [
  { month: 'Jul', calories: 4200, workouts: 18 },
  { month: 'Aug', calories: 5100, workouts: 20 },
  { month: 'Sep', calories: 5800, workouts: 22 },
  { month: 'Oct', calories: 6500, workouts: 24 },
  { month: 'Nov', calories: 7200, workouts: 26 },
];

const workoutTypeDistribution = [
  { name: 'Strength', value: 35, color: '#ea580c', sessions: 14 },
  { name: 'Cardio', value: 30, color: '#9333ea', sessions: 12 },
  { name: 'Flexibility', value: 20, color: '#3b82f6', sessions: 8 },
  { name: 'HIIT', value: 15, color: '#10b981', sessions: 6 },
];

const weeklyProgressData = [
  { week: 'W1', strength: 70, cardio: 75, flexibility: 60 },
  { week: 'W2', strength: 72, cardio: 78, flexibility: 62 },
  { week: 'W3', strength: 75, cardio: 80, flexibility: 63 },
  { week: 'W4', strength: 78, cardio: 85, flexibility: 64 },
  { week: 'W5', strength: 80, cardio: 88, flexibility: 65 },
  { week: 'W6', strength: 82, cardio: 90, flexibility: 65 },
];

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<{ id: string; name: string } | null>(null);
  const [isLogProgressOpen, setIsLogProgressOpen] = useState(false);

  const [isScheduleSessionOpen, setIsScheduleSessionOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Function to refresh user profile after edit
  const handleProfileUpdated = () => {
    // Ideally re-fetch or rely on context update
    // confirm toast is handled in modal
  };

  // Transform data to match existing component structure if needed, or just pass through
  const trainer = dashboardData?.trainer ? {
    ...dashboardData.trainer,
    specialty: dashboardData.trainer.specializations?.[0] || 'Personal Trainer',
    rating: dashboardData.trainer.rating || 5,
    experience: dashboardData.trainer.experience || 3,
    sessionsCompleted: dashboardData.trainer.sessionsCompleted || 120,
    clients: dashboardData.trainer.clients || 15,
    sessionPrice: dashboardData.trainer.sessionPrice || 50,
    certifications: dashboardData.trainer.certifications || ['Certified Personal Trainer'],
  } : null;

  const gym = dashboardData?.gym ? {
    ...dashboardData.gym,
    name: dashboardData.gym.gymName,
    location: dashboardData.gym.gymLocation,
    image: dashboardData.gym.avatar,
    rating: dashboardData.gym.rating || 4.8,
    memberCount: dashboardData.gym.members || dashboardData.gym.totalMembers || 200,
    monthlyPrice: dashboardData.gym.monthlyPrice || 80,
    openingHours: dashboardData.gym.openingHours || '6:00 AM - 10:00 PM',
    amenities: dashboardData.gym.facilities || ['WiFi', 'Parking', 'Showers'],
  } : null;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        console.log('Dashboard API Response:', response.data);
        setDashboardData(response.data);
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

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (user?.role === 'trainer') {
    return <TrainerDashboard />;
  }
  if (user?.role === 'gymowner') {
    return <GymOwnerDashboard />;
  }

  if (loading) {
    return <div className="min-h-screen pt-24 flex justify-center">Loading...</div>;
  }

  const stats = [
    {
      icon: Flame,
      label: 'Calories Burned',
      value: '7,245',
      change: '+12%',
      trend: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      subtext: 'This month'
    },
    {
      icon: Activity,
      label: 'Workouts Completed',
      value: dashboardData?.stats?.workoutsCompleted?.toString() || '24',
      change: `${dashboardData?.stats?.remainingWorkouts || 12} remaining`,
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      subtext: `of ${dashboardData?.stats?.totalWorkouts || 36} total`
    },
    {
      icon: Trophy,
      label: 'Current Streak',
      value: `${dashboardData?.stats?.streak || 12} days`,
      change: 'Personal best!',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      subtext: 'Keep it up!'
    },
    {
      icon: TrendingDown,
      label: 'Weight Progress',
      value: `${dashboardData?.stats?.weightProgress || 8} lbs`,
      change: '75% to goal',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      subtext: 'Lost'
    },
  ];

  const achievements = [
    { icon: '🔥', title: '7-Day Streak', description: 'Workout 7 days straight', unlocked: true },
    { icon: '💪', title: 'Strength Master', description: 'Complete 50 strength workouts', unlocked: true },
    { icon: '🏃', title: 'Cardio King', description: 'Burn 10,000 calories', unlocked: false, progress: 72 },
    { icon: '🎯', title: 'Goal Crusher', description: 'Achieve 5 fitness goals', unlocked: false, progress: 60 },
  ];

  const recommendations = [
    {
      title: 'Increase Flexibility Training',
      description: 'Your flexibility score is lower than other metrics. Add 2 yoga sessions per week.',
      priority: 'medium',
      icon: Activity
    },
    {
      title: 'Stay Consistent',
      description: 'You\'re doing great! Maintain your current workout frequency to reach your goal.',
      priority: 'low',
      icon: CheckCircle2
    },
    {
      title: 'Nutrition Focus',
      description: 'Consider tracking your protein intake to support muscle recovery.',
      priority: 'high',
      icon: Target
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">
                You're making great progress. Keep up the excellent work!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  <UserIcon className="h-4 w-4" />
                  Edit Profile
                </Button>
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
                onClick={handleLogout}
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              ✓ On Track
            </Badge>
            <Badge variant="outline" className="capitalize">
              {dashboardData?.membershipType || 'premium'} Member
            </Badge>
            {dashboardData?.trainer && (
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                Training with {dashboardData.trainer.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                      {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{stat.change}</span>
                    </div>
                    <p className="text-xs text-gray-500">{stat.subtext}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="team">My Team</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Weight Progress Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Weight & Body Fat Progress</CardTitle>
                      <CardDescription>Your transformation journey over the last 8 weeks</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">On Track</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weightProgressData}>
                      <defs>
                        <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="bodyFatGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" domain={[150, 170]} />
                      <YAxis yAxisId="right" orientation="right" domain={[20, 30]} />
                      <Tooltip />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="weight"
                        stroke="#ea580c"
                        fillOpacity={1}
                        fill="url(#weightGradient)"
                        name="Current Weight (lbs)"
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="bodyFat"
                        stroke="#9333ea"
                        fillOpacity={1}
                        fill="url(#bodyFatGradient)"
                        name="Body Fat %"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="target"
                        stroke="#10b981"
                        strokeDasharray="5 5"
                        name="Target Weight"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Radar */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your overall fitness profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[
                      { metric: 'Strength', score: 82 },
                      { metric: 'Cardio', score: 90 },
                      { metric: 'Flexibility', score: 65 },
                      { metric: 'Consistency', score: 88 },
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Performance"
                        dataKey="score"
                        stroke="#ea580c"
                        fill="#ea580c"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-center p-2 bg-orange-50 rounded-lg">
                      <p className="text-xs text-gray-600">Strength</p>
                      <p className="text-lg font-bold text-gray-900">82%</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600">Cardio</p>
                      <p className="text-lg font-bold text-gray-900">90%</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600">Flexibility</p>
                      <p className="text-lg font-bold text-gray-900">65%</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600">Consistency</p>
                      <p className="text-lg font-bold text-gray-900">88%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals & Progress */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    Your Current Goals
                  </CardTitle>
                  <CardDescription>Track your progress towards your fitness objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {dashboardData?.goals?.length > 0 ? (
                    dashboardData.goals.map((goal: any, index: number) => (
                      <div key={goal._id || index}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-10 h-10 ${index === 0 ? 'bg-gradient-to-r from-orange-600 to-purple-600' :
                              'bg-orange-100'
                              } rounded-lg flex items-center justify-center`}>
                              <Target className={`h-5 w-5 ${index === 0 ? 'text-white' : 'text-orange-600'}`} />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                              <p className="text-xs text-gray-500">
                                {goal.currentValue} / {goal.targetValue} {goal.unit}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                              {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                            </p>
                          </div>
                        </div>
                        <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-2" />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No active goals. Set one to get started!</p>
                  )}
                </CardContent>
              </Card>

              {/* Achievements & Recommendations */}
              <div className="space-y-6">
                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-orange-600" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${achievement.unlocked
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-gray-50 border-gray-200'
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-gray-900">{achievement.title}</h5>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                            {!achievement.unlocked && achievement.progress && (
                              <div className="mt-2">
                                <Progress value={achievement.progress} className="h-1" />
                                <p className="text-xs text-gray-500 mt-1">{achievement.progress}%</p>
                              </div>
                            )}
                          </div>
                          {achievement.unlocked && (
                            <Award className="h-5 w-5 text-orange-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* AI Recommendations */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized insights based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-orange-100">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rec.priority === 'high' ? 'bg-red-100' :
                      rec.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                      <rec.icon className={`h-5 w-5 ${rec.priority === 'high' ? 'text-red-600' :
                        rec.priority === 'medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">{rec.title}</h5>
                      <p className="text-xs text-gray-600">{rec.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {rec.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROGRESS TAB */}
          <TabsContent value="progress" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Workout Frequency */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Workouts and calories burned this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={workoutFrequencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="workouts" fill="#ea580c" radius={[8, 8, 0, 0]} name="Workouts" />
                      <Bar yAxisId="right" dataKey="calories" fill="#9333ea" radius={[8, 8, 0, 0]} name="Calories" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Calories Burned Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Calories Burned Trend</CardTitle>
                  <CardDescription>Monthly calorie expenditure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={caloriesBurnedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="calories"
                        stroke="#9333ea"
                        strokeWidth={3}
                        dot={{ fill: '#9333ea', r: 6 }}
                        name="Calories Burned"
                      />
                      <Line
                        type="monotone"
                        dataKey="workouts"
                        stroke="#ea580c"
                        strokeWidth={2}
                        dot={{ fill: '#ea580c', r: 4 }}
                        name="Workouts"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Workout Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Workout Distribution</CardTitle>
                  <CardDescription>Types of training you&apos;ve completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={workoutTypeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {workoutTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {workoutTypeDistribution.map((type, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                          <span className="text-sm text-gray-600">{type.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{type.sessions}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>6-Week Performance Trend</CardTitle>
                  <CardDescription>Your improvement across key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="strength" stackId="1" stroke="#ea580c" fill="#ea580c" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="cardio" stackId="2" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="flexibility" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Weekly Plan (Replaces Recent Activity) */}
              <div className="lg:col-span-2">
                <WorkoutPlanGenerator />
              </div>

              {/* Upcoming Workouts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    Upcoming Workouts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">Upper Body Strength</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>Today, 6:00 PM</span>
                        <span>•</span>
                        <span>45 min</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">HIIT Cardio</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>Tomorrow, 7:00 AM</span>
                        <span>•</span>
                        <span>30 min</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">Yoga & Flexibility</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>Wed, 8:00 AM</span>
                        <span>•</span>
                        <span>60 min</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start New Workout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MY TEAM TAB */}
          <TabsContent value="team" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Trainer Info */}
              {trainer && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-orange-600" />
                      Your Trainer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 mb-6">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-1">{trainer.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{trainer.specialty}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < trainer.rating ? 'fill-orange-600 text-orange-600' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{trainer.rating}</span>
                        </div>
                        <Badge variant="outline">{trainer.experience} years experience</Badge>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Sessions Completed</span>
                        <span className="text-sm text-gray-900">{trainer.sessionsCompleted}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Total Clients</span>
                        <span className="text-sm text-gray-900">{trainer.clients}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Session Price</span>
                        <span className="text-sm text-gray-900">${trainer.sessionPrice}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-900 mb-2">Certifications:</p>
                      {trainer.certifications.map((cert: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {cert}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button className="flex-1 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gym Info */}
              {gym && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      Your Gym
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg text-gray-900 mb-1">{gym.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {gym.location}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < gym.rating ? 'fill-orange-600 text-orange-600' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{gym.rating}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{gym.memberCount} members</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Monthly Price</span>
                        <span className="text-sm text-gray-900">${gym.monthlyPrice}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Opening Hours</span>
                        <span className="text-sm text-gray-900">{gym.openingHours}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-900 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {gym.amenities.map((amenity: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* If no trainer or gym */}
              {!trainer && !gym && (
                <Card className="lg:col-span-2">
                  <CardContent className="text-center py-16">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-gray-900 mb-2">No Team Members Yet</h3>
                    <p className="text-gray-500 mb-6">Find a trainer or join a gym to enhance your fitness journey</p>
                    <div className="flex gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700">
                        <Users className="h-4 w-4 mr-2" />
                        Find a Trainer
                      </Button>
                      <Button variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Find a Gym
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-orange-600 to-purple-600 border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                <Play className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => setIsScheduleSessionOpen(true)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => setIsLogProgressOpen(true)}
              >
                <Activity className="mr-2 h-4 w-4" />
                Log Progress
              </Button>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                <Dumbbell className="mr-2 h-4 w-4" />
                Browse Programs
              </Button>
            </div>
          </CardContent>
        </Card>
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

      <LogProgressModal
        isOpen={isLogProgressOpen}
        onClose={() => setIsLogProgressOpen(false)}
        onSuccess={() => {
          // Refresh dashboard data
          window.location.reload();
        }}
      />

      <ScheduleSessionModal
        isOpen={isScheduleSessionOpen}
        onClose={() => setIsScheduleSessionOpen(false)}
        onSuccess={() => {
          // Refresh dashboard data
          window.location.reload();
        }}
      />
      {/* Modals */}
      <EditProfileModal
        open={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
}
