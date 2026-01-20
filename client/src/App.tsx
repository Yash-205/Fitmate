import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { ModalProvider, useModal } from "./contexts/ModalContext";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { LoginModal } from "./components/common/LoginModal";
import { RegisterModal } from "./components/common/RegisterModal";
import { Chatbot } from "./components/common/Chatbot";
import { Hero } from "./components/common/Hero";
import { Features } from "./components/common/Features";
import { Trainers } from "./components/learner/Trainers";
import { Testimonials } from "./components/common/Testimonials";
import { Gyms } from "./components/learner/Gyms";
import { TrainersListPage } from "./components/learner/TrainersListPage";
import { ChatbotSection } from "./components/common/Chatbotsection";
import { ChatbotPage } from "./components/common/ChatbotPage";
import { TrainerProfile } from "./components/learner/TrainerProfile";
import { TrainerDashboard } from "./components/trainer/TrainerDashboard";
import { GymsPage } from "./components/learner/GymsPage";
import { GymProfile } from "./components/learner/GymProfile";
import { Dashboard } from "./components/common/Dashboard";
import { UserProfile } from "./components/common/UserProfile";
import { MyTrainerPage } from "./components/learner/MyTrainerPage";
import { MyGymPage } from "./components/learner/MyGymPage";
import { TrainerHome } from "./components/trainer/TrainerHome";
import { TrainerClients } from "./components/trainer/TrainerClients";
import { TrainerPrograms } from "./components/trainer/TrainerPrograms";
import { TrainerViewPlan } from "./components/trainer/TrainerViewPlan";
import { TrainerCreateTemplate } from "./components/trainer/TrainerCreateTemplate";
import { TrainerSchedule } from "./components/trainer/TrainerSchedule";
import { TrainerMessages } from "./components/trainer/TrainerMessages";
import { TrainerEarnings } from "./components/trainer/TrainerEarnings";
import { TrainerMyGymPage } from "./components/trainer/TrainerMyGymPage";
import { TrainerPersonalProfilePage } from "./components/trainer/TrainerPersonalProfile";
import { WorkoutsPage } from "./components/learner/WorkoutsPage";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ProgramsPage } from "./pages/ProgramsPage";
import { RoleSelection } from "./pages/RoleSelection";
import { LearnerHomeWrapper } from "./components/learner/LearnerHomeWrapper";
import { GymOwnerHome } from "./components/gym-owner/GymOwnerHome";
import { GymOwnerDashboard } from "./components/gym-owner/GymOwnerDashboard";
import { GymOwnerMembers } from "./components/gym-owner/GymOwnerMembers";
import { GymOwnerTrainers } from "./components/gym-owner/GymOwnerTrainers";
import { GymOwnerSchedule } from "./components/gym-owner/GymOwnerSchedule";
import { GymOwnerFinance } from "./components/gym-owner/GymOwnerFinance";
import { GymOwnerSettings } from "./components/gym-owner/GymOwnerSettings";
import { GymOwnerTrainerDetails } from "./components/gym-owner/GymOwnerTrainerDetails";
import { GymOwnerMemberDetails } from "./components/gym-owner/GymOwnerMemberDetails";
import { TrainerClientDetails } from "./components/trainer/TrainerClientDetails";

function Layout({ children }: { children: React.ReactNode }) {
  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeLogin,
    closeRegister,
    switchToRegister,
    switchToLogin
  } = useModal();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {children}
      </main>

      <Footer />

      <Chatbot />

      <LoginModal
        open={isLoginOpen}
        onClose={closeLogin}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterModal
        open={isRegisterOpen}
        onClose={closeRegister}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
}

function ChatbotPageWrapper() {
  const navigate = useNavigate();
  return <ChatbotPage onBack={() => navigate("/")} />;
}

