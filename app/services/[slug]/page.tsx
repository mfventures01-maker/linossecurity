"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, CheckCircle2, ArrowRight, Cog, MessageCircle } from 'lucide-react';

export default function ServiceDetail() {
    const params = useParams();
    const slug = params.slug as string;

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
                    <div className="w-full lg:w-3/5 space-y-10">
                        <div className="inline-flex items-center space-x-2 bg-linos-gold/10 px-4 py-2 border border-linos-gold/20">
                            <Shield className="w-4 h-4 text-linos-gold" />
                            <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.3em]">Engineering Discipline: Security</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-display font-bold text-white uppercase leading-tight">
                            {slug.replace(/-/g, ' ')}
                        </h1>

                        <p className="text-white/40 text-lg leading-relaxed italic">
                            Professional installation and system design for {slug.replace(/-/g, ' ')}. We provide end-to-end technical execution, from initial site assessment to final commissioning and 24/7 technical relay.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/contact" className="btn-gold">
                                Start Technical Design
                            </Link>
                            <a href="https://wa.me/2348000000000" className="btn-outline flex items-center justify-center space-x-3">
                                <MessageCircle className="w-5 h-5" />
                                <span>Engineering WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5">
                        <div className="aspect-[3/4] border border-white/5 bg-white/[0.01] relative p-1 group overflow-hidden">
                            <div className="w-full h-full border border-linos-gold/10 bg-linos-black flex items-center justify-center">
                                <Cog className="w-24 h-24 text-linos-gold/10 group-hover:rotate-180 transition-transform duration-[2000ms]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { step: '01', title: 'Site Audit', desc: 'Full architectural assessment of the facility risks.' },
                        { step: '02', title: 'System Design', desc: 'Custom modeling of equipment and cabling paths.' },
                        { step: '03', title: 'Installation', desc: 'Military-precision deployment by certified teams.' },
                        { step: '04', title: 'Maintenance', desc: 'Ongoing technical relay and software updates.' }
                    ].map((item, i) => (
                        <div key={i} className="p-10 border border-white/10 bg-white/[0.02] relative">
                            <span className="text-4xl font-display font-bold text-linos-gold/20 absolute top-6 right-6">{item.step}</span>
                            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">{item.title}</h3>
                            <p className="text-white/40 text-xs italic leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
