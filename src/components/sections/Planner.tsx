import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, MapPin, DollarSign, Plus, Trash2, CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Trip } from "@/App";
import { motion } from "framer-motion";

interface PlannerProps {
  onCreateTrip: (trip: Trip) => void;
}

const Planner = ({ onCreateTrip }: PlannerProps) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [activities, setActivities] = useState<{ id: string; time: string; description: string }[]>([]);

  const addActivity = () => {
    if (!activityInput) return;
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      time: "09:00 AM", // default time
      description: activityInput
    };
    setActivities([...activities, newActivity]);
    setActivityInput("");
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const handleCreate = () => {
    if (!destination || !startDate || !endDate || !budget) {
      toast.error("Please fill in all details");
      return;
    }

    const newTrip: Trip = {
      id: Math.random().toString(36).substr(2, 9),
      destination,
      startDate,
      endDate,
      budget: parseFloat(budget),
      activities,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/hero-bg-7fb8afd7-1778832900876.webp" // default fallback
    };

    onCreateTrip(newTrip);
    toast.success(`Trip to ${destination} planned!`, {
      description: "Now you can book hotels for this trip in the Bookings tab."
    });
    
    // Reset form
    setDestination("");
    setStartDate("");
    setEndDate("");
    setBudget("");
    setActivities([]);
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Create New Trip</h2>
        <p className="text-slate-600">Enter your travel details to start planning your itinerary.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Trip Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="destination"
                    placeholder="e.g. Kyoto, Japan" 
                    className="pl-10"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="startDate"
                      type="date" 
                      className="pl-10"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="endDate"
                      type="date" 
                      className="pl-10"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="budget"
                    type="number" 
                    placeholder="e.g. 2000" 
                    className="pl-10"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Add Activities</CardTitle>
              <CardDescription>Plan your daily adventures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Visit the museum, Hiking..." 
                  value={activityInput}
                  onChange={(e) => setActivityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addActivity()}
                />
                <Button variant="secondary" onClick={addActivity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                {activities.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4 italic">No activities added yet</p>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-slate-700">{activity.description}</span>
                      </div>
                      <button onClick={() => removeActivity(activity.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview / Action */}
        <div className="space-y-6">
          <Card className="bg-blue-600 text-white border-none shadow-xl">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="pb-4 border-b border-blue-500/30">
                <p className="text-blue-100 text-sm">Destination</p>
                <p className="font-bold text-lg">{destination || "---"}</p>
              </div>
              <div className="pb-4 border-b border-blue-500/30">
                <p className="text-blue-100 text-sm">Activities</p>
                <p className="font-bold text-lg">{activities.length} planned</p>
              </div>
              <div className="pb-4">
                <p className="text-blue-100 text-sm">Budget</p>
                <p className="font-bold text-lg">${budget || "0"}</p>
              </div>
              <Button 
                onClick={handleCreate}
                className="w-full bg-white text-blue-600 hover:bg-slate-100 font-bold py-6 text-lg"
              >
                Save Trip Plan
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 flex items-center justify-center flex-col text-center">
             <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
             </div>
             <p className="text-sm font-medium text-slate-600 mb-2">Ready to book?</p>
             <p className="text-xs text-slate-400 mb-4">Compare hotel prices across top travel sites instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planner;