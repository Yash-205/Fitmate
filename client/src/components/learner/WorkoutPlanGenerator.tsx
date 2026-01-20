import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { generateWorkoutPlan, getWorkoutPlan } from '../../services/api';
import { Loader2, Sparkles, Calendar, Dumbbell, Trophy } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

interface Exercise {
    name: string;
    sets: string;
    reps: string;
    notes?: string;
}

interface DayPlan {
    day: string;
    focus: string;
    exercises: Exercise[];
}

interface WorkoutPlan {
    schedule: DayPlan[];
    goal: string;
    duration: string;
}

export function WorkoutPlanGenerator() {
    const [plan, setPlan] = useState<WorkoutPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        loadCurrentPlan();
    }, []);

    const loadCurrentPlan = async () => {
        try {
            setLoading(true);
            const response = await getWorkoutPlan();
            setPlan(response.data as WorkoutPlan);
        } catch (error) {
            // It's okay if no plan exists yet
            console.log('No existing plan found');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            const response = await generateWorkoutPlan({});
            setPlan(response.data as WorkoutPlan);
            toast.success('Workout plan generated successfully!');
        } catch (error) {
            console.error('Generation error:', error);
            toast.error('Failed to generate workout plan. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    if (!plan) {
        return (
            <Card className="border-2 border-dashed border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Workout Plan Yet</h3>
                    <p className="text-gray-500 max-w-md mb-8">
                        Get a personalized weekly workout plan tailored to your goals, experience level, and available equipment.
                    </p>
                    <Button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700"
                    >
                        {generating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Designing Your Plan...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate My Plan
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-orange-600" />
                        Your Weekly Plan
                    </h2>
                    <p className="text-gray-600">Goal: {plan.goal}</p>
                </div>
                <Button variant="outline" onClick={handleGenerate} disabled={generating}>
                    {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Regenerate'}
                </Button>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {plan.schedule.map((day, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg bg-white px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-4 w-full">
                                <Badge variant="outline" className="w-24 justify-center bg-gray-50">
                                    {day.day}
                                </Badge>
                                <span className="font-medium text-gray-900">{day.focus}</span>
                                <span className="text-xs text-gray-500 ml-auto mr-4">
                                    {day.exercises.length} Exercises
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pt-2 pb-6">
                                {day.exercises.map((exercise, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold text-xs">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                                                <div className="flex gap-2">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {exercise.sets} Sets
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {exercise.reps} Reps
                                                    </Badge>
                                                </div>
                                            </div>
                                            {exercise.notes && (
                                                <p className="text-sm text-gray-600 italic">Expected: {exercise.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
