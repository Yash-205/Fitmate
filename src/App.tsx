import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Programs } from "./components/Programs";
import { Trainers } from "./components/Trainers";
import { Gyms } from "./components/Gyms";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { Dashboard } from "./components/Dashboard";
import { Chatbot } from "./components/Chatbot";
import { TrainerProfile } from "./components/TrainerProfile";
import { TrainersListPage } from "./components/TrainersListPage";
import { GymsPage } from "./components/GymsPage";
import { GymProfile } from "./components/GymProfile";

type Page = "home" | "trainers" | "gyms";

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleNavigateHome = () => {
    setCurrentPage("home");
    setSelectedTrainerId(null);
    setSelectedGymId(null);
    window.scrollTo(0, 0);
  };

  const handleNavigateToTrainers = () => {
    setCurrentPage("trainers");
    setSelectedTrainerId(null);
    setSelectedGymId(null);
  };

  const handleNavigateToGyms = () => {
    setCurrentPage("gyms");
    setSelectedTrainerId(null);
    setSelectedGymId(null);
  };

  const handleTrainerClick = (trainerId: string) => {
    setSelectedTrainerId(trainerId);
    setSelectedGymId(null);
  };

  const handleGymClick = (gymId: string) => {
    setSelectedGymId(gymId);
    setSelectedTrainerId(null);
  };

  const handleBackToTrainers = () => {
    setSelectedTrainerId(null);
    setCurrentPage("trainers");
  };

  const handleBackToGyms = () => {
    setSelectedGymId(null);
    setCurrentPage("gyms");
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div className="min-h-screen">
        <Header 
          onOpenLogin={() => setShowLogin(true)} 
          onOpenRegister={() => setShowRegister(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateToTrainers={handleNavigateToTrainers}
          onNavigateToGyms={handleNavigateToGyms}
        />
        <Dashboard />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  // Render trainer profile if a trainer is selected
  if (selectedTrainerId) {
    return (
      <div className="min-h-screen">
        <Header 
          onOpenLogin={() => setShowLogin(true)} 
          onOpenRegister={() => setShowRegister(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateToTrainers={handleNavigateToTrainers}
          onNavigateToGyms={handleNavigateToGyms}
        />
        <TrainerProfile 
          trainerId={selectedTrainerId} 
          onBack={handleBackToTrainers}
        />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  // Render gym profile if a gym is selected
  if (selectedGymId) {
    return (
      <div className="min-h-screen">
        <Header 
          onOpenLogin={() => setShowLogin(true)} 
          onOpenRegister={() => setShowRegister(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateToTrainers={handleNavigateToTrainers}
          onNavigateToGyms={handleNavigateToGyms}
        />
        <GymProfile 
          gymId={selectedGymId} 
          onBack={handleBackToGyms}
          onTrainerClick={handleTrainerClick}
        />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  // Render gyms page
  if (currentPage === "gyms") {
    return (
      <div className="min-h-screen">
        <Header 
          onOpenLogin={() => setShowLogin(true)} 
          onOpenRegister={() => setShowRegister(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateToTrainers={handleNavigateToTrainers}
          onNavigateToGyms={handleNavigateToGyms}
        />
        <GymsPage onGymClick={handleGymClick} />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  // Render trainers list page
  if (currentPage === "trainers") {
    return (
      <div className="min-h-screen">
        <Header 
          onOpenLogin={() => setShowLogin(true)} 
          onOpenRegister={() => setShowRegister(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateToTrainers={handleNavigateToTrainers}
          onNavigateToGyms={handleNavigateToGyms}
        />
        <TrainersListPage onTrainerClick={handleTrainerClick} />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  // Otherwise show landing page (home)
  return (
    <div className="min-h-screen">
      <Header 
        onOpenLogin={() => setShowLogin(true)} 
        onOpenRegister={() => setShowRegister(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateToTrainers={handleNavigateToTrainers}
        onNavigateToGyms={handleNavigateToGyms}
      />
      <main>
        <Hero />
        <Services />
        <Programs />
        <Trainers onTrainerClick={handleTrainerClick} />
        <Gyms onGymClick={handleGymClick} onViewAll={handleNavigateToGyms} />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      <LoginModal 
        open={showLogin} 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal 
        open={showRegister} 
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
