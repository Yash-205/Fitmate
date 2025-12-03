import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Activity, Award, Calendar, TrendingUp, Dumbbell, Target, LogOut, User as UserIcon, MapPin } from 'lucide-react';
import { Progress } from './ui/progress';
import { useNavigate } from 'react-router-dom';
import { TrainerDashboard } from './TrainerDashboard';
import { GymOwnerDashboard } from './GymOwnerDashboard';
import api from '../services/api';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
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
      icon: Activity,
      label: 'Workouts Completed',
      value: '24',
      change: '+12%',
    },
    {
      icon: Award,
      label: 'Goals Achieved',
      value: '8',
      change: '+3',
    },
    {
      icon: Calendar,
      label: 'Current Streak',
      value: '12 days',
      change: 'Personal best!',
    },
    {
      icon: TrendingUp,
      label: 'Weight Progress',
      value: '-8 lbs',
      change: 'On track',
    },
  ];

  const upcomingWorkouts = [
    {
      title: 'Upper Body Strength',
      time: 'Today, 6:00 PM',
      duration: '45 min',
    },
    {
      title: 'HIIT Cardio',
      time: 'Tomorrow, 7:00 AM',
      duration: '30 min',
    },
    {
      title: 'Yoga & Flexibility',
      time: 'Wed, 8:00 AM',
      duration: '60 min',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-600">
              You're making great progress. Keep up the excellent work!
            </p>
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

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-gray-900">{stat.value}</p>
                    <p className="text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Goals */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Current Goals</CardTitle>
              <CardDescription>Track your progress towards your fitness objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Weight Loss Target</span>
                  <span className="text-gray-900">8/15 lbs</span>
                </div>
                <Progress value={53} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Workout Consistency</span>
                  <span className="text-gray-900">24/30 days</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Strength Improvement</span>
                  <span className="text-gray-900">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Workouts */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Workouts</CardTitle>
              <CardDescription>Your scheduled training sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingWorkouts.map((workout, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900">{workout.title}</h4>
                    <p className="text-gray-600">{workout.time}</p>
                    <p className="text-gray-500">{workout.duration}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Trainer and Gym Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Trainer Info */}
          {dashboardData?.trainer ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-orange-600" />
                  Your Trainer
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  {dashboardData.trainer.avatar ? (
                    <img src={dashboardData.trainer.avatar} alt={dashboardData.trainer.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-full h-full p-3 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{dashboardData.trainer.name}</h3>
                  <p className="text-gray-600 text-sm">{dashboardData.trainer.email}</p>
                  {dashboardData.trainer.specializations && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {dashboardData.trainer.specializations.map((spec: string, i: number) => (
                        <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{spec}</span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Find a Trainer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">You don't have a trainer yet. Connect with a professional to reach your goals faster!</p>
                <Button onClick={() => navigate('/trainers')}>Browse Trainers</Button>
              </CardContent>
            </Card>
          )}

          {/* Gym Info */}
          {dashboardData?.gym ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  Your Gym
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center">
                  {dashboardData.gym.avatar ? (
                    <img src={dashboardData.gym.avatar} alt={dashboardData.gym.gymName} className="w-full h-full object-cover" />
                  ) : (
                    <Dumbbell className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{dashboardData.gym.gymName}</h3>
                  <p className="text-gray-600 text-sm">{dashboardData.gym.gymLocation}</p>
                  {dashboardData.gym.facilities && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {dashboardData.gym.facilities.slice(0, 3).map((facility: string, i: number) => (
                        <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{facility}</span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Find a Gym</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Join a gym to access premium equipment and facilities.</p>
                <Button onClick={() => navigate('/gyms')}>Browse Gyms</Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Target className="mr-2 h-4 w-4" />
              Start Today's Workout
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Log Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

