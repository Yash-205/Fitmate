import { Dumbbell, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onNavigateHome?: () => void; // Keeping optional for backward compatibility during refactor
  onNavigateToTrainers?: () => void;
  onNavigateToGyms?: () => void;
}

export function Header({
  onOpenLogin,
  onOpenRegister,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Home
            </Link>
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={onOpenLogin}>
                  Log In
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={onOpenRegister}>
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

            {user ? (
              <>
                <div className="pt-2 border-t">
                  <p className="text-gray-900 mb-2">Welcome, {user.name}</p>
                  <Button
                    variant="outline"
                    className="w-full mb-2"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" onClick={onOpenLogin}>
                  Log In
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 w-full" onClick={onOpenRegister}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

