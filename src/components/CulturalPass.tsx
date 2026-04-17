import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, ShieldCheck, CreditCard, Sparkles, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function CulturalPass() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-benin-green mb-4 italic">Le Pass Éclat d'Or</h2>
        <p className="text-benin-green/60 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-bold">
          Votre clef d'accès universelle au patrimoine national. <br />
          Musées • Palais • Parcs Naturels
        </p>
      </div>

      {/* The VIP Card */}
      <div className="relative group max-w-md mx-auto perspective-1000 scale-[0.85] md:scale-100 origin-center">
        <motion.div
          animate={isActive ? { rotateY: [0, 180, 180], scale: 1.05 } : { rotateY: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="relative w-full aspect-[1.7/1] preserve-3d cursor-pointer shadow-2xl"
          onClick={() => setIsActive(!isActive)}
        >
          {/* Card Front */}
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
                   <div className="qr-container bg-ivory rounded-lg border-2 border-gold p-1 w-20 h-20 overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full bg-repeating-square opacity-80" />
                      <QrCode className="w-full h-full text-forest p-1" />
                   </div>
                   <div className="text-right text-[9px] uppercase tracking-widest text-gold-light font-bold">
                    VALID JUSQU'AU 12/2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Back (Detailed QR) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl p-8 border border-gold flex flex-col items-center justify-center gap-6 shadow-2xl">
            <div className="relative p-4 bg-ivory rounded-xl border border-gold/20">
              <QrCode className="w-32 h-32 text-forest" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-forest">ENCRYPTED ACCESS</p>
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
          {[
            { icon: CreditCard, title: "Mobile Money Intégré", desc: "Paiements directs sans friction" },
            { icon: ShieldCheck, title: "Accès Prioritaire VIP", desc: "Coupe-file sur tous les sites" },
            { icon: MapPin, title: "Géolocalisation Smart", desc: "Reconnaissance auto à l'entrée" },
            { icon: Sparkles, title: "Guide Privé Digital", desc: "Récits narrés exclusifs" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
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
                <p className="text-xs text-forest/50 group-hover:text-forest group-hover:text-[13px] group-hover:font-normal transition-all duration-300 font-light">
                  {item.desc}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <ChevronRight className="w-4 h-4 text-gold" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
