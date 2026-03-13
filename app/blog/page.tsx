"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Clock, ArrowRight, User } from 'lucide-react';

const mockPosts = [
    {
        title: "The Future of Security: AI-Driven Surveillance in Nigeria",
        excerpt: "Discover how artificial intelligence is transforming security landscapes across Abuja and Lagos, providing proactive threat detection.",
        category: "Surveillance",
        author: "Engineering Lead",
        date: "March 12, 2026",
        slug: "future-of-security-ai"
    },
    {
        title: "Energy Autonomy: Why Hybrid Solar is the Standard for Estate Security",
        excerpt: "Estate security requires zero downtime. Learn why hybrid solar systems are the mission-critical foundation for Nigerian homes.",
        category: "Solar Power",
        author: "Power Architect",
        date: "March 10, 2026",
        slug: "energy-autonomy-solar"
    },
    {
        title: "Mastering Access Control: Biometrics vs. Facial Recognition",
        excerpt: "An in-depth look at the pros and cons of different biometric protocols for high-traffic corporate environments.",
        category: "Access Control",
        author: "Tech Relay",
        date: "March 08, 2026",
        slug: "biometrics-vs-facial-recognition"
    }
];

export default function BlogPage() {
    return (
        <div className="bg-linos-black min-h-screen pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 space-y-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-[1px] w-12 bg-linos-gold"></div>
                        <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.5em]">Technical Intelligence Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-display font-bold text-white uppercase leading-tight">
                        Security <span className="text-linos-gold italic underline decoration-white/10">Insights</span> & Engineering.
                    </h1>
                    <p className="text-white/40 text-lg italic leading-relaxed font-light">
                        Expert perspectives on the intersection of security automation, energy reliability, and premium facility management in Nigeria.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {mockPosts.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col h-full bg-white/[0.02] border border-white/5 hover:border-linos-gold/30 transition-all group"
                        >
                            <div className="p-8 flex-grow space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-linos-gold text-[9px] font-bold uppercase tracking-widest bg-linos-gold/10 px-3 py-1 border border-linos-gold/20">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center text-white/20 text-[9px] font-bold uppercase tracking-widest">
                                        <Clock className="w-3 h-3 mr-2" />
                                        {post.date}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-linos-gold transition-colors leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-white/40 text-sm italic leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="p-8 pt-0 mt-auto">
                                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                            <User className="w-4 h-4 text-linos-gold" />
                                        </div>
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{post.author}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="text-linos-gold hover:text-white transition-colors">
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-32 p-12 border border-linos-gold/20 bg-linos-gold/[0.02] text-center">
                    <BookOpen className="w-16 h-16 text-linos-gold/20 mx-auto mb-8" />
                    <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-6">Want Custom Technical Audits?</h3>
                    <p className="text-white/40 text-sm max-w-xl mx-auto italic mb-10 leading-relaxed">
                        Our intelligence team performs on-site facility audits for estates, corporate HQs, and government infrastructures. Connect with a relay engineer today.
                    </p>
                    <Link href="/contact" className="btn-gold !px-12 uppercase font-bold tracking-[0.2em] text-xs">Access Engineering Relay</Link>
                </div>
            </div>
        </div>
    );
}
