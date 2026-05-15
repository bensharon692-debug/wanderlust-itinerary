import { Plane, Map, Calendar, User, Search, Menu, X, CreditCard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavbarProps {
  activeTab: "home" | "planner" | "my-trips" | "booking";
  setActiveTab: (tab: "home" | "planner" | "my-trips" | "booking") => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Explore", icon: Map },
    { id: "planner", label: "Plan", icon: Plane },
    { id: "booking", label: "Bookings", icon: CreditCard },
    { id: "my-trips", label: "My Trips", icon: Calendar },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">VagaBond</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === item.id ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setIsMenuOpen(false);
              }}
              className={`flex items-center gap-3 text-lg font-medium p-2 rounded-lg ${
                activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-slate-600"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
          <Button className="w-full bg-blue-600 text-white py-6 text-lg mt-2">
            Sign In
          </Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;