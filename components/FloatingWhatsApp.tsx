"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';

export default function FloatingWhatsApp() {
    return (
        <motion.a
            href={WHATSAPP_LINKS.general}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
            aria-label="Contact on WhatsApp"
        >
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 pointer-events-none"></div>
            <MessageCircle className="w-6 h-6" />

            <span className="absolute right-full mr-4 bg-white text-green-600 text-[10px] font-bold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-green-100 uppercase tracking-widest">
                Need Help? Chat with Technical Relay
            </span>
        </motion.a>
    );
}