// Protected route that checks if user has selected a role
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { openLogin } = useModal();

  useEffect(() => {
    if (!isLoading && !user) {
      openLogin();
      navigate('/');
    }
  }, [user, isLoading, navigate, openLogin]);

  useEffect(() => {
    if (!isLoading && user && !user.role) {
      navigate('/role-selection');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) return null;
  if (!user.role) return null;

  return <>{children}</>;
}

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const LandingPage = (
    <>
      <Hero />
      <Features />
      <ChatbotSection onNavigateToChatbot={() => navigate("/chatbot")} />
      <Trainers />
      <Gyms />
      <Testimonials />
    </>
  );

  if (user?.role === 'learner') {
    return (
      <LearnerHomeWrapper
        defaultComponent={LandingPage}
        onNavigateToWorkouts={() => navigate('/workouts')}
        onNavigateToMyTrainer={() => navigate('/my-trainer')}
        onNavigateToGyms={() => navigate('/gyms')}
        onNavigateToGym={() => navigate('/gyms')} // TODO: Navigate to specific gym if available
        onNavigateToProgress={() => navigate('/profile')}
        onNavigateToSchedule={() => navigate('/workouts')}
      />
    );
  }

  if (user?.role === 'trainer') {
    return <TrainerHome />;
  }

  if (user?.role === 'gymowner') {
    return <GymOwnerHome />;
  }

  return LandingPage;
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/profile" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/trainers" element={<TrainersListPage />} />
        <Route path="/gyms" element={<GymsPage />} />
        <Route path="/trainers/:id" element={<TrainerProfile />} />
        <Route path="/my-trainer" element={<ProtectedRoute><MyTrainerPage /></ProtectedRoute>} />
        <Route path="/gyms/:id" element={<GymProfile />} />
        <Route path="/chatbot" element={<ProtectedRoute><ChatbotPageWrapper /></ProtectedRoute>} />
        <Route path="/workouts" element={<ProtectedRoute><WorkoutsPage /></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/my-gym" element={<ProtectedRoute><MyGymPage /></ProtectedRoute>} />

        {/* Trainer Routes */}
        <Route path="/trainer/clients" element={<ProtectedRoute><TrainerClients /></ProtectedRoute>} />
        <Route path="/trainer/clients/:id" element={<ProtectedRoute><TrainerClientDetails /></ProtectedRoute>} />
        <Route path="/trainer/programs" element={<ProtectedRoute><TrainerPrograms /></ProtectedRoute>} />
        <Route path="/trainer/programs/create" element={<ProtectedRoute><TrainerCreateTemplate /></ProtectedRoute>} />
        <Route path="/trainer/programs/:id" element={<ProtectedRoute><TrainerViewPlan /></ProtectedRoute>} />
        <Route path="/trainer/schedule" element={<ProtectedRoute><TrainerSchedule /></ProtectedRoute>} />
        <Route path="/trainer/messages" element={<ProtectedRoute><TrainerMessages /></ProtectedRoute>} />
        <Route path="/trainer/earnings" element={<ProtectedRoute><TrainerEarnings /></ProtectedRoute>} />
        <Route path="/trainer/my-gym" element={<ProtectedRoute><TrainerMyGymPage /></ProtectedRoute>} />
        <Route path="/trainer/profile" element={<ProtectedRoute><TrainerPersonalProfilePage /></ProtectedRoute>} />

        {/* Gym Owner Routes */}
        <Route path="/gym-owner/analytics" element={<ProtectedRoute><GymOwnerDashboard /></ProtectedRoute>} />
        <Route path="/gym-owner/members" element={<ProtectedRoute><GymOwnerMembers /></ProtectedRoute>} />
        <Route path="/gym-owner/schedule" element={<ProtectedRoute><GymOwnerSchedule /></ProtectedRoute>} />
        <Route path="/gym-owner/finance" element={<ProtectedRoute><GymOwnerFinance /></ProtectedRoute>} />
        <Route path="/gym-owner/settings" element={<ProtectedRoute><GymOwnerSettings /></ProtectedRoute>} />
        <Route path="/gym-owner/trainers" element={<ProtectedRoute><GymOwnerTrainers /></ProtectedRoute>} />
        <Route path="/gym-owner/trainers/:id" element={<ProtectedRoute><GymOwnerTrainerDetails /></ProtectedRoute>} />
        <Route path="/gym-owner/members/:id" element={<ProtectedRoute><GymOwnerMemberDetails /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <ChatProvider>
              <AppContent />
            </ChatProvider>
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
