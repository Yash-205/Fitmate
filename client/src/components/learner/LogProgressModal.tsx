import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import api from "../../services/api";

interface LogProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const workoutTypes = [
    "Cardio",
    "Strength Training",
    "Yoga",
    "HIIT",
    "Cycling",
    "Running",
    "Swimming",
    "CrossFit",
    "Pilates",
    "Other"
];

export function LogProgressModal({ isOpen, onClose, onSuccess }: LogProgressModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        duration: '',
        calories: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.type || !formData.duration) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            await api.post('/workouts/log', {
                title: formData.title,
                type: formData.type,
                duration: parseInt(formData.duration),
                calories: formData.calories ? parseInt(formData.calories) : 0,
                notes: formData.notes,
                date: new Date()
            });

            // Reset form
            setFormData({
                title: '',
                type: '',
                duration: '',
                calories: '',
                notes: ''
            });

            if (onSuccess) onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Error logging workout:', err);
            setError(err.response?.data?.message || 'Failed to log workout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Log Your Progress</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Workout Title *</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Morning Run"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Workout Type *</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select workout type" />
                            </SelectTrigger>
                            <SelectContent>
                                {workoutTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes) *</Label>
                            <Input
                                id="duration"
                                type="number"
                                min="1"
                                placeholder="30"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="calories">Calories Burned</Label>
                            <Input
                                id="calories"
                                type="number"
                                min="0"
                                placeholder="250"
                                value={formData.calories}
                                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            placeholder="How did it feel? Any achievements?"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                            disabled={loading}
                        >
                            {loading ? 'Logging...' : 'Log Workout'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
