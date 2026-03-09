"use client";

import React from 'react';
import { TrendingUp, Users, MessageCircle, ShieldCheck, Zap, ArrowRight, FileText, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';

export default function AdminDashboard() {
    const products = getAllProducts();
    const posts = getAllPosts();

    const stats = [
        { name: 'Active Nodes', value: products.length, icon: ShoppingBag, change: '+4 this week', color: 'text-blue-400' },
        { name: 'Intelligence Assets', value: posts.length, icon: FileText, change: '+1 drafting', color: 'text-linos-gold' },
        { name: 'Technical Leads', value: '1,284', icon: Users, change: '+12% growth', color: 'text-green-400' },
        { name: 'Conversion Rate', value: '8.4%', icon: TrendingUp, change: 'Vitals Stable', color: 'text-purple-400' },
    ];

    return (
        <div className="space-y-12">
            <div className="px-4">
                <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tight mb-2">Authority Terminal <span className="text-linos-gold">Dashboard</span></h1>
                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.4em]">Operational Status: All Systems Optimal</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-none">{stat.change}</span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.name}</p>
                            <p className="text-4xl font-display font-bold text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Recent Activity */}
                <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linos-gold/5 blur-[100px] -mr-32 -mt-32"></div>
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-display font-bold text-white uppercase tracking-widest">Recent Deployments</h2>
                        <button className="text-[10px] text-linos-gold font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Audit All Activities</button>
                    </div>

                    <div className="space-y-1">
                        {[...posts, ...products.slice(0, 3)].map((item: any, i) => (
                            <div key={i} className="flex items-center justify-between py-6 px-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] rounded-2xl transition-all">
                                <div className="flex items-center space-x-6">
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.name ? 'text-blue-400' : 'text-linos-gold'}`}>
                                        {item.name ? <ShoppingBag className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-white">{item.name || item.title}</p>
                                        <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{item.category || 'Technical Intelligence'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-8">
                                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Propagated</span>
                                    <Link href="#" className="p-3 bg-white/5 rounded-xl hover:bg-linos-gold hover:text-linos-black transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-linos-gold/5 border border-linos-gold/20 p-10 rounded-[2.5rem] space-y-6">
                        <h3 className="text-lg font-display font-bold text-linos-gold uppercase tracking-widest">Rapid Relay</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button className="flex items-center justify-between p-6 bg-linos-gold text-linos-black rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-all">
                                <span>New Intel Asset</span>
                                <Zap className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-between p-6 bg-white/5 border border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                                <span>New Product Node</span>
                                <Zap className="w-4 h-4 text-linos-gold" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] space-y-6">
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-widest">Conversion Radar</h3>
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">WhatsApp Inbound</span>
                                </div>
                                <span className="text-sm font-bold text-white">42 Active</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-linos-gold rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-[8px] text-white/20 uppercase font-bold tracking-widest">
                                <span>Lead Velocity</span>
                                <span className="text-white/40">68% Potential</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
