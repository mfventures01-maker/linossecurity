"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ShieldCheck, Zap, ArrowRight, Package, Clock, Shield } from 'lucide-react';
import { getProductBySlug } from '@/lib/products';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';
import JsonLd, { generateProductSchema, generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

interface Props {
    params: { slug: string };
}

export default function ProductPage({ params }: Props) {
    const { slug } = React.use(params as any) as { slug: string };
    const product = getProductBySlug(slug);
    const [imgError, setImgError] = React.useState(false);

    if (!product) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Shop', url: `${BUSINESS_DETAILS.website}/shop` },
        { name: product.name, url: `${BUSINESS_DETAILS.website}/products/${product.slug}` }
    ];

    const productSchema = generateProductSchema(product as any, BUSINESS_DETAILS);
    const whatsappUrl = product.whatsapp.startsWith('http')
        ? product.whatsapp
        : WHATSAPP_LINKS.orderMessage(product.name);

    return (
        <div className="bg-linos-black pt-40 pb-20 min-h-screen">
            <JsonLd data={productSchema} />
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Image Side */}
                    <div className="space-y-6">
                        <div className="relative aspect-square border border-white/10 p-2 group overflow-hidden">
                            <div className="w-full h-full border border-linos-gold/20 bg-white/[0.02] relative overflow-hidden">
                                {!imgError ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        priority
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-linos-black flex flex-col items-center justify-center p-20 text-center">
                                        <Package className="w-24 h-24 text-linos-gold/20 mb-6" />
                                        <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.4em]">Asset Visualization Relay Offline</span>
                                    </div>
                                )}
                                <div className="absolute top-6 left-6 flex space-x-2">
                                    <span className="bg-linos-gold text-linos-black text-[8px] font-bold px-3 py-1 uppercase tracking-tighter">Certified Asset</span>
                                    <span className="bg-white text-linos-black text-[8px] font-bold px-3 py-1 uppercase tracking-tighter">In Stock</span>
                                </div>
                            </div>
                        </div>

                        {/* Technical Badges */}
                        <div className="grid grid-cols-3 gap-4 font-display">
                            {[
                                { icon: Shield, label: 'Secured' },
                                { icon: Package, label: 'Authentic' },
                                { icon: Clock, label: 'Fast Setup' }
                            ].map((badge, i) => (
                                <div key={i} className="py-4 border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center space-y-2">
                                    <badge.icon className="w-4 h-4 text-linos-gold/40" />
                                    <span className="text-[8px] text-white/30 uppercase tracking-widest">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <div className="h-[1px] w-8 bg-linos-gold"></div>
                                <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.3em]">Linos E Security Protocol</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase leading-tight">
                                {product.name}
                            </h1>
                            {product.body_html ? (
                                <div
                                    className="text-white/40 text-lg leading-relaxed italic font-light prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.body_html }}
                                />
                            ) : (
                                <p className="text-white/40 text-lg leading-relaxed italic font-light">
                                    {product.description}
                                </p>
                            )}
                            <div className="text-3xl font-display font-bold text-white">
                                {product.price === 'Get Quote' ? (
                                    <span className="text-linos-gold uppercase tracking-tighter">Price on Request</span>
                                ) : (
                                    <>₦{Number(product.price).toLocaleString()}</>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-10">
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 font-display">Deployment Status</h4>
                                <div className="text-green-500 font-bold uppercase tracking-widest text-xs flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    Authorized Hub Ready
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 font-display">Technical Warranty</h4>
                                <div className="text-linos-gold font-bold uppercase tracking-widest text-xs flex items-center">
                                    <ShieldCheck className="w-3 h-3 mr-2" /> 24-Month Authority
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={whatsappUrl}
                                className="w-full btn-gold !py-6 flex items-center justify-center space-x-4 group"
                            >
                                <span className="uppercase tracking-[0.2em] font-bold">Order via WhatsApp</span>
                                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </a>
                            <Link
                                href="/contact"
                                className="w-full btn-outline !py-6 flex items-center justify-center space-x-4 group"
                            >
                                <span className="uppercase tracking-[0.2em] font-bold italic">Request Professional Installation</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Specification Table */}
                        <div className="pt-10">
                            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 border-l-2 border-linos-gold pl-4 italic font-display">Technical Architecture</h4>
                            <div className="space-y-0 text-[10px] uppercase font-bold tracking-[0.2em]">
                                {[
                                    { label: 'Asset Reliability', value: 'High-Impact Industrial' },
                                    { label: 'Integration Level', value: 'Cloud-Encrypted Relay' },
                                    { label: 'Security Compliance', value: 'NNSA Global Standard' },
                                    { label: 'Environment Rating', value: 'Weatherproof IP67' }
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between py-5 border-b border-white/5">
                                        <span className="text-white/30">{row.label}</span>
                                        <span className="text-white">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
