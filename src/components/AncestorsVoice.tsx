import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, SkipForward, SkipBack, Info, Sparkles } from "lucide-react";

const STORIES = [
  { id: 1, title: "Légende de la Reine Hangbé", site: "Abomey", duration: "08:45" },
  { id: 2, title: "Toffa 1er et le Traité de 1863", site: "Porto-Novo", duration: "15:20" },
  { id: 3, title: "Les Murmures de Ganvié", site: "Lac Nokoué", duration: "08:14" },
  { id: 4, title: "Secrets de Tanningou", site: "Atacora", duration: "22:05" },
];

export default function AncestorsVoice() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const currentStory = STORIES[currentStoryIndex];

  const bars = useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    height: 10 + Math.random() * 40,
    delay: Math.random() * 0.5
  })), []);

  const handleNext = () => setCurrentStoryIndex(prev => (prev + 1) % STORIES.length);
  const handlePrev = () => setCurrentStoryIndex(prev => (prev - 1 + STORIES.length) % STORIES.length);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-benin-green mb-6 italic">Voix des Ancêtres</h2>
        <p className="text-benin-green/60 uppercase tracking-[0.2em] text-[10px] font-bold">Immersion Sonore & Récits de l'Héritage</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-benin-gold/10 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
             <div className="absolute inset-0 bg-benin-gold/10 rounded-full animate-pulse" />
             <div className="absolute inset-4 border border-benin-gold/20 rounded-full" />
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full p-2"
                >
                  <img src="https://picsum.photos/seed/vinyl/400/400" className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl" referrerPolicy="no-referrer" alt="Art" />
                </motion.div>
             </div>
             {isPlaying && (
               <div className="absolute -inset-4 border-2 border-benin-gold/10 rounded-full animate-ping" />
             )}
          </div>

          <div className="flex-1 w-full space-y-8">
            <div className="text-center md:text-left flex justify-between items-start">
              <div>
                <motion.h3 
                  key={currentStory.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-serif text-benin-green mb-2 italic"
                >
                  {currentStory.title}
                </motion.h3>
                <p className="text-gold text-[10px] uppercase font-bold tracking-[0.3em]">{currentStory.site} — Guide Vocal</p>
              </div>
              <Sparkles className="w-5 h-5 text-gold opacity-30" />
            </div>

            <div className="h-24 flex items-center justify-center md:justify-start gap-[3px]">
              {bars.map((bar) => (
                <motion.div
                  key={bar.id}
                  animate={isPlaying ? { 
                    height: [bar.height, bar.height * 1.8, bar.height * 0.6, bar.height],
                    opacity: [0.3, 1, 0.3]
                  } : { height: bar.height, opacity: 0.3 }}
                  transition={{ 
                    duration: 0.5 + bar.delay, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-1.5 md:w-2 bg-gradient-to-t from-benin-gold to-benin-gold/40 rounded-full"
                />
              ))}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-8">
               <button onClick={handlePrev} className="text-benin-green/40 hover:text-benin-gold transition-colors"><SkipBack className="w-6 h-6" /></button>
               <button 
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="w-16 h-16 bg-benin-green rounded-full flex items-center justify-center text-white hover:bg-benin-gold transition-all shadow-xl"
               >
                 <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div key="pause" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}><Pause className="w-6 h-6 fill-current" /></motion.div>
                    ) : (
                      <motion.div key="play" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}><Play className="w-6 h-6 fill-current ml-1" /></motion.div>
                    )}
                 </AnimatePresence>
               </button>
               <button onClick={handleNext} className="text-benin-green/40 hover:text-benin-gold transition-colors"><SkipForward className="w-6 h-6" /></button>
            </div>

            <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-benin-green/40 pt-4">
              <span>02:14</span>
              <span>{currentStory.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        animate={isPlaying ? { 
          boxShadow: ["0 0 20px rgba(212,175,55,0.05)", "0 0 40px rgba(212,175,55,0.1)", "0 0 20px rgba(212,175,55,0.05)"] 
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-20"
      >
        <h4 className="text-xs uppercase tracking-[0.3em] text-benin-gold font-bold flex items-center gap-3 mb-8">
          Histoires à proximité 
          <div className="h-[1px] flex-1 bg-benin-gold/20" />
        </h4>
        
        <div className="space-y-4">
          {STORIES.map((item, i) => (
            <div 
              key={item.id} 
              onClick={() => setCurrentStoryIndex(i)}
              className={`flex items-center justify-between p-6 rounded-2xl border transition-all group cursor-pointer ${
                i === currentStoryIndex ? 'border-benin-gold bg-white' : 'border-benin-gold/10 hover:border-benin-gold/40 hover:bg-white/50'
              }`}
            >
              <div className="flex items-center gap-6">
                <span className={`font-serif italic text-2xl ${i === currentStoryIndex ? 'text-benin-gold' : 'text-benin-gold/40'}`}>0{i+1}</span>
                <div>
                  <p className={`font-bold ${i === currentStoryIndex ? 'text-benin-gold' : 'text-benin-green group-hover:text-benin-gold'} transition-colors`}>{item.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-benin-green/40">{item.site} • {item.duration}</p>
                </div>
              </div>
              <Info className="w-5 h-5 text-benin-gold/20 group-hover:text-benin-gold transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
