"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Zap, Target, Users } from 'lucide-react';

export default function IndustryPage() {
    const params = useParams();
    const industry = (params.industry as string).replace(/-/g, ' ').toUpperCase();

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20 mb-32 items-center">
                    <div className="w-full lg:w-3/5 space-y-10">
                        <div className="inline-flex items-center space-x-2 bg-linos-gold/10 px-4 py-2 border border-linos-gold/20">
                            <ShieldCheck className="w-4 h-4 text-linos-gold" />
                            <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.3em]">Specialized Security Protocol</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                            Elite Infrastructure for <br /> <span className="text-linos-gold">{industry}</span>.
                        </h1>

                        <p className="text-white/40 text-lg leading-relaxed italic">
                            Standard security is not enough for the unique risks of the {industry} sector. Linos E Security deploys precision-engineered systems designed to meet international compliance and local operational challenges.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                            {[
                                { title: 'Authority Compliance', desc: 'Meetings NNSA and local safety regulatory standards.' },
                                { title: 'Zero-Downtime Power', desc: 'Hybrid solar energy backups for critical facility operations.' }
                            ].map((benefit, i) => (
                                <div key={i} className="space-y-4">
                                    <h4 className="text-white font-bold uppercase tracking-widest text-xs">{benefit.title}</h4>
                                    <p className="text-white/40 text-xs italic leading-relaxed">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-10">
                            <Link href="/contact" className="btn-gold">
                                Technical Audit Request
                            </Link>
                            <Link href="/projects" className="btn-outline">
                                View Sector Portfolio
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5">
                        <div className="aspect-[3/4] border border-white/5 bg-white/[0.02] relative p-1">
                            <div className="w-full h-full border border-linos-gold/10 bg-linos-black relative overflow-hidden">
                                <div className="absolute inset-0 bg-linos-gold/5 flex items-center justify-center">
                                    <Target className="w-32 h-32 text-linos-gold/5 absolute" />
                                    <span className="text-[10px] text-white/10 font-bold uppercase tracking-[1em] rotate-90">SECTOR ARCHITECTURE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industry Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { name: 'Personnel Awareness', icon: Users, desc: 'Advanced biometric tracking and personnel flow management.' },
                        { name: 'Asset Protection', icon: Zap, desc: 'Perimeter automation and 4K real-time surveillance.' },
                        { name: 'Energy Autonomy', icon: ShieldCheck, desc: 'Redundant power systems to ensure security continuity.' }
                    ].map((item, i) => (
                        <div key={i} className="p-10 border border-white/5 bg-white/[0.01] hover:bg-linos-gold/5 transition-all group">
                            <item.icon className="w-12 h-12 text-linos-gold mb-10 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">{item.name}</h3>
                            <p className="text-white/40 text-sm italic leading-relaxed mb-10">{item.desc}</p>
                            <Link href="/contact" className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.2em] flex items-center group-hover:translate-x-2 transition-transform">
                                Sector Strategy <ArrowRight className="w-3 h-3 ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
