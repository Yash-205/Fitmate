import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import {
    ArrowLeft,
    Sparkles,
    Save,
    Dumbbell,
    Calendar,
    Target,
    Layers,
    Plus,
    X,
    FileText,
    Brain,
    Wand2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TrainerCreateTemplate() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);

    // AI Generation Placeholder
    const handleAIGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            // In a real app, this would populate form data
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="ghost"
                        className="gap-2 text-gray-600 hover:text-gray-900"
                        onClick={() => navigate("/trainer/programs")}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancel
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-500">
                            Draft saved 2 mins ago
                        </div>
                        <Button className="bg-gray-900 text-white hover:bg-gray-800 gap-2 rounded-xl">
                            <Save className="w-4 h-4" />
                            Save as Draft
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Steps */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-2">
                            {[
                                { id: 1, label: "Basic Details", icon: FileText },
                                { id: 2, label: "Structure", icon: Layers },
                                { id: 3, label: "Review", icon: CheckCircle }
                            ].map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div
                                        key={s.id}
                                        className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${step === s.id
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-500 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setStep(s.id)}
                                    >
                                        <div className={`p-1.5 rounded-lg ${step === s.id ? "bg-blue-200" : "bg-gray-200"}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        {s.label}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* AI Banner */}
                        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-yellow-300" />
                                        AI Program Generator
                                    </h3>
                                    <p className="text-purple-100 text-sm max-w-md">
                                        Describe your goal (e.g., "8-week glute focus for beginners") and we'll build the structure for you.
                                    </p>
                                </div>
                                <Button
                                    onClick={handleAIGenerate}
                                    disabled={isGenerating}
                                    className="bg-white text-purple-700 hover:bg-gray-50 border-0 shadow-lg font-bold"
                                >
                                    {isGenerating ? "Generating..." : "Auto-Fill with AI"}
                                    {!isGenerating && <Wand2 className="w-4 h-4 ml-2" />}
                                </Button>
                            </div>
                        </div>

                        {step === 1 && (
                            <Card className="border border-gray-100 shadow-md rounded-2xl bg-white">
                                <CardContent className="p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-base font-semibold text-gray-900">Program Title</Label>
                                            <Input id="title" placeholder="e.g. Summer Shred 2.0" className="h-12 text-lg rounded-xl" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="desc" className="font-semibold text-gray-900">Description</Label>
                                            <Textarea id="desc" placeholder="What is the main goal of this program?" className="min-h-[100px] rounded-xl" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-gray-900">Difficulty Level</Label>
                                                <Select>
                                                    <SelectTrigger className="h-11 rounded-xl">
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="beginner">Beginner</SelectItem>
                                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                                        <SelectItem value="advanced">Advanced</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-gray-900">Category</Label>
                                                <Select>
                                                    <SelectTrigger className="h-11 rounded-xl">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="strength">Strength</SelectItem>
                                                        <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                                                        <SelectItem value="fat-loss">Fat Loss</SelectItem>
                                                        <SelectItem value="rehab">Rehab</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-gray-900">Duration (Weeks)</Label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <Input type="number" className="pl-10 h-11 rounded-xl" placeholder="12" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-semibold text-gray-900">Sessions per Week</Label>
                                                <div className="relative">
                                                    <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <Input type="number" className="pl-10 h-11 rounded-xl" placeholder="4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button
                                            onClick={() => setStep(2)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl h-11"
                                        >
                                            Next: Build Structure
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {step === 2 && (
                            <Card className="border border-gray-100 shadow-md rounded-2xl bg-white min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Layers className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Program Builder</h3>
                                <p className="text-gray-500 max-w-md mb-6">
                                    This visual builder allows you to drag and drop workout blocks, configure sets/reps, and set progression rules.
                                </p>
                                <Button variant="outline" className="gap-2 rounded-xl">
                                    <Plus className="w-4 h-4" />
                                    Add Your First Week
                                </Button>
                            </Card>
                        )}

                        {step === 3 && (
                            <Card className="border border-gray-100 shadow-md rounded-2xl bg-white min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Publish?</h3>
                                <p className="text-gray-500 max-w-md mb-6">
                                    Review your new template details and publish it to your library.
                                </p>
                                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8">
                                    Publish Template
                                </Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper for step navigation icon
import { CheckCircle } from "lucide-react";
