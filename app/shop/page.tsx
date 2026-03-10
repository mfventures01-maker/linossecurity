"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ShieldCheck, Zap, Lock, Grid } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';
import { BUSINESS_DETAILS } from '@/config/business';
import JsonLd, { generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const allProducts = getAllProducts();

    // Use categories directly from the products
    const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))].sort();

    const filteredProducts = allProducts.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Shop', url: `${BUSINESS_DETAILS.website}/shop` }
    ];

    return (
        <div className="bg-linos-black pt-40 pb-20 min-h-screen">
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center space-x-3 mb-6">
                            <ShieldCheck className="w-5 h-5 text-linos-gold" />
                            <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Official Equipment Inventory</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 uppercase leading-tight">
                            Technical <span className="text-linos-gold italic font-normal">Command</span> Center.
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs italic">
                            Authorized hardware for mission-critical security architectures. All assets are NNSA compliant and certified for deployment in Nigeria.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex items-center bg-white/[0.03] border border-white/10 px-6 py-5 focus-within:border-linos-gold/50 transition-all">
                        <input
                            type="text"
                            placeholder="Search Assets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-white font-bold uppercase tracking-widest text-[10px] w-full md:w-64"
                        />
                        <Search className="w-4 h-4 text-linos-gold ml-4" />
                    </div>
                </div>

                {/* Categories Strategy */}
                <div className="flex flex-wrap gap-3 mb-16 overflow-x-auto pb-6 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all relative ${activeCategory === cat ? 'bg-linos-gold border-linos-gold text-linos-black' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-linos-gold/20'}`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.div layoutId="active" className="absolute -bottom-1 left-0 right-0 h-[1px] bg-linos-gold" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Inventory Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center border border-white/5 bg-white/[0.01]">
                        <Grid className="w-12 h-12 text-linos-gold/20 mx-auto mb-6" />
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">No Asset Matches Found</h3>
                        <p className="text-white/30 text-xs italic">Broaden your search criteria or contact our technical relay team for custom procurement.</p>
                        <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-10 text-linos-gold text-[10px] font-bold uppercase tracking-[0.2em] border-b border-linos-gold/20 pb-1">Reset Filters</button>
                    </div>
                )}

                {/* Technical Support CTA */}
                <div className="mt-32 p-12 glass-panel border border-linos-gold/20 text-center relative overflow-hidden">
                    <Zap className="w-32 h-32 text-linos-gold/[0.03] absolute -top-10 -left-10" />
                    <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-widest italic">Can't Find Your Configuration?</h2>
                    <p className="text-white/40 text-sm italic max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Our engineering hub handles global procurement for specialized security military hardware and custom power architectures. Connect with our technical lead for bespoke system design.
                    </p>
                    <a href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}`} className="btn-gold px-12 uppercase font-bold tracking-widest">Connect with Engineering Relay</a>
                </div>
            </div>
        </div>
    );
}

