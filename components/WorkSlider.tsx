"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Shield } from 'lucide-react';

const projects = [
    {
        url: "https://i.postimg.cc/mrntpp4J/linos_man_working_on_estate_security.png",
        title: "Perimeter Integrity",
        desc: "Advanced sensor calibration for estate-wide security protocols."
    },
    {
        url: "https://i.postimg.cc/85JVkD3W/lin-os-men-on-duty.png",
        title: "Field Deployment",
        desc: "Linos engineering team executing high-precision hardware integration."
    },
    {
        url: "https://i.postimg.cc/L69FKJL3/droplets-cctv-installaton-in-port-harcourt-ip-cameras-hikvision-cameras-8-channel-CCTV-system-plus-i.jpg",
        title: "Optical Supremacy",
        desc: "AI-driven surveillance calibration for high-threat environments."
    },
    {
        url: "https://i.postimg.cc/763Hgbcn/d3-smart-gate-machine.jpg",
        title: "Automation Logic",
        desc: "Zero-latency synchronization for armored entry points."
    }
];

export default function WorkSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % projects.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setIndex((prev) => (prev + 1) % projects.length);
    const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

    return (
        <section className="bg-linos-black py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <div className="lg:w-1/3 space-y-8 text-center lg:text-left">
                        <span className="text-linos-gold text-xs font-bold uppercase tracking-[0.5em] block">Field Operations</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none">
                            Men <br /> <span className="text-linos-gold">At Work</span>
                        </h2>
                        <div className="h-px w-20 bg-linos-gold/30 hidden lg:block" />
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed italic">
                            Witness the precision of our engineering teams on deployment. No generic hardware, only custom-calibrated security architecture.
                        </p>

                        <div className="flex items-center justify-center lg:justify-start space-x-6">
                            <button onClick={prev} className="p-4 border border-white/10 text-white hover:border-linos-gold hover:text-linos-gold transition-all">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={next} className="p-4 border border-white/10 text-white hover:border-linos-gold hover:text-linos-gold transition-all">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="lg:w-2/3 w-full relative h-[500px] md:h-[650px] group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="absolute inset-0"
                            >
                                <div className="relative w-full h-full overflow-hidden border border-white/5 shadow-2xl">
                                    <Image
                                        src={projects[index].url}
                                        alt={projects[index].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-linos-black via-transparent to-transparent opacity-80" />

                                    <div className="absolute bottom-12 left-12 space-y-2">
                                        <div className="flex items-center space-x-3 text-linos-gold mb-4">
                                            <Shield className="w-5 h-5" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Verified Installation</span>
                                        </div>
                                        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wider">{projects[index].title}</h3>
                                        <p className="text-white/60 text-xs italic tracking-widest uppercase">{projects[index].desc}</p>
                                    </div>

                                    <div className="absolute top-10 right-10">
                                        <span className="text-white/20 font-display text-8xl font-black">0{index + 1}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Dots */}
                        <div className="absolute -bottom-10 left-0 flex space-x-4">
                            {projects.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 transition-all duration-500 ${i === index ? 'w-12 bg-linos-gold' : 'w-4 bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
