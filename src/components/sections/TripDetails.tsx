import { Trip } from "@/App";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Share2, MoreVertical, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface TripDetailsProps {
  trip: Trip;
  onBack: () => void;
  onBook?: () => void;
}

const TripDetails = ({ trip, onBack, onBook }: TripDetailsProps) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-8 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Itinerary */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src={trip.image} 
              alt={trip.destination} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{trip.destination}</h1>
                  <div className="flex items-center gap-4 text-slate-200">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Itinerary</h2>
            <div className="space-y-6">
              {trip.activities.length > 0 ? (
                trip.activities.map((activity, index) => (
                  <div key={activity.id} className="relative pl-8 border-l-2 border-blue-200 pb-2">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{activity.time}</span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{activity.description}</h3>
                      <p className="text-slate-500 text-sm mt-1">Suggested duration: 2 hours</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500">No activities planned for this trip.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Trip Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-slate-600">Budget</span>
                </div>
                <span className="font-bold text-slate-900">${trip.budget}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-slate-600">Location</span>
                </div>
                <span className="font-bold text-slate-900 truncate max-w-[120px] text-right">{trip.destination}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-slate-600">Duration</span>
                </div>
                <span className="font-bold text-slate-900">7 Days</span>
              </div>
            </div>
            
            <Button 
              onClick={onBook}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-6 shadow-lg shadow-blue-200"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Book Accommodations
            </Button>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <h3 className="text-lg font-bold mb-4">Travel Checklist</h3>
            <div className="space-y-3">
              {[
                { label: "Book Flights", done: false, type: 'flight' },
                { label: "Hotel Reservation", done: false, type: 'hotel' },
                { label: "Travel Insurance", done: false },
                { label: "Pack Luggage", done: false }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={onBook}
                  className="w-full flex items-center gap-3 group"
                >
                  <div className={`h-5 w-5 rounded border ${item.done ? 'bg-blue-500 border-blue-500' : 'border-slate-600'} flex items-center justify-center`}>
                    {item.done && <div className="h-2 w-2 bg-white rounded-full" />}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-200 group-hover:text-blue-400 transition-colors'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;