import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, RefreshCw, X, Box, Info, Target } from "lucide-react";

export default function ARWindow() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'detected'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (scanState !== 'detected') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        setHasPermission(false);
      }
    }
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => setScanState('detected'), 2500);
  };

  const handleReset = () => {
    setScanState('idle');
    setTimeout(handleScan, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif text-benin-green mb-4 italic">Fenêtre Temporelle</h2>
        <p className="text-benin-green/60 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-bold">
          Réalité Augmentée : Superposez le passé au présent. <br />
          Scannez les sites historiques pour voir leur gloire d'antan.
        </p>
      </div>

      <div 
        onMouseMove={handleMouseMove}
        className="relative aspect-[4/3] md:aspect-[21/9] bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-benin-gold/20"
      >
        {hasPermission === false ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-royal-green text-center p-12">
            <Camera className="w-16 h-16 text-benin-gold mb-6 opacity-30" />
            <h4 className="text-white text-xl font-serif mb-4">Accès Caméra Requis</h4>
            <p className="text-white/60 text-sm max-w-xs mx-auto mb-8 font-light">
              Pour une immersion totale, veuillez autoriser l'accès à votre caméra environnementale.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-benin-gold text-royal-green px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover scale-x-[-1] opacity-70"
            />
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-benin-gold" />
              <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-benin-gold" />
              <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-benin-gold" />
              <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-benin-gold" />
            </div>

            <AnimatePresence>
              {scanState === 'idle' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center group pointer-events-auto">
                    <button 
                      onClick={handleScan}
                      className="w-24 h-24 rounded-full border-2 border-benin-gold border-dashed flex items-center justify-center animate-spin-slow group-hover:scale-110 transition-transform"
                    >
                      <Target className="w-8 h-8 text-benin-gold animate-none" />
                    </button>
                    <p className="mt-6 text-benin-gold text-[10px] uppercase font-bold tracking-[0.3em]">Cibler un Marqueur</p>
                  </div>
                </motion.div>
              )}

              {scanState === 'scanning' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-benin-gold/10 backdrop-blur-[2px] flex items-center justify-center overflow-hidden"
                >
                  <motion.div 
                    initial={{ y: -500 }}
                    animate={{ y: 500 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] bg-benin-gold shadow-[0_0_20px_#D4AF37]"
                  />
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <Box className="w-12 h-12 text-benin-gold animate-bounce" />
                    </div>
                    <p className="text-benin-gold text-xs uppercase font-bold tracking-[0.4em]">Analyse Structurelle...</p>
                  </div>
                </motion.div>
              )}

              {scanState === 'detected' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: mousePos.x * 20,
                      y: mousePos.y * 20
                    }}
                    transition={{ 
                      scale: { duration: 0.8, ease: "easeOut" },
                      opacity: { duration: 1, ease: "linear" },
                      x: { type: "spring", stiffness: 40, damping: 20 },
                      y: { type: "spring", stiffness: 40, damping: 20 }
                    }}
                    className="relative w-full h-full max-w-4xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-benin-gold/30 to-royal-green/30 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-overlay">
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-benin-gold/40 to-transparent animate-pulse filter blur-xl" />
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-benin-gold/40 to-transparent animate-pulse filter blur-xl" />
                      </div>

                      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ 
                              x: "50%", 
                              y: "50%", 
                              scale: 0, 
                              opacity: 0 
                            }}
                            animate={{ 
                              x: `${Math.random() * 100}%`, 
                              y: `${Math.random() * 100}%`, 
                              scale: [0, 1, 0.5],
                              opacity: [0, 0.8, 0]
                            }}
                            transition={{ 
                              duration: 3 + Math.random() * 4,
                              repeat: Infinity,
                              delay: i * 0.5,
                              ease: "easeOut"
                            }}
                            className="absolute w-1 h-1 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]"
                          />
                        ))}
                      </div>

                      <motion.img 
                        animate={{ 
                          x: mousePos.x * -10,
                          y: mousePos.y * -10
                        }}
                        transition={{ 
                          x: { type: "spring", stiffness: 40, damping: 20 },
                          y: { type: "spring", stiffness: 40, damping: 20 }
                        }}
                        src="https://picsum.photos/seed/reconstruction/1200/800"
                        alt="Reconstruction"
                        className="w-full h-full object-cover mix-blend-overlay opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-white/5 animate-pulse" />
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                        className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-black/60 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-white/10"
                      >
                        <div className="flex justify-between items-start mb-2 md:mb-4">
                          <div>
                            <h4 className="text-white font-serif text-lg md:text-2xl">Place des Amazones</h4>
                            <p className="text-benin-gold text-[8px] md:text-[10px] uppercase font-bold tracking-widest">Reconstruction 1850 AD</p>
                          </div>
                          <button 
                            onClick={() => setScanState('idle')}
                            className="p-1.5 md:p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all"
                          >
                            <X className="w-3 md:w-4 h-3 md:h-4" />
                          </button>
                        </div>
                        <p className="text-white/70 text-[10px] md:text-sm font-light leading-relaxed">
                          La place servait initialement de terrain d'entraînement pour les Mino, la légion d'élite féminine du royaume. Notez les fortifications de terre battue disparues aujourd'hui.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-8 left-8 flex gap-4 pointer-events-auto">
              <button 
                onClick={handleReset}
                className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence>
              {showInfo && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-8 right-8 w-64 bg-white/95 backdrop-blur-xl p-6 rounded-2xl border border-gold/20 shadow-2xl z-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-forest font-bold text-xs uppercase tracking-widest">Aide AR</h5>
                    <X onClick={() => setShowInfo(false)} className="w-4 h-4 text-gold cursor-pointer" />
                  </div>
                  <p className="text-forest/60 text-[10px] leading-relaxed">
                    Orientez votre appareil vers un marqueur historique pour déclencher la reconstruction. Bougez votre téléphone pour explorer sous différents angles.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Précision Historique", desc: "Modèles 3D validés par le comité scientifique du Bénin." },
          { title: "Multi-Époques", desc: "Basculez entre le XVIIe, XIXe et XXe siècle en un geste." },
          { title: "Capture & Partage", desc: "Prenez des clichés haute résolution de vos explorations." },
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white rounded-3xl border border-benin-gold/10 text-center">
            <h5 className="text-benin-green font-bold text-sm mb-2">{item.title}</h5>
            <p className="text-benin-green/50 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
