"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const products = [
    { id: '1', name: 'ZKTeco G3 Pro Facial Terminal', category: 'Access Control', price: '185000', image: 'https://i.postimg.cc/kX3zqB8X/face-recognition.jpg', slug: 'zkteco-g3-pro' },
    { id: '2', name: 'Centurion D10 Turbo Smart', category: 'Gate Automation', price: 'Get Quote', image: 'https://i.postimg.cc/CLqP2YQV/swing-turnstile.jpg', slug: 'centurion-d10-turbo' },
    { id: '3', name: 'Hikvision 4K IP Dome Camera', category: 'CCTV Systems', price: '85000', image: 'https://i.postimg.cc/c1k3qn8c/cctv-installation-sale-repairs-company-in-port-harcourt-owerri-uyo-eket-umuahia-aba-droplets-cctv-so.jpg', slug: 'hikvision-4k-ip' },
    { id: '4', name: '5kVA 48V Hybrid Solar Inverter', category: 'Solar Power', price: '1250000', image: 'https://i.postimg.cc/QdTMzQvh/5kva_setup.jpg', slug: '5kva-hybrid-inverter' },
    { id: '5', name: 'Swing Barrier Turnstile S30', category: 'Turnstiles', price: 'Get Quote', image: 'https://i.postimg.cc/CLqP2YQV/swing-turnstile.jpg', slug: 'swing-barrier-s30' },
    { id: '6', name: 'Smart Deadbolt Lock X7', category: 'Smart Locks', price: '95000', image: 'https://i.postimg.cc/kX3zqB8X/face-recognition.jpg', slug: 'smart-deadbolt-x7' },
];

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Access Control', 'CCTV Systems', 'Gate Automation', 'Solar Power', 'Turnstiles', 'Smart Locks'];

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase">The <span className="text-linos-gold">Inventory</span></h1>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Certified hardware for elite security architectures.</p>
                    </div>

                    <div className="w-full md:w-auto flex items-center bg-white/5 border border-white/10 px-6 py-4">
                        <input
                            type="text"
                            placeholder="Search Systems..."
                            className="bg-transparent border-none outline-none text-white font-bold uppercase tracking-widest text-xs w-full md:w-64"
                        />
                        <Search className="w-5 h-5 text-linos-gold ml-4" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-16 overflow-x-auto pb-4">
                    <button className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-3 mr-4">
                        <SlidersHorizontal className="w-4 h-4 text-linos-gold" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">Filter By Brand</span>
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all ${activeCategory === cat ? 'bg-linos-gold border-linos-gold text-linos-black' : 'bg-transparent border-white/10 text-white/40 hover:border-linos-gold/40'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.filter(p => activeCategory === 'All' || p.category === activeCategory).map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
