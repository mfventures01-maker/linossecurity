"use client";

import React, { useState } from 'react';
import { Settings, Globe, Shield, Zap, Search, Layout, FileCode, CheckCircle2, Save, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <Settings className="w-5 h-5 text-linos-gold" />
                        <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Environmental Protocols</span>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tight">Site <span className="text-linos-gold">Protocols</span></h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-gold !py-4 px-10 flex items-center space-x-3 group disabled:opacity-50"
                >
                    {isSaving ? (
                        <div className="w-5 h-5 border-2 border-linos-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Commit Changes</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* SEO Architecture */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-10">
                        <div className="flex items-center space-x-4 border-b border-white/5 pb-8">
                            <div className="w-12 h-12 rounded-2xl bg-linos-gold/10 flex items-center justify-center">
                                <Globe className="w-6 h-6 text-linos-gold" />
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest leading-none">Global SEO Architecture</h3>
                                <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.3em] mt-2">Core search engine visibility parameters</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Site Global Title Prefix</label>
                                <input defaultValue="Linos E Security | Nigeria's Trusted Authority" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs text-white outline-none focus:border-linos-gold/30 transition-all" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Global Meta Description</label>
                                <textarea rows={3} defaultValue="Elite security infrastructure for premium assets. We engineer reliability into every luxury home and commercial facility across the FCT and nationwide." className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs text-white outline-none focus:border-linos-gold/30 transition-all resize-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Blogging Directory Slug</label>
                                    <input defaultValue="/blog" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs text-white outline-none focus:border-linos-gold/30 transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Asset Directory Slug</label>
                                    <input defaultValue="/shop" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-xs text-white outline-none focus:border-linos-gold/30 transition-all" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-10">
                        <div className="flex items-center space-x-4 border-b border-white/5 pb-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                <FileCode className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest leading-none">Technical Meta Headers</h3>
                                <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.3em] mt-2">Sitemap and Indexing Protocols</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            <div className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Auto-Generate Sitemap</p>
                                    <p className="text-[8px] text-white/20 uppercase font-bold tracking-[0.2em]">Updates linossecurity.vercel.app/sitemap.xml daily</p>
                                </div>
                                <div className="w-12 h-6 bg-linos-gold rounded-full relative p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-linos-black rounded-full ml-auto shadow-lg shadow-black/20"></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Google AI Search Resonance</p>
                                    <p className="text-[8px] text-white/20 uppercase font-bold tracking-[0.2em]">Inject high-precision JSON-LD for AI crawlers</p>
                                </div>
                                <div className="w-12 h-6 bg-linos-gold rounded-full relative p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-linos-black rounded-full ml-auto shadow-lg shadow-black/20"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* AI SEO Assistant Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-linos-gold/5 border border-linos-gold/20 p-10 rounded-[2.5rem] space-y-8">
                        <div className="flex items-center space-x-4">
                            <Wand2 className="w-6 h-6 text-linos-gold" />
                            <h3 className="text-lg font-display font-bold text-white uppercase tracking-widest leading-none">High Precision <br /> <span className="text-linos-gold italic">AI SEO</span></h3>
                        </div>

                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed italic">
                            Running real-time analysis on site metadata.
                        </p>

                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] text-white/60 font-bold uppercase tracking-widest">Resonance Score</span>
                                    <span className="text-xs font-bold text-green-500">92%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className="w-[92%] h-full bg-green-500 rounded-full"></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 px-6 border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/20">
                                <span>Canonicals Linked</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between p-4 px-6 border border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white/20">
                                <span>JSON-LD Valid</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                        </div>

                        <button className="w-full btn-gold !py-5 text-[10px] px-2 flex items-center justify-center space-x-3">
                            <Zap className="w-4 h-4" />
                            <span>Run AI SEO Audit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
