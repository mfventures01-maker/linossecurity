"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LocationPage() {
    const params = useParams();
    const city = (params.city as string).charAt(0).toUpperCase() + (params.city as string).slice(1);

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div className="inline-flex items-center space-x-2 bg-linos-gold/10 px-4 py-2 border border-linos-gold/20">
                            <MapPin className="w-4 h-4 text-linos-gold" />
                            <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.3em]">Deployment Region: Nigeria</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-tight">
                            Security Systems <br /> in <span className="text-linos-gold">{city}</span>.
                        </h1>

                        <p className="text-white/40 text-lg leading-relaxed italic">
                            Linos E Security provides elite technical infrastructure and professional security installations tailored for the unique landscape of {city}. From residential automation in high-end estates to industrial facility protection.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/contact" className="btn-gold">
                                Request {city} Site Audit
                            </Link>
                            <Link href="/services" className="btn-outline">
                                View Service Catalog
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-video border border-white/10 bg-white/5 relative overflow-hidden p-2">
                            <div className="w-full h-full border border-linos-gold/20 bg-linos-black/40 flex items-center justify-center">
                                <Shield className="w-20 h-20 text-linos-gold/20 absolute animate-pulse" />
                                <span className="text-[10px] text-white/20 font-bold uppercase tracking-[0.5em] z-10">{city} HUB AREA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Local Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                    {[
                        { title: 'Home Solar Automation', desc: `Sustainable energy infrastructure for ${city} estates.` },
                        { title: 'Industrial CCTV Networks', desc: `Full-scale surveillance for commercial complexes in ${city}.` },
                        { title: 'Estate Access Management', desc: `Biometric and turnstile gateway systems for gated communities.` }
                    ].map((service, i) => (
                        <div key={i} className="p-10 border border-white/5 bg-white/[0.01] flex flex-col items-start">
                            <CheckCircle2 className="w-10 h-10 text-linos-gold mb-8" />
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{service.title}</h3>
                            <p className="text-white/40 text-sm italic mb-8 leading-relaxed">{service.desc}</p>
                            <Link href="/services" className="text-linos-gold text-[10px] font-bold uppercase tracking-widest flex items-center hover:translate-x-2 transition-all">
                                Local Installation Specs <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Local Trust */}
                <div className="p-12 glass-panel border-linos-gold/20 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-8">Ready to deploy in <span className="text-linos-gold">{city}</span>?</h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-sm mb-12 italic leading-relaxed">
                        Our regional technical relay teams are active in {city}, providing same-day site surveys and fast-track installation for verified clients.
                    </p>
                    <Link href="/contact" className="btn-gold inline-block">
                        Contact {city} Technical Lead
                    </Link>
                </div>
            </div>
        </div>
    );
}
