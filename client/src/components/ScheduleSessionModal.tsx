import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import api from "../services/api";

interface ScheduleSessionModalProps {
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

export function ScheduleSessionModal({ isOpen, onClose, onSuccess }: ScheduleSessionModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        duration: '',
        date: '',
        time: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.type || !formData.duration || !formData.date || !formData.time) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);

            // Combine date and time
            const scheduledDateTime = new Date(`${formData.date}T${formData.time}`);

            await api.post('/workouts/schedule', {
                title: formData.title,
                type: formData.type,
                duration: parseInt(formData.duration),
                date: scheduledDateTime.toISOString(),
                notes: formData.notes
            });

            // Reset form
            setFormData({
                title: '',
                type: '',
                duration: '',
                date: '',
                time: '',
                notes: ''
            });

            if (onSuccess) onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Error scheduling workout:', err);
            setError(err.response?.data?.message || 'Failed to schedule workout');
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Schedule a Session</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Session Title *</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Leg Day Workout"
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
                            <Label htmlFor="date">Date *</Label>
                            <Input
                                id="date"
                                type="date"
                                min={today}
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time *</Label>
                            <Input
                                id="time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes) *</Label>
                        <Input
                            id="duration"
                            type="number"
                            min="1"
                            placeholder="60"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            placeholder="Any specific goals or focus areas?"
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
                            {loading ? 'Scheduling...' : 'Schedule Session'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
