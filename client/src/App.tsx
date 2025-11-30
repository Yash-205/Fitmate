import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { Chatbot } from "./components/Chatbot";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Trainers } from "./components/Trainers";
import { Testimonials } from "./components/Testimonials";
import { Gyms } from "./components/Gyms";
import { TrainersListPage } from "./components/TrainersListPage";
import { ChatbotSection } from "./components/Chatbotsection";
import { ChatbotPage } from "./components/ChatbotPage";
import { TrainerProfile } from "./components/TrainerProfile";
import { TrainerDashboard } from "./components/TrainerDashboard";
import { GymsPage } from "./components/GymsPage";
import { GymProfile } from "./components/GymProfile";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ProgramsPage } from "./pages/ProgramsPage";
import { RoleSelection } from "./pages/RoleSelection";

function Layout({ children }: { children: React.ReactNode }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenLogin={() => setShowLogin(true)}
        onOpenRegister={() => setShowRegister(true)}
      />

      <main>
        {children}
      </main>

      <Footer />

      <Chatbot />

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
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <Features />
      <ChatbotSection onNavigateToChatbot={() => navigate("/chatbot")} />
      <Trainers />
      <Gyms />
      <Testimonials />
    </>
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

  useEffect(() => {
    if (!isLoading && user && (user.role === null || user.role === undefined)) {
      navigate('/role-selection');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === null || user.role === undefined) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
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
        <Route path="/gyms/:id" element={<GymProfile />} />
        <Route path="/chatbot" element={<ChatbotPageWrapper />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

