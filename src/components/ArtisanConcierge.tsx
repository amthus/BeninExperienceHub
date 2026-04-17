import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageSquare, Share2, Check } from "lucide-react";
import { useState } from "react";

const EXPERIENCES = [
  {
    id: 1,
    title: "Le Secret des Teinturiers",
    artisan: "Atelier Mama Indigo",
    location: "Bohicon",
    rating: 4.9,
    price: "45,000 FCFA",
    image: "https://picsum.photos/seed/indigo/800/600",
  },
  {
    id: 2,
    title: "Cérémonie du Sel d'Hiver",
    artisan: "Grand Prêtre Adjaho",
    location: "Grand-Popo",
    rating: 5.0,
    price: "72,000 FCFA",
    image: "https://picsum.photos/seed/ceremony/800/600",
  },
  {
    id: 3,
    title: "Gastronomie du Palais",
    artisan: "Chef Dossou",
    location: "Cotonou / Palace",
    rating: 4.8,
    price: "110,000 FCFA",
    image: "https://picsum.photos/seed/food/800/600",
  }
];

export default function ArtisanConcierge({ onNavigate }: { onNavigate?: () => void }) {
  const [sharedId, setSharedId] = useState<number | null>(null);
  const [bookedId, setBookedId] = useState<number | null>(null);

  const handleShare = async (exp: typeof EXPERIENCES[0]) => {
    try {
      const shareUrl = `${window.location.href}#experience-${exp.id}`;
      if (navigator.share) {
        await navigator.share({
          title: exp.title,
          text: `Découvrez l'expérience "${exp.title}" avec Expériences Bénin.`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setSharedId(exp.id);
        setTimeout(() => setSharedId(null), 2000);
      }
    } catch (err) {
      console.error("Erreur de partage:", err);
    }
  };

  const handleBook = (id: number) => {
    setBookedId(id);
    setTimeout(() => setBookedId(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-40">
      <AnimatePresence>
        {bookedId && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-forest text-gold px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-gold/50"
          >
            <Check className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Réservation confirmée</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-xl">
          <h2 className="text-5xl font-serif text-benin-green mb-6 italic">Conciergerie Artisanale</h2>
          <p className="text-benin-green/60 uppercase tracking-[0.2em] text-[10px] font-bold leading-relaxed">
            Rencontrez les gardiens du savoir-faire. <br />
            Des expériences privées, authentiques et prestigieuses, réservées aux membres de l'Éclat d'Or.
          </p>
        </div>
        <button 
          onClick={() => alert("Mise en relation avec un expert en cours...")}
          className="flex items-center gap-3 bg-royal-green text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-benin-gold transition-all shadow-xl"
        >
          <MessageSquare className="w-4 h-4" /> Parler à un Concierge
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
        {EXPERIENCES.map((exp, i) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white rounded-xl overflow-hidden border border-gold/20 hover:border-gold transition-all shadow-sm hover:shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={exp.image} 
                alt={exp.title}
                className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-1">{exp.location}</p>
                  <h3 className="text-lg font-serif text-forest italic group-hover:text-gold transition-colors">{exp.title}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] text-forest/40 font-bold uppercase tracking-widest">{exp.artisan}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <span className="text-forest font-serif text-base">{exp.price}</span>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleShare(exp)}
                    className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-forest/40 hover:text-gold transition-colors relative"
                  >
                    <Share2 className="w-3 h-3" />
                    {sharedId === exp.id ? "Copié !" : "Partager"}
                  </button>
                  <button 
                    onClick={() => handleBook(exp.id)}
                    className="text-[9px] uppercase tracking-widest font-bold text-gold hover:text-forest transition-colors underline decoration-gold/30 underline-offset-4"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        <div className="dashed-box cursor-pointer hover:bg-white transition-all">
           <span className="text-[11px] uppercase tracking-widest text-forest font-bold">Conciergerie Artisanale</span>
           <p className="text-[14px] font-serif mt-2 italic">Réserver une cérémonie privée à Ouidah</p>
        </div>
        <div className="dashed-box cursor-pointer hover:bg-white transition-all">
           <span className="text-[11px] uppercase tracking-widest text-forest font-bold">Expérience Gastronomique</span>
           <p className="text-[14px] font-serif mt-2 italic">Dîner aux chandelles au Palais d'Été</p>
        </div>
      </div>
    </div>
  );
}
