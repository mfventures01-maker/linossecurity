"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ShieldCheck, Send, Clock, UserCheck } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-linos-black pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8">Direct <span className="text-linos-gold">Consultation</span></h1>
                    <p className="text-white/40 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs leading-relaxed">
                        Our Abuja-based engineering team is ready to design and deploy your security infrastructure.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Info Side */}
                    <div className="space-y-12">
                        <div className="p-10 border border-white/5 bg-white/[0.01] rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-linos-gold/5 rounded-full -mr-20 -mt-20 blur-3xl" />

                            <h2 className="text-2xl font-bold text-white mb-10 uppercase tracking-widest border-l-4 border-linos-gold pl-6">Technical HQ</h2>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-linos-gold flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-linos-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Abuja Office</h4>
                                        <p className="text-white/40 text-sm italic leading-relaxed">
                                            Suit 202, 2nd Floor, Bright Star Plaza, 50 Ebitu Ukiwe St, Jabi, Abuja, Federal Capital Territory
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-linos-gold flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-linos-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Inquiry Hotline</h4>
                                        <p className="text-white/40 text-sm font-bold tracking-widest">+234 800 000 0000</p>
                                        <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.2em] mt-2 block italic">Available 24/7 for Active Contracts</span>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-linos-gold flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-linos-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Support Relay</h4>
                                        <p className="text-white/40 text-xs italic">Mon - Fri: 08:00 - 18:00</p>
                                        <p className="text-white/40 text-xs italic">Sat: 10:00 - 16:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-linos-gold text-linos-black flex items-center justify-between group">
                            <div>
                                <h4 className="text-xl font-bold uppercase tracking-widest mb-1">WhatsApp Relay</h4>
                                <p className="text-linos-black/60 text-[10px] font-bold uppercase tracking-widest">Instant Engineering Support</p>
                            </div>
                            <a href="https://wa.me/2348000000000" className="w-16 h-16 bg-linos-black text-linos-gold flex items-center justify-center hover:scale-110 transition-transform">
                                <Phone className="w-8 h-8 rotate-12" />
                            </a>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-12 border border-white/10 bg-white/[0.02] rounded-sm relative">
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-linos-gold flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-linos-black" />
                        </div>

                        <h3 className="text-3xl font-display font-bold text-white mb-10 uppercase tracking-wider">Deploy Request</h3>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Full Entity Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white uppercase tracking-widest outline-none focus:border-linos-gold transition-colors text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Direct Phone No.</label>
                                    <input type="tel" className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white uppercase tracking-widest outline-none focus:border-linos-gold transition-colors text-xs" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Core Infrastructure Interest</label>
                                <select className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white uppercase tracking-widest outline-none focus:border-linos-gold transition-colors text-xs appearance-none">
                                    <option className="bg-linos-black text-white">Select Specialty</option>
                                    <option className="bg-linos-black text-white">Access Control Installation</option>
                                    <option className="bg-linos-black text-white">CCTV Surveillance Upgrade</option>
                                    <option className="bg-linos-black text-white">Automatic Gate System</option>
                                    <option className="bg-linos-black text-white">Solar Power Asset</option>
                                    <option className="bg-linos-black text-white">Full Security Audit</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Installation Context</label>
                                <textarea rows={5} className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white uppercase tracking-widest outline-none focus:border-linos-gold transition-colors text-xs resize-none"></textarea>
                            </div>

                            <button className="w-full btn-gold !py-6 flex items-center justify-center space-x-4">
                                <span>Initial Engineering Request</span>
                                <Send className="w-5 h-5" />
                            </button>

                            <p className="text-[10px] text-white/20 text-center font-bold uppercase tracking-[0.3em] italic">
                                * All professional inquiries are protected with NDA architecture.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
