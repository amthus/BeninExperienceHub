import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Ticket, 
  Mic2, 
  Box, 
  Sparkles,
  User,
  Heart
} from "lucide-react";
import { cn } from "@/src/lib/utils";

import MagazineFeed from "./components/MagazineFeed";
import CulturalPass from "./components/CulturalPass";
import AncestorsVoice from "./components/AncestorsVoice";
import ARWindow from "./components/ARWindow";
import ArtisanConcierge from "./components/ArtisanConcierge";

type ViewType = 'feed' | 'pass' | 'voice' | 'ar' | 'concierge';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('feed');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'feed', icon: Compass, label: 'Découvrir' },
    { id: 'pass', icon: Ticket, label: 'Pass Éclat' },
    { id: 'ar', icon: Box, label: 'Hiérarchie' },
    { id: 'voice', icon: Mic2, label: 'Voix' },
    { id: 'concierge', icon: Sparkles, label: 'Concierge' },
  ];

  return (
    <div className="min-h-screen bg-ivory selection:bg-gold selection:text-white">
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-10 py-4 md:py-6 flex items-center justify-between",
          isScrolled ? "bg-white/90 backdrop-blur-md border-b border-gold/30 py-3 md:py-4" : "bg-transparent"
        )}
      >
        <div className="flex flex-col group cursor-default">
          <motion.h1 
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl md:text-4xl font-serif text-forest tracking-tight transition-all duration-700 group-hover:tracking-normal leading-none relative"
          >
            Expériences Bénin
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
          </motion.h1>
          <div className="relative overflow-hidden hidden md:block">
            <p className="text-[11px] uppercase tracking-[3px] text-gold font-medium transition-all duration-500 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_2px_rgba(212,175,55,0.3)]">
              Le Prestige de l'Héritage
            </p>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn(
              "w-4 h-4 md:w-5 md:h-5 cursor-pointer transition-all duration-300",
              isLiked ? "text-red-500 fill-red-500" : "text-forest hover:text-red-500"
            )} />
          </motion.button>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gold/30 p-0.5 overflow-hidden cursor-pointer hover:border-gold transition-all relative">
            <div className="w-full h-full rounded-full bg-forest flex items-center justify-center text-white">
              <User className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-gold border-[2px] border-white rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-32 pb-32 md:pb-40 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeView === 'feed' && <MagazineFeed />}
            {activeView === 'pass' && <CulturalPass />}
            {activeView === 'voice' && <AncestorsVoice />}
            {activeView === 'ar' && <ARWindow />}
            {activeView === 'concierge' && <ArtisanConcierge onNavigate={() => setActiveView('concierge')} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg">
        <div className="bg-white/80 backdrop-blur-xl border border-gold/20 rounded-full shadow-2xl p-1.5 flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 md:px-5 md:py-3 rounded-full transition-all duration-500",
                  isActive 
                    ? "bg-forest text-white" 
                    : "text-forest/60 hover:bg-gold/10"
                )}
              >
                <Icon className={cn("w-4 h-4 md:w-5 md:h-5", isActive && "animate-pulse")} />
                {isActive && (
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-benin-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-benin-green/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}

