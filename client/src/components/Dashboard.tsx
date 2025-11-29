import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Activity, Award, Calendar, TrendingUp, Dumbbell, Target } from 'lucide-react';
import { Progress } from './ui/progress';

export function Dashboard() {
  const { user } = useAuth();

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
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600">
            You're making great progress. Keep up the excellent work!
          </p>
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
