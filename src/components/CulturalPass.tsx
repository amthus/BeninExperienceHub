import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, ShieldCheck, CreditCard, Sparkles, MapPin, ChevronRight, X } from "lucide-react";

const BENEFITS = [
  { icon: CreditCard, title: "Mobile Money Intégré", desc: "Paiements directs sans friction via Moov ou MTN." },
  { icon: ShieldCheck, title: "Accès Prioritaire VIP", desc: "Coupe-file exclusif sur tous les sites UNESCO." },
  { icon: MapPin, title: "Géolocalisation Smart", desc: "Reconnaissance automatique à l'entrée des parcs." },
  { icon: Sparkles, title: "Guide Privé Digital", desc: "Contenu audio et AR narré par des experts locaux." }
];

export default function CulturalPass() {
  const [isActive, setIsActive] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<typeof BENEFITS[0] | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-40">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-benin-green mb-4 italic">Le Pass Éclat d'Or</h2>
        <p className="text-benin-green/60 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-bold">
          Votre clef d'accès universelle au patrimoine national. <br />
          Musées • Palais • Parcs Naturels
        </p>
      </div>

      <div className="relative group max-w-md mx-auto perspective-1000 scale-[0.85] md:scale-100 origin-center">
        <motion.div
          animate={isActive ? { rotateY: [0, 180, 180], scale: 1.05 } : { rotateY: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="relative w-full aspect-[1.7/1] preserve-3d cursor-pointer shadow-2xl"
          onClick={() => setIsActive(!isActive)}
        >
          <div className="absolute inset-0 backface-hidden">
            <div className="w-full h-full cultural-pass-card rounded-xl p-8 flex flex-col justify-between">
              <div className="pass-shimmer"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="pass-logo py-1 border-b border-gold font-serif text-lg text-gold">ÉCLAT D'OR</div>
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-gold-light uppercase tracking-[2.5px] font-bold">Titulaire du Pass</span>
                  <div className="text-2xl font-serif text-white">Jean-Baptiste Dossou</div>
                </div>
                
                <div className="flex justify-between items-end border-t border-gold/20 pt-4">
                   <div className="qr-container bg-ivory rounded-lg border-2 border-gold p-1 w-20 h-20 overflow-hidden flex items-center justify-center relative">
                      <div className="w-full h-full bg-repeating-square opacity-80" />
                      <QrCode className="w-full h-full text-forest p-1" />
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gold/30 backdrop-blur-[1px]" 
                        />
                      )}
                   </div>
                   <div className="text-right text-[9px] uppercase tracking-widest text-gold-light font-bold">
                    VALID JUSQU'AU 12/2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl p-8 border border-gold flex flex-col items-center justify-center gap-6 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Sparkles className="w-16 h-16 text-gold" />
            </div>
            <div className="relative p-4 bg-ivory rounded-xl border-2 border-gold/40 shadow-inner">
              <QrCode className="w-32 h-32 text-forest" />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gold/10"
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-forest">Pass Actif</p>
              <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
              <p className="text-[9px] text-forest/40 font-mono tracking-tighter">ID: BN-LUXE-2026-X</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 space-y-8">
        <h4 className="text-xs uppercase tracking-[0.3em] text-benin-gold font-bold flex items-center gap-3">
          Avantages Inclus <div className="h-[1px] flex-1 bg-benin-gold/20" />
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BENEFITS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedBenefit(item)}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gold/10 hover:border-gold hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="p-3 bg-ivory rounded-lg text-gold group-hover:bg-gold group-hover:text-white transition-all">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-forest group-hover:text-gold transition-colors duration-300">{item.title}</p>
                <p className="text-xs text-forest/50 group-hover:text-forest transition-all duration-300 font-light">
                  {item.desc}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gold opacity-10 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedBenefit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-forest/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gold relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full" />
              <button 
                onClick={() => setSelectedBenefit(null)}
                className="absolute top-6 right-6 p-2 text-forest/40 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-ivory rounded-2xl text-gold border border-gold/20">
                  <selectedBenefit.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-forest italic">{selectedBenefit.title}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gold">Service Éclat d'Or</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-forest/70 text-sm leading-relaxed">
                  Cet avantage fait partie intégrante de votre expérience de luxe au Bénin. {selectedBenefit.desc} Profitez d'un accompagnement personnalisé sur chaque site historique.
                </p>
                <div className="p-4 bg-forest/5 rounded-xl border border-gold/10">
                   <p className="text-[11px] font-bold text-gold uppercase tracking-widest mb-2">Comment l'utiliser ?</p>
                   <p className="text-[11px] text-forest/60">Présentez simplement votre Pass Éclat d'Or numérique à n'importe quel point de contrôle partenaire.</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedBenefit(null)}
                className="w-full py-4 bg-forest text-gold rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-forest/90 transition-all shadow-lg"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
