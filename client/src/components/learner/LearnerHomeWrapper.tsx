
import { useAuth } from "../../contexts/AuthContext";
import { LearnerHomeWithTrainer } from "./LearnerHomeWithTrainer";
import { LearnerHomeWithTrainerAndGym } from "./LearnerHomeWithTrainerAndGym";
import React from 'react';

interface LearnerHomeWrapperProps {
    onNavigateToWorkouts?: () => void;
    onNavigateToMyTrainer?: () => void;
    onNavigateToGyms?: () => void;
    onNavigateToGym?: () => void;
    onNavigateToProgress?: () => void;
    onNavigateToSchedule?: () => void;
    defaultComponent: React.ReactNode;
}

export function LearnerHomeWrapper({
    onNavigateToWorkouts,
    onNavigateToMyTrainer,
    onNavigateToGyms,
    onNavigateToGym,
    onNavigateToProgress,
    onNavigateToSchedule,
    defaultComponent
}: LearnerHomeWrapperProps) {
    const { user } = useAuth();

    const hasTrainer = !!user?.trainerId;
    const hasGym = !!user?.gymId;

    // Case 3: Learner has both trainer and gym OR just a gym
    // We use the "WithTrainerAndGym" component as the "Gym Home" as well, adjusting its internal display
    if (hasGym) {
        return (
            <LearnerHomeWithTrainerAndGym
                onNavigateToWorkouts={onNavigateToWorkouts}
                onNavigateToMyTrainer={onNavigateToMyTrainer}
                onNavigateToGym={onNavigateToGym}
                onNavigateToProgress={onNavigateToProgress}
                onNavigateToSchedule={onNavigateToSchedule}
            />
        );
    }

    // Case 2: Learner has trainer but no gym
    if (hasTrainer && !hasGym) {
        return (
            <LearnerHomeWithTrainer
                onNavigateToWorkouts={onNavigateToWorkouts}
                onNavigateToMyTrainer={onNavigateToMyTrainer}
                onNavigateToGyms={onNavigateToGyms}
                onNavigateToProgress={onNavigateToProgress}
            />
        );
    }

    // Case 1: Learner has neither (or just gym, but user spec says "neither trainer nor gym then current is perfect")
    // The logic implies that if they don't have a trainer, we show the default dashboard.
    return <>{defaultComponent}</>;
}
