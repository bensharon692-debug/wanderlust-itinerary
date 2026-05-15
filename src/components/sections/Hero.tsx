import { Button } from "@/components/ui/button";
import { Search, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onStartPlanning: () => void;
}

const Hero = ({ onStartPlanning }: HeroProps) => {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa80af3e-d2bc-48cc-b718-f66dca5bb56b/hero-bg-7fb8afd7-1778832900876.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-6 border border-white/30">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Plan your next dream escape
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Explore the World, <br />
            <span className="text-blue-400">One Trip</span> at a Time.
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            The intelligent travel planner that helps you discover, plan, and organize your adventures seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full sm:w-96">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Where do you want to go?" 
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border-none shadow-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
              />
            </div>
            <Button 
              size="lg" 
              onClick={onStartPlanning}
              className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow-lg shadow-blue-500/20"
            >
              Start Planning
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating stats or labels could go here */}
    </section>
  );
};

export default Hero;