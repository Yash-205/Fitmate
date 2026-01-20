import { useAuth } from "../../contexts/AuthContext";
import { LearnerProfilePage } from "../learner/LearnerProfile";
import { TrainerPersonalProfilePage } from "../trainer/TrainerPersonalProfile";
import { GymOwnerProfilePage } from "../gym-owner/GymOwnerProfile";
import { useNavigate } from "react-router-dom";

export function UserProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    if (!user) {
        return <div className="min-h-screen pt-24 flex justify-center">Please log in to view your profile.</div>;
    }

    if (user.role === 'trainer') {
        return <TrainerPersonalProfilePage onBack={handleBack} />;
    }

    if (user.role === 'gymowner') {
        return <GymOwnerProfilePage onBack={handleBack} />;
    }

    // Default to learner profile for learners or any other role
    return <LearnerProfilePage onBack={handleBack} />;
}
