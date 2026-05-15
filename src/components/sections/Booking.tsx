import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Calendar, Star, Filter, ArrowRight, ExternalLink, ShieldCheck, Hotel, Plane, Car } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface BookingProps {
  initialDestination?: string;
  onBooked?: () => void;
}

interface BookingOption {
  id: string;
  name: string;
  provider: "Booking.com" | "Expedia" | "Skyscanner" | "Hotels.com";
  type: "Hotel" | "Flight" | "Rental";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
}

const MOCK_DATA: BookingOption[] = [
  {
    id: "1",
    name: "The Grand Parisian Luxury Suites",
    provider: "Booking.com",
    type: "Hotel",
    price: 342,
    rating: 4.8,
    reviews: 1240,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/hotel-paris-ec370b86-1778833194816.webp",
    description: "Unparalleled views of the Eiffel Tower with classic French elegance.",
    features: ["Free WiFi", "Spa", "Pool", "Breakfast included"]
  },
  {
    id: "2",
    name: "Bali Sunrise Tropical Resort",
    provider: "Expedia",
    type: "Hotel",
    price: 185,
    rating: 4.9,
    reviews: 856,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/resort-bali-40b6f738-1778833195044.webp",
    description: "Eco-friendly luxury in the heart of Ubud's jungle.",
    features: ["Private Pool", "Yoga Studio", "Beach access"]
  },
  {
    id: "3",
    name: "Alpine Peak Lodge & Spa",
    provider: "Hotels.com",
    type: "Hotel",
    price: 275,
    rating: 4.7,
    reviews: 532,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/alpine-lodge-89d8b119-1778833195033.webp",
    description: "Ski-in/ski-out access with a world-class wellness center.",
    features: ["Ski Storage", "Fireplace", "Sauna"]
  },
  {
    id: "4",
    name: "Neo-Tokyo Cyber Hotel",
    provider: "Skyscanner",
    type: "Hotel",
    price: 120,
    rating: 4.6,
    reviews: 2100,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/modern-hotel-17d3e31c-1778833192546.webp",
    description: "High-tech pod living with panoramic city views.",
    features: ["VR Lounge", "Smart Rooms", "24/7 Robot service"]
  }
];

const Booking = ({ initialDestination = "", onBooked }: BookingProps) => {
  const [search, setSearch] = useState(initialDestination);
  const [activeType, setActiveType] = useState<"Hotel" | "Flight" | "Rental">("Hotel");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BookingOption[]>([]);

  useEffect(() => {
    if (initialDestination) {
      handleSearch();
    }
  }, [initialDestination]);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(MOCK_DATA.filter(opt => opt.type === activeType));
      setIsLoading(false);
    }, 800);
  };

  const handleBook = (option: BookingOption) => {
    toast.success(`Redirecting to ${option.provider}...`, {
      description: `You are now booking ${option.name}.`,
    });
    if (onBooked) onBooked();
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Book Your Next Adventure</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Integrated search across all major travel sites. Compare prices and book instantly with one click.</p>
      </div>

      {/* Search Interface */}
      <Card className="border-slate-200 shadow-xl mb-12 overflow-hidden">
        <div className="flex border-b">
          {[ 
            { id: "Hotel", icon: Hotel, label: "Hotels" },
            { id: "Flight", icon: Plane, label: "Flights" },
            { id: "Rental", icon: Car, label: "Cars" }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                activeType === type.id ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </button>
          ))}
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label>Where to?</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Destination, hotel, or landmark"
                  className="pl-10 h-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dates</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input type="text" placeholder="Add dates" className="pl-10 h-12" />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-3xl" />
          ))
        ) : results.length > 0 ? (
          results.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="group border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 rounded-3xl">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-md">
                      {option.provider}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-slate-900">{option.rating} ({option.reviews})</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">{option.name}</CardTitle>
                      <CardDescription className="mt-1">{option.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-600">${option.price}</div>
                      <div className="text-xs text-slate-500">per night</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((f, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[10px]">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => handleBook(option)}
                    className="w-full bg-slate-900 hover:bg-black text-white rounded-xl py-6"
                  >
                    Book via {option.provider}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-slate-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No integrated results yet</h3>
            <p className="text-slate-500 mt-2">Try searching for a destination like Paris, Bali, or Swiss Alps.</p>
          </div>
        )}
      </div>

      {/* Booking Trust Badges */}
      <div className="mt-20 pt-10 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-bold text-lg">Verified Booking</span>
          </div>
          <div className="text-xl font-black tracking-tighter">Booking.com</div>
          <div className="text-xl font-black tracking-tighter">Expedia</div>
          <div className="text-xl font-black tracking-tighter">Skyscanner</div>
          <div className="text-xl font-black tracking-tighter">Hotels.com</div>
        </div>
      </div>
    </section>
  );
};

export default Booking;