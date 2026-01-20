
import { useState, useEffect } from "react";
import { MyWorkoutsAIPage } from "./MyWorkoutsAIPage";
import { MyWorkoutsTrainerPage } from "./MyWorkoutsTrainerPage";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function WorkoutsPage() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    const [isTrainerMode, setIsTrainerMode] = useState(false);

    useEffect(() => {
        if (user?.trainerId) {
            setIsTrainerMode(true);
        } else {
            setIsTrainerMode(false);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="relative">
            {isTrainerMode ? (
                <MyWorkoutsTrainerPage
                    onOpenChat={() => navigate('/my-trainer')}
                    onViewTrainerProfile={() => navigate('/my-trainer')}
                />
            ) : (
                <MyWorkoutsAIPage
                    onOpenChatbot={() => navigate('/chatbot')}
                    onFindTrainer={() => navigate('/trainers')}
                />
            )}
        </div>
    );
}
