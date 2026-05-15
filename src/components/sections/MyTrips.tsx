import { Trip } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface MyTripsProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
}

const MyTrips = ({ trips, onSelectTrip }: MyTripsProps) => {
  if (trips.length === 0) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="bg-slate-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No trips planned yet</h2>
        <p className="text-slate-500 mb-8">Start planning your first adventure and it will show up here.</p>
      </div>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">My Planned Trips</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            whileHover={{ y: -4 }}
            className="cursor-pointer"
            onClick={() => onSelectTrip(trip)}
          >
            <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 relative">
                <img 
                  src={trip.image} 
                  alt={trip.destination} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl">{trip.destination}</h3>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{trip.startDate} - {trip.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{trip.activities.length} Activities planned</span>
                  </div>
                  <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                    <span className="font-bold text-blue-600">${trip.budget}</span>
                    <span className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                      Details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyTrips;