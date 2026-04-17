import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Calendar, X as CloseIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

const DESTINATIONS = [
  {
    id: 1,
    title: "Le Palais des Rois d'Abomey",
    subtitle: "Patrimoine de l'UNESCO",
    description: "Plongez dans l'histoire épique des rois d'Abomey. Une architecture de terre rouge sculptée de bas-reliefs narrant les conquêtes et la puissance du royaume du Danxomé.",
    image: "https://picsum.photos/seed/abomey/1200/1600",
    category: "Histoire",
    date: "XVIIe Siècle"
  },
  {
    id: 2,
    title: "Ouidah & la Porte du Non-Retour",
    subtitle: "Mémoire et Spiritualité",
    description: "Entre le temple des pythons et la plage sacrée, Ouidah est le berceau du Vodun et le témoin silencieux d'un passé transatlantique transformé en résilience.",
    image: "https://picsum.photos/seed/ouidah/1200/1400",
    category: "Culture",
    date: "Lieu de Mémoire"
  },
  {
    id: 3,
    title: "La Pendjari Sauvage",
    subtitle: "L'Éden de l'Afrique de l'Ouest",
    description: "Une immersion brutale et sublime dans la savane. Lions, éléphants et guépards règnent sur ce territoire de contrastes chromatiques.",
    image: "https://picsum.photos/seed/pendjari/1200/1800",
    category: "Nature",
    date: "Sanctuaire"
  }
];

const MAP_PINS = [
  { id: 1, x: '25%', y: '40%', title: 'Abomey', desc: 'Capitale historique, siège du pouvoir Danxomé.' },
  { id: 2, x: '35%', y: '80%', title: 'Ouidah', desc: 'Cité historique sur la côte, cœur spirituel du Vodun.' },
  { id: 3, x: '15%', y: '15%', title: 'Pendjari', desc: 'Vaste réserve de biosphère, safari sauvage.' },
  { id: 4, x: '45%', y: '65%', title: 'Cotonou', desc: 'Pouls économique et culturel vibrant.' },
  { id: 5, x: '55%', y: '75%', title: 'Porto-Novo', desc: 'Capitale administrative aux influences coloniales.' },
];

