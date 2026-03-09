"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Shield, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Shop', href: '/shop' },
    { name: 'Install Pack', href: '/installation-packages' },
    { name: 'Projects', href: '/projects' },
    { name: 'Industries', href: '/industries' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Locations', href: '/locations' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-linos-black/90 backdrop-blur-md border-b border-linos-gold/20 py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-14 h-14 bg-linos-gold rounded-full flex items-center justify-center p-2 shadow-lg shadow-linos-gold/20 group-hover:scale-110 transition-transform">
                            <Image src="/logo.png" alt="Linos Logo" width={40} height={40} className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-display font-bold text-white tracking-widest leading-none">LINOS E</span>
                            <span className="text-[10px] font-bold text-linos-gold uppercase tracking-[0.3em]">Security Services</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white/70 hover:text-linos-gold text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-white/70 hover:text-linos-gold transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/shop" className="relative text-white/70 hover:text-linos-gold transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-2 -right-2 bg-linos-gold text-linos-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </Link>
                        <Link href="/contact" className="btn-gold !py-2 !px-4 text-xs">
                            Instant Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="xl:hidden flex items-center">
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-linos-black border-t border-linos-gold/20 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-4 text-white hover:text-linos-gold text-sm font-bold uppercase tracking-[0.2em] border-b border-white/5"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 flex justify-between items-center">
                                <Link href="/contact" className="btn-gold w-full text-center">
                                    Request Inspection
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
