"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Shield, ShoppingCart, Search, ChevronDown, Contact } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_DETAILS } from '@/config/business';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/shop' },
    {
        name: 'Solutions', href: '/services', dropdown: [
            { name: 'CCTV Surveillance', href: '/services/cctv-installation' },
            { name: 'Access Control', href: '/services/access-control-installation' },
            { name: 'Solar Power', href: '/services/solar-power-installation' },
            { name: 'Gate Automation', href: '/services/automatic-gate-installation' },
            { name: 'Turnstile Systems', href: '/services/turnstile-installation' },
        ]
    },
    { name: 'Projects', href: '/locations' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-linos-black/95 backdrop-blur-xl border-b border-linos-gold/30 py-1' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-14 h-14 bg-linos-gold rounded-full flex items-center justify-center p-2 shadow-2xl shadow-linos-gold/40 group-hover:scale-105 transition-all duration-700">
                            <Image
                                src="/logo.png"
                                alt="Linos Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-display font-bold text-white tracking-[0.2em] leading-none uppercase">LINOS E</span>
                            <span className="text-[8px] font-bold text-linos-gold uppercase tracking-[0.5em] mt-1">Security Standards</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group/item"
                                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center space-x-1 text-white/50 hover:text-linos-gold text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 py-4"
                                >
                                    <span>{link.name}</span>
                                    {link.dropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                                </Link>

                                <AnimatePresence>
                                    {link.dropdown && activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full -left-4 w-64 bg-linos-black/95 backdrop-blur-2xl border border-white/5 p-6 space-y-4 shadow-2xl shadow-black/50"
                                        >
                                            {link.dropdown.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="block text-[9px] text-white/40 hover:text-linos-gold font-bold uppercase tracking-[0.2em] transition-colors"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/contact" className="btn-gold !py-3 !px-8 text-[10px] font-bold tracking-[0.2em] shadow-lg shadow-linos-gold/10">
                            TECHNICAL AUDIT
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                            {isOpen ? <X className="w-8 h-8 text-linos-gold" /> : <Menu className="w-8 h-8 text-linos-gold" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="lg:hidden fixed inset-0 top-24 bg-linos-black/95 backdrop-blur-3xl border-t border-white/5 overflow-y-auto"
                    >
                        <div className="px-6 py-12 space-y-8">
                            {navLinks.map((link) => (
                                <div key={link.name} className="space-y-4">
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-2xl font-display font-bold text-white uppercase tracking-widest"
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="pl-6 space-y-4 border-l border-linos-gold/20">
                                            {link.dropdown.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-xs font-bold text-white/40 uppercase tracking-widest"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-12">
                                <Link href="/contact" className="btn-gold w-full text-center tracking-[0.4em] font-bold py-6">
                                    INSTANT RELAY
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

