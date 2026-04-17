import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Share2, Info, Sparkles } from "lucide-react";

export default function AncestorsVoice() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif text-benin-green mb-4 italic">Voix des Ancêtres</h2>
        <p className="text-benin-green/60 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-bold">
          L'histoire vivante murmurée à votre oreille. <br />
          Récits immersifs déclenchés par votre présence.
        </p>
      </div>

      <div className="audio-widget-artistic max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Cover Art */}
          <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-gold/20 shadow-sm">
            <img 
              src="https://picsum.photos/seed/ancestor/400/400"
              alt="Ancestors Cover"
              className="w-full h-full object-cover grayscale-[0.2]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-forest/20 flex items-center justify-center">
               <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center text-white cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
               </div>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col justify-center">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase text-gold tracking-widest font-bold mb-1">Lecteur : Voix des Ancêtres</p>
                <h3 className="audio-title text-forest text-xl mb-3">Légende de la Reine Hangbé</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
            </div>

            {/* Waveform Visualizer */}
            <div className="flex items-end gap-[2px] h-12 mb-4 overflow-hidden rounded-md bg-forest/5 p-1">
              {[...Array(40)].map((_, i) => {
                const h = 0.4 + Math.random() * 0.6;
                return (
                  <motion.div
                    key={i}
                    animate={isPlaying ? { 
                      height: [h*100 + "%", (h*0.3)*100 + "%", h*100 + "%"],
                      opacity: [0.6, 1, 0.6]
                    } : { height: "15%", opacity: 0.3 }}
                    transition={{ 
                      duration: 0.4 + Math.random() * 0.6, 
                      repeat: Infinity, 
                      delay: i * 0.02,
                      ease: "easeInOut"
                    }}
                    className="flex-1 bg-gold rounded-full"
                  />
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[10px] text-gold font-mono">
              <motion.span
                animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                02:14
              </motion.span>
              <span>08:45</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        animate={isPlaying ? { 
          boxShadow: ["0 0 20px rgba(212,175,55,0.1)", "0 0 40px rgba(212,175,55,0.2)", "0 0 20px rgba(212,175,55,0.1)"] 
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-20"
      >
        <h4 className="text-xs uppercase tracking-[0.3em] text-benin-gold font-bold flex items-center gap-3 mb-8">
          Histoires à proximité 
          <motion.div 
            animate={isPlaying ? { opacity: [0.2, 0.5, 0.2] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-[1px] flex-1 bg-benin-gold/20" 
          />
        </h4>
        
        <div className="space-y-4">
          {[
            { title: "Toffa 1er et le Traité de 1863", time: "15 min", site: "Porto-Novo" },
            { title: "Les Murmures de Ganvié", time: "08 min", site: "Lac Nokoué" },
            { title: "Secrets de Tanningou", time: "22 min", site: "Atacora" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-benin-gold/10 hover:border-benin-gold hover:bg-white transition-all group cursor-pointer">
              <div className="flex items-center gap-6">
                <span className="text-benin-gold/40 font-serif italic text-2xl">0{i+1}</span>
                <div>
                  <p className="font-bold text-benin-green group-hover:text-benin-gold transition-colors">{item.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-benin-green/40">{item.site} • {item.time}</p>
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
