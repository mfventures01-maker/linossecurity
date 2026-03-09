"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, MessageCircle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function ProductDetail() {
    const params = useParams();
    const slug = params.slug as string;

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Image Side */}
                    <div className="relative aspect-square border border-white/10 p-2">
                        <div className="w-full h-full border border-linos-gold/20 bg-white/[0.02] relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] text-white/10 font-bold uppercase tracking-[0.5em]">SYSTEM ASSET</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.3em] block">Certified Security Hardware</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase leading-tight">
                                {slug.replace(/-/g, ' ')}
                            </h1>
                            <p className="text-white/40 text-lg leading-relaxed italic">
                                Advanced technical architecture designed for mission-critical security environments. Engineered with military precision and corporate compliance specs.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-10">
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Availability</h4>
                                <span className="text-green-500 font-bold uppercase tracking-widest text-xs">Ready for Deployment</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Warranty</h4>
                                <span className="text-linos-gold font-bold uppercase tracking-widest text-xs">24-Month Authority</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <button className="w-full btn-gold !py-6 flex items-center justify-center space-x-4">
                                <span>Request Installation Design</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <a href="https://wa.me/2348000000000" className="w-full btn-outline !py-6 flex items-center justify-center space-x-4">
                                <span>Order via WhatsApp</span>
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="pt-10">
                            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6 border-l-2 border-linos-gold pl-4">Core Specifications</h4>
                            <div className="space-y-4">
                                {['High-voltage surge protection built-in', 'Mobile app integration included', 'Weatherproof industrial casing', 'Dual-redundant power capability'].map((spec, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <CheckCircle2 className="w-4 h-4 text-linos-gold" />
                                        <span className="text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