export default function MagazineFeed() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16 md:space-y-32 pb-20 md:pb-40">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[80vh] flex items-end pb-8 md:pb-12 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-forest">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/beninhero/1920/1080" 
            alt="Bénin Heritage"
            className="w-full h-full object-cover opacity-50 scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent z-[1]" />
        
        <div className="relative z-10 px-6 md:px-12 w-full max-w-4xl">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gold font-bold uppercase tracking-[2px] md:tracking-[3px] text-[8px] md:text-[10px] mb-2 md:mb-4"
          >
            L'Éclat d'Afrique — Vol. 01
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white text-4xl md:text-8xl font-serif leading-none mb-6 md:mb-8 italic"
          >
            Le Soft Power <br /> <span className="text-gold">Béninois</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-6"
          >
            <button className="bg-gold text-forest hover:bg-white hover:text-forest transition-all px-6 py-2 md:px-8 md:py-3 rounded-full font-bold uppercase tracking-widest text-[9px] md:text-xs">
              Explorer
            </button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Integration */}
      <section className="space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-gold font-bold mb-2 md:mb-4">Cartographie Sacrée</h3>
            <h2 className="text-3xl md:text-5xl font-serif text-forest leading-tight italic">
              Les Itinéraires de <br className="hidden md:block" /> l'Héritage
            </h2>
          </div>
          <p className="text-ink/60 text-xs md:text-sm max-w-sm font-light leading-relaxed">
            Naviguez à travers les sites emblématiques du Bénin. Chaque point représente une porte ouverte sur des siècles de culture.
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-forest/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gold/10 p-2 md:p-4">
          {/* Abstract Map Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #D4AF37 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
          </div>

          <motion.div 
            animate={selectedPin ? { 
              scale: 1.5,
              translateX: `${(50 - parseFloat(MAP_PINS.find(p => p.id === selectedPin)?.x || "50")) * 0.5}%`,
              translateY: `${(50 - parseFloat(MAP_PINS.find(p => p.id === selectedPin)?.y || "50")) * 0.5}%`
            } : { scale: 1, translateX: "0%", translateY: "0%" }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Custom Pins */}
            {MAP_PINS.map((pin) => (
              <motion.div
                key={pin.id}
                style={{ left: pin.x, top: pin.y }}
                className="absolute z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="relative cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(selectedPin === pin.id ? null : pin.id);
                  }}
                >
                  <MapPin className={cn(
                    "w-5 h-5 md:w-8 md:h-8 transition-all duration-300 drop-shadow-lg",
                    selectedPin === pin.id ? "text-forest fill-gold" : "text-gold fill-current"
                  )} />
                  <motion.div 
                    className="absolute -inset-1.5 md:-inset-2 bg-gold/20 rounded-full animate-ping"
                  />

                  {/* Tooltip */}
                  <AnimatePresence>
                    {selectedPin === pin.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                        className="absolute bottom-full left-1/2 mb-3 md:mb-4 z-30 pointer-events-auto"
                      >
                        <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-lg md:rounded-xl border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] min-w-[200px] md:min-w-[240px]">
                          <div className="flex justify-between items-start gap-4 mb-2">
                             <h4 className="text-forest font-serif text-base md:text-xl leading-none">{pin.title}</h4>
                             <CloseIcon className="w-4 h-4 text-gold hover:text-forest transition-colors cursor-pointer shrink-0" onClick={() => setSelectedPin(null)} />
                          </div>
                          <p className="text-forest/60 text-[9px] md:text-[11px] font-light leading-relaxed">
                            {pin.desc}
                          </p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 md:border-8 border-transparent border-t-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}

            {/* Click outside to close */}
            <div className="absolute inset-0 z-0" onClick={() => setSelectedPin(null)} />

            {/* Simulated Map Texture */}
            <svg className="w-full h-full opacity-10 md:opacity-20 pointer-events-none" viewBox="0 0 1000 428">
               <path d="M100,100 Q300,50 400,200 T700,300" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="5,5" />
               <path d="M200,400 Q400,300 600,350 T900,100" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-32">
        {DESTINATIONS.map((dest, idx) => (
          <motion.article 
            key={dest.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className={cn(
              "md:col-span-12 items-center grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16",
              idx % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <div className={cn(
              "md:col-span-7 relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] border border-gold/20 shadow-sm transition-shadow hover:shadow-xl",
              idx % 2 !== 0 ? "md:order-2" : "md:order-1"
            )}>
              <img 
                src={dest.image} 
                alt={dest.title}
                className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2">
                <span className="bg-forest/90 backdrop-blur-md text-gold px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest font-bold border border-gold/30">
                  {dest.category}
                </span>
              </div>
            </div>

            <div className={cn(
              "md:col-span-5 flex flex-col justify-center",
              idx % 2 !== 0 ? "md:order-1" : "md:order-2"
            )}>
              <div className="space-y-2 md:space-y-4">
                <span className="article-meta-artistic text-[9px] md:text-[10px]">Grand Récit — {dest.subtitle}</span>
                <h3 className="article-title-artistic text-2xl md:text-4xl leading-tight">
                  {dest.title}
                </h3>
                <p className="text-ink text-sm md:text-base leading-relaxed font-light editorial-dropcap text-justify opacity-80 mb-6">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-gold/20">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-gold uppercase tracking-[2px] font-bold">
                      {dest.date}
                    </div>
                    {/* Historical Insight micro-component */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="flex items-center gap-2 group/insight cursor-help relative"
                    >
                      <div className="w-4 h-4 rounded-full border border-gold/40 flex items-center justify-center text-[7px] md:text-[8px] text-gold">?</div>
                      <span className="text-[8px] md:text-[9px] text-ink/40 uppercase tracking-widest font-medium group-hover/insight:text-gold transition-colors">Héritage</span>
                      <div className="absolute left-0 bottom-full mb-3 w-40 md:w-56 p-3 md:p-4 bg-white/95 backdrop-blur-xl border border-gold/20 rounded-xl shadow-2xl opacity-0 scale-95 group-hover/insight:opacity-100 group-hover/insight:scale-100 transition-all z-20 pointer-events-none">
                         <p className="text-[9px] md:text-[10px] text-forest font-serif leading-relaxed italic">
                          {idx === 0 && "Saviez-vous que les bas-reliefs étaient autrefois peints avec des pigments naturels extraits de latérite ?"}
                          {idx === 1 && "Le 'Vodun' ne signifie pas 'sorcellerie', mais 'ce qui est mystérieux' ou 'source d'énergie divine'."}
                          {idx === 2 && "La réserve fut historiquement une zone de chasse interdite aux colons par décrets royaux."}
                         </p>
                      </div>
                    </motion.div>
                  </div>
                  <button className="flex items-center gap-2 text-forest hover:text-gold transition-colors font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                    Partir <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
