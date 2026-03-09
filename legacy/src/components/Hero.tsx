import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Zap, Camera, Lock, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/images/hero/hero-1.png',
    title: 'High-Performance Solar Systems',
    description: 'Autonomous power solutions for luxury properties in Abuja.',
    icon: <Zap className="w-8 h-8 text-accent" />,
    label: 'Hybrid Authority'
  },
  {
    image: '/images/hero/hero-2.png',
    title: 'Precision Surveillance Systems',
    description: '4K Smart surveillance and biometric access control installations.',
    icon: <Camera className="w-8 h-8 text-accent" />,
    label: 'Security Excellence'
  },
  {
    image: '/images/hero/hero-3.png',
    title: 'Linos Men At Work',
    description: 'Every installation is a signature of our commitment to excellence.',
    icon: <UserCheck className="w-8 h-8 text-accent" />,
    label: 'Abuja Engineering'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[110vh] flex items-center pt-20 overflow-hidden bg-primary">
      {/* Dynamic Background Elements */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Linos Installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-8">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Linos E’ Security Infrastructure</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-none mb-8 italic">
                  Premium <span className="text-accent">Systems</span> <br />
                  <span className="text-white/40">In</span> Abuja.
                </h1>

                <p className="text-xl text-white/60 mb-12 max-w-xl leading-relaxed font-medium">
                  {slides[currentSlide].description} We engineer reliability into every luxury home and business asset across the FCT.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/blog" className="group flex items-center justify-center space-x-3 px-10 py-5 bg-accent text-primary font-bold rounded-[2rem] hover:bg-accent-hover transition-all shadow-2xl shadow-accent/20 active:scale-95">
                <span className="text-lg">View Infrastructure</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="flex items-center justify-center px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-[2rem] hover:bg-white/10 transition-all active:scale-95">
                <span className="text-lg tracking-tight">Request Site Audit</span>
              </Link>
            </div>

            <div className="mt-20 flex items-center space-x-10 p-4 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-md w-fit">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white italic">500+</span>
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">Deployments</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white italic">24/7</span>
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">Live Support</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white italic">100%</span>
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">Abuja Local</span>
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] bg-primary group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-10 left-10 right-10">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-[2rem] bg-white/10 backdrop-blur-3xl border border-white/20"
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-accent p-4 rounded-2xl shadow-xl shadow-accent/20">
                      {slides[currentSlide].icon}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-white font-bold text-xl leading-tight">{slides[currentSlide].title}</h4>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Linos Inscription & Execution</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col space-y-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevSlide} className="p-3 bg-white/10 hover:bg-accent hover:text-primary rounded-full transition-all border border-white/10">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="p-3 bg-white/10 hover:bg-accent hover:text-primary rounded-full transition-all border border-white/10">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute top-10 right-10 flex space-x-3">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      currentSlide === i ? "w-10 bg-accent" : "w-4 bg-white/20"
                    )}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Premium Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-8 -right-8 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl z-30"
            >
              <UserCheck className="w-10 h-10 text-accent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
