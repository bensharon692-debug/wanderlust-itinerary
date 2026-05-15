import { motion } from "framer-motion";
import { Star, Clock, ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  price: string;
  tag: string;
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/paris-8dd1963b-1778832900149.webp",
    rating: 4.9,
    price: "$1,200+",
    tag: "Romantic"
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/tokyo-1d9e6e7e-1778832899953.webp",
    rating: 4.8,
    price: "$1,500+",
    tag: "Modern"
  },
  {
    id: "3",
    name: "Bali",
    country: "Indonesia",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/bali-80aaed31-1778832899433.webp",
    rating: 4.7,
    price: "$800+",
    tag: "Tropical"
  },
  {
    id: "4",
    name: "Rome",
    country: "Italy",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/rome-dce324d8-1778832900929.webp",
    rating: 4.9,
    price: "$1,100+",
    tag: "Historic"
  },
  {
    id: "5",
    name: "New York",
    country: "USA",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/nyc-84dadd3a-1778832900877.webp",
    rating: 4.6,
    price: "$1,300+",
    tag: "Urban"
  },
  {
    id: "6",
    name: "London",
    country: "UK",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/london-2b121579-1778832900383.webp",
    rating: 4.7,
    price: "$1,400+",
    tag: "Cultural"
  }
];

interface DestinationsProps {
  onSelectDestination: (dest: Destination) => void;
}

const Destinations = ({ onSelectDestination }: DestinationsProps) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending Destinations</h2>
          <p className="text-slate-600">Curated places for your next unforgettable journey</p>
        </div>
        <button className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100"
            onClick={() => onSelectDestination(dest)}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {dest.tag}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-slate-900">{dest.rating}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{dest.name}</h3>
                  <p className="text-slate-500 text-sm">{dest.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-bold">{dest.price}</p>
                  <p className="text-slate-400 text-xs">per person</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Destinations;