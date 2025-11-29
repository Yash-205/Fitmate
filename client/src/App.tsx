import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { Chatbot } from "./components/Chatbot";
import { Hero } from "./components/Hero";
import { Programs } from "./components/Programs";
import { Features } from "./components/Features";
import { Trainers } from "./components/Trainers";
import { Testimonials } from "./components/Testimonials";
import { Gyms } from "./components/Gyms";
import { TrainersListPage } from "./components/TrainersListPage";
import { TrainerProfile } from "./components/TrainerProfile";
import { GymsPage } from "./components/GymsPage";
import { GymProfile } from "./components/GymProfile";
import { Dashboard } from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { ProgramsPage } from "./pages/ProgramsPage";

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
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return (
    <>
      <Hero />
      <Features />
      <Trainers />
      <Gyms />
      <Testimonials />
    </>
  );
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/trainers" element={<TrainersListPage />} />
        <Route path="/gyms" element={<GymsPage />} />
        <Route path="/trainers/:id" element={<TrainerProfile />} />
        <Route path="/gyms/:id" element={<GymProfile />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

