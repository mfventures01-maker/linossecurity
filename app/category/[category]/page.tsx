"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Grid, MessageCircle, ArrowRight, Zap, Shield, Lock } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getCategories } from '@/lib/products';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';
import JsonLd, { generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

interface Props {
    params: { category: string };
}

export default function CategoryPage({ params }: Props) {
    const { category: categorySlug } = React.use(params as any) as { category: string };
    const categories = getCategories();

    // Reverse slug to find name
    const rawCategory = categorySlug.replace(/-/g, ' ');
    const categoryName = categories.find(c => c.toLowerCase() === rawCategory.toLowerCase()) ||
        rawCategory.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const products = getProductsByCategory(categoryName);

    if (products.length === 0 && !categories.some(c => c.toLowerCase() === rawCategory.toLowerCase())) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Shop', url: `${BUSINESS_DETAILS.website}/shop` },
        { name: categoryName, url: `${BUSINESS_DETAILS.website}/category/${categorySlug}` }
    ];

    return (
        <div className="bg-linos-black pt-40 pb-20 min-h-screen">
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-20">
                    <div className="flex items-center space-x-3 mb-6">
                        <ShieldCheck className="w-5 h-5 text-linos-gold" />
                        <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Authorized Category Node</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase leading-tight">
                        {categoryName} <span className="text-linos-gold italic font-normal">Vault</span>.
                    </h1>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] italic max-w-2xl leading-relaxed">
                        Precision-engineered {categoryName} infrastructure for mission-critical security deployments. All assets in this vault are certified for high-impact residential and commercial integration.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* SEO Optimized Context Section */}
                <div className="grid lg:grid-cols-3 gap-12 border-t border-white/5 pt-32 mb-32">
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-linos-gold/10 flex items-center justify-center border border-linos-gold/20">
                            <Shield className="w-6 h-6 text-linos-gold" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest leading-tight">National Security Standard</h3>
                        <p className="text-white/40 text-xs leading-relaxed italic">
                            Each asset in our {categoryName} collection undergoes rigorous validation to ensure compatibility with Nigeria's unique power and environmental variables.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-linos-gold/10 flex items-center justify-center border border-linos-gold/20">
                            <Zap className="w-6 h-6 text-linos-gold" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest leading-tight">Hybrid Integration</h3>
                        <p className="text-white/40 text-xs leading-relaxed italic">
                            Linos protocols allow for seamless integration between {categoryName} hardware and our hybrid power energy networks for 24/7 technical continuity.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-linos-gold/10 flex items-center justify-center border border-linos-gold/20">
                            <Lock className="w-6 h-6 text-linos-gold" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest leading-tight">Encrypted Deployment</h3>
                        <p className="text-white/40 text-xs leading-relaxed italic">
                            Professional installation ensures your {categoryName} assets are deployed with maximum security protocols, preventing unauthorized system bypasses.
                        </p>
                    </div>
                </div>

                {/* Category CTA */}
                <div className="p-16 border border-linos-gold/20 bg-white/[0.01] text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linos-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <h2 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-widest">Custom {categoryName} Engineering</h2>
                    <p className="text-white/40 text-sm max-w-xl mx-auto italic mb-12 leading-relaxed">
                        Looking for a bespoke {categoryName} design for a corporate headquarters or luxury villa? Connect with our technical lead for an authority site survey.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        <a href={WHATSAPP_LINKS.serviceMessage(categoryName)} className="btn-gold px-12 uppercase font-bold tracking-widest flex items-center justify-center space-x-3">
                            <MessageCircle className="w-5 h-5" />
                            <span>Request Audit</span>
                        </a>
                        <Link href="/contact" className="btn-outline px-12 uppercase font-bold tracking-widest flex items-center justify-center space-x-3">
                            <span>Contact Installation Command</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
