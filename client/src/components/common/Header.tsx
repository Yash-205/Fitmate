import { Dumbbell, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  onNavigateHome?: () => void; // Keeping optional for backward compatibility during refactor
  onNavigateToTrainers?: () => void;
  onNavigateToGyms?: () => void;
}

export function Header({ }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { openLogin, openRegister } = useModal();
  const navigate = useNavigate();

  const showPrograms = !user || (user.role === 'learner' && !user.trainerId && !user.gymId);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Dumbbell className="h-8 w-8 text-orange-600" />
            <span className="text-xl text-gray-900">FitMate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Common Home Link */}
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Home
            </Link>

            {/* Trainer Specific Links */}
            {user?.role === 'trainer' && (
              <>
                <Link
                  to="/trainer/clients"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Clients
                </Link>
                <Link
                  to="/trainer/programs"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Programs
                </Link>
                <Link
                  to="/trainer/schedule"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Schedule
                </Link>
                <Link
                  to="/trainer/my-gym"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  My Gym
                </Link>
                <Link
                  to="/trainer/messages"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Messages
                </Link>
                <Link
                  to="/trainer/earnings"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Earnings
                </Link>
              </>
            )}

            {user?.role === 'gymowner' && (
              <>
                <Link
                  to="/gym-owner/members"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Members
                </Link>
                <Link
                  to="/gym-owner/trainers"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Trainers
                </Link>
                <Link
                  to="/gym-owner/schedule"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Schedule
                </Link>
                <Link
                  to="/gym-owner/finance"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Money
                </Link>
                <Link
                  to="/gym-owner/settings"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Settings
                </Link>
              </>
            )}

            {/* Learner Specific Links */}
            {user?.role === 'learner' && (
              <>
                {!(user.gymId && user.trainerId) && (
                  <Link
                    to="/programs"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Programs
                  </Link>
                )}
                <Link
                  to="/workouts"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  My Workouts
                </Link>
                {user.gymId ? (
                  <Link
                    to="/my-gym"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    My Gym
                  </Link>
                ) : (
                  <Link
                    to="/gyms"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Gyms
                  </Link>
                )}
                {user.trainerId ? (
                  <Link
                    to="/my-trainer"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    My Trainer
                  </Link>
                ) : (
                  <Link
                    to="/trainers"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Trainers
                  </Link>
                )}
                <Link
                  to="/chatbot"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  AI Coach
                </Link>
              </>
            )}

            {/* Unauthenticated Links - show limited options */}
            {!user && (
              <>
                <Link
                  to="/programs"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Programs
                </Link>
                <Link
                  to="/trainers"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Trainers
                </Link>
                <Link
                  to="/gyms"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Gyms
                </Link>
                <Link
                  to="/chatbot"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  AI Coach
                </Link>
              </>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2"
                  >
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/user-profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={openLogin}>
                  Log In
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={openRegister}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-orange-600 transition-colors text-left"
            >
              Home
            </Link>

            {user?.role === 'gymowner' && (
              <>
                <Link
                  to="/gym-owner/members"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Members
                </Link>
                <Link
                  to="/gym-owner/trainers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Trainers
                </Link>
              </>
            )}

            {user?.role === 'trainer' && (
              <>
                <Link
                  to="/trainer/clients"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Clients
                </Link>
                <Link
                  to="/trainer/programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Programs
                </Link>
                <Link
                  to="/trainer/schedule"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Schedule
                </Link>
                <Link
                  to="/trainer/my-gym"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  My Gym
                </Link>
                <Link
                  to="/trainer/messages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Messages
                </Link>
                <Link
                  to="/trainer/earnings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Earnings
                </Link>
              </>
            )}

            {user?.role === 'learner' && (
              <>
                {!(user.gymId && user.trainerId) && (
                  <Link
                    to="/programs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                  >
                    Programs
                  </Link>
                )}
                <Link
                  to="/workouts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  My Workouts
                </Link>
                {user.gymId ? (
                  <Link
                    to="/my-gym"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                  >
                    My Gym
                  </Link>
                ) : (
                  <Link
                    to="/gyms"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                  >
                    Gyms
                  </Link>
                )}
                {user.trainerId ? (
                  <Link
                    to="/my-trainer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                  >
                    My Trainer
                  </Link>
                ) : (
                  <Link
                    to="/trainers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                  >
                    Trainers
                  </Link>
                )}
                <Link
                  to="/chatbot"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  AI Coach
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Programs
                </Link>
                <Link
                  to="/trainers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Trainers
                </Link>
                <Link
                  to="/gyms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Gyms
                </Link>
                <Link
                  to="/chatbot"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  AI Coach
                </Link>
              </>
            )}

            {user ? (
              <div className="pt-2 border-t">
                <p className="text-gray-900 mb-2 font-medium px-2">Welcome, {user.name}</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user-profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" className="w-full" onClick={openLogin}>
                  Log In
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 w-full" onClick={openRegister}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        )}
      </nav>
    </header >
  );
}

