import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Destinations from "./components/sections/Destinations";
import Planner from "./components/sections/Planner";
import MyTrips from "./components/sections/MyTrips";
import TripDetails from "./components/sections/TripDetails";
import Booking from "./components/sections/Booking";
import { motion, AnimatePresence } from "framer-motion";

export type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: { id: string; time: string; description: string }[];
  image: string;
};

function App() {
  const [activeTab, setActiveTab] = useState<"home" | "planner" | "my-trips" | "booking">("home");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [bookingPrefill, setBookingPrefill] = useState<string>("");

  const handleCreateTrip = (newTrip: Trip) => {
    setTrips([newTrip, ...trips]);
    setActiveTab("my-trips");
  };

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleGoToBooking = (destination?: string) => {
    if (destination) setBookingPrefill(destination);
    setActiveTab("booking");
    setSelectedTrip(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pb-20">
        <AnimatePresence mode="wait">
          {selectedTrip ? (
            <motion.div
              key="trip-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TripDetails 
                trip={selectedTrip} 
                onBack={() => setSelectedTrip(null)} 
                onBook={() => handleGoToBooking(selectedTrip.destination)}
              />
            </motion.div>
          ) : (
            <>
              {activeTab === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Hero onStartPlanning={() => setActiveTab("planner")} />
                  <Destinations onSelectDestination={(dest) => {
                    setBookingPrefill(dest.name);
                    setActiveTab("booking");
                  }} />
                </motion.div>
              )}
              
              {activeTab === "planner" && (
                <motion.div
                  key="planner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Planner onCreateTrip={handleCreateTrip} />
                </motion.div>
              )}
              
              {activeTab === "my-trips" && (
                <motion.div
                  key="my-trips"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <MyTrips trips={trips} onSelectTrip={handleSelectTrip} />
                </motion.div>
              )}

              {activeTab === "booking" && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Booking 
                    initialDestination={bookingPrefill} 
                    onBooked={() => {
                      setBookingPrefill("");
                    }}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;