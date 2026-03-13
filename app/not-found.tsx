"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linos-black flex items-center justify-center p-6">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linos-gold/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-xl w-full text-center relative z-10 space-y-12">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-linos-gold/10 border border-linos-gold/20 flex items-center justify-center mx-auto mb-8"
                >
                    <ShieldAlert className="w-12 h-12 text-linos-gold" />
                </motion.div>

                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter">
                        404
                    </h1>
                    <div className="h-[1px] w-20 bg-linos-gold mx-auto"></div>
                    <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest italic">
                        Breach Protocol: Page Not Found
                    </h2>
                    <p className="text-white/40 text-sm italic leading-relaxed max-w-sm mx-auto">
                        The resource you are attempting to access does not exist on this server or has been relocated to a secure sector.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/" className="btn-gold flex items-center justify-center group">
                        <Home className="w-4 h-4 mr-2" />
                        Return to Command
                    </Link>
                    <Link href="/contact" className="btn-outline flex items-center justify-center group">
                        Report Issue
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="pt-20">
                    <span className="text-[10px] text-white/10 uppercase font-bold tracking-[0.5em]">Linos E Security Intelligence Hub</span>
                </div>
            </div>
        </div>
    );
}
