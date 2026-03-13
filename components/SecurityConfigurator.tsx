"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Home, Building, Building2, Lock, Camera, Zap, ChevronRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_DETAILS } from '@/config/business';

const steps = [
    {
        id: 'building',
        question: 'Type of Facility Architecture',
        options: [
            { name: 'Luxury Residential', icon: Home, value: 'residential' },
            { name: 'Corporate Office', icon: Building, value: 'corporate' },
            { name: 'Industrial Complex', icon: Building2, value: 'industrial' },
            { name: 'Gated Estate', icon: Shield, value: 'estate' },
        ]
    },
    {
        id: 'priority',
        question: 'Core Security Objective',
        options: [
            { name: 'Access Control', icon: Lock, value: 'access' },
            { name: 'Surveillance', icon: Camera, value: 'cctv' },
            { name: 'Power Autonomy', icon: Zap, value: 'solar' },
            { name: 'Gate Automation', icon: Shield, value: 'gate' },
        ]
    }
];

export default function SecurityConfigurator() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [isComplete, setIsComplete] = useState(false);

    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

    const handleSelect = async (stepId: string, value: string) => {
        const newSelections = { ...selections, [stepId]: value };
        setSelections(newSelections);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsComplete(true);
            // Fetch products for recommendations
            try {
                const res = await fetch('/api/products');
                const products = await res.json();

                // Simple recommendation logic: filter by the 'priority' selection
                const priority = newSelections.priority; // access, cctv, solar, gate
                const categoryMap: Record<string, string> = {
                    'access': 'Access Control',
                    'cctv': 'CCTV',
                    'solar': 'Solar Power',
                    'gate': 'Gate Automation'
                };

                const filtered = products.filter((p: any) =>
                    p.category === categoryMap[priority] ||
                    p.category_slug?.includes(priority)
                ).slice(0, 3);

                setRecommendedProducts(filtered);
            } catch (err) {
                console.error("Failed to load recommendations", err);
            }
        }
    };

    return (
        <div className="bg-[#050505] py-20 border-y border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-6 uppercase tracking-wider">
                        System <span className="text-linos-gold">Configurator</span>
                    </h2>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Build your custom security infrastructure in 60 seconds.</p>
                </div>

                <div className="p-8 md:p-12 glass-panel border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                        <motion.div
                            className="h-full bg-linos-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / (steps.length + 1)) * 100}%` }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {!isComplete ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="text-center">
                                    <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.5em] block mb-4">Step 0{currentStep + 1}</span>
                                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">{steps[currentStep].question}</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {steps[currentStep].options.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSelect(steps[currentStep].id, option.value)}
                                            className="p-8 border border-white/10 bg-white/[0.02] hover:bg-linos-gold hover:border-linos-gold flex flex-col items-center group transition-all"
                                        >
                                            <option.icon className="w-10 h-10 text-linos-gold group-hover:text-linos-black mb-6 transition-colors" />
                                            <span className="text-xs font-bold text-white group-hover:text-linos-black uppercase tracking-widest">{option.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {currentStep > 0 && (
                                    <button
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="flex items-center text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest mx-auto"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-2" /> Previous Step
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-10 py-6"
                            >
                                <div className="w-16 h-16 bg-linos-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-linos-gold/20">
                                    <CheckCircle2 className="w-8 h-8 text-linos-black" />
                                </div>

                                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Configuration Engineered</h3>
                                <p className="text-white/40 text-sm max-w-md mx-auto italic leading-relaxed">
                                    Based on your inputs, our architects have modeled a specialized system for {selections.building} security with a focus on {selections.priority}.
                                </p>

                                {recommendedProducts.length > 0 && (
                                    <div className="pt-10 space-y-8">
                                        <h4 className="text-xs font-bold text-linos-gold uppercase tracking-[0.4em]">Recommended Hardware Assets</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {recommendedProducts.map((p) => (
                                                <Link
                                                    key={p.slug}
                                                    href={`/products/${p.product_slug || p.slug}`}
                                                    className="p-6 border border-white/5 bg-white/[0.01] hover:border-linos-gold/30 transition-all text-left group"
                                                >
                                                    <span className="text-[8px] text-white/30 uppercase tracking-widest block mb-2">{p.category}</span>
                                                    <h5 className="text-[10px] text-white font-bold uppercase leading-tight group-hover:text-linos-gold transition-colors">{p.name || p.product}</h5>
                                                    <div className="mt-4 flex justify-between items-center">
                                                        <span className="text-[9px] text-linos-gold font-bold">{p.price}</span>
                                                        <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-linos-gold transition-colors" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                                    <Link href="/contact" className="btn-gold !px-12">
                                        Request Full Deployment Quote
                                    </Link>
                                    <a
                                        href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hello%20Linos%20Security%2C%20I%20just%20completed%20the%20configurator.%0ABuilding%3A%20${selections.building}%0APriority%3A%20${selections.priority}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline flex items-center justify-center px-10"
                                    >
                                        WhatsApp Engineer
                                    </a>
                                    <button
                                        onClick={() => { setIsComplete(false); setCurrentStep(0); setSelections({}); setRecommendedProducts([]); }}
                                        className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 px-8 py-4"
                                    >
                                        Restart
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
