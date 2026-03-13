"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import { Product } from '@/types/product';
import { WHATSAPP_LINKS } from '@/config/business';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [imgSrc, setImgSrc] = React.useState(product?.image || '');
    const [imgError, setImgError] = React.useState(false);

    const price = String(product?.price || '');
    const isQuoteOnly = price.toLowerCase().includes('quote') || !price || price === 'nan';

    const whatsapp = product?.whatsapp || '';
    const name = product?.name || 'Asset';
    const whatsappUrl = whatsapp.startsWith('http')
        ? whatsapp
        : WHATSAPP_LINKS.orderMessage(name);

    return (
        <div className="group relative bg-white/[0.02] border border-white/5 hover:border-linos-gold/30 transition-all duration-500 overflow-hidden h-full flex flex-col">
            {/* Visual Header */}
            <div className="relative aspect-[4/3] overflow-hidden">
                {!imgError ? (
                    <Image
                        src={imgSrc}
                        alt={product.name}
                        fill
                        className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 bg-linos-black flex items-center justify-center p-12">
                        <Package className="w-16 h-16 text-linos-gold/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-linos-gold/5 to-transparent" />
                    </div>
                )}

                {/* Product Tags */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <span className="bg-linos-gold text-linos-black text-[8px] font-bold px-3 py-1 uppercase tracking-tighter self-start">Certified Asset</span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[8px] font-bold px-3 py-1 uppercase tracking-tighter self-start border border-white/10">{product.category}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-linos-black to-transparent opacity-60"></div>
            </div>

            {/* Content Body */}
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex-grow space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="h-[1px] w-4 bg-linos-gold/40"></div>
                        <span className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3em] font-display">Technical Spec Ready</span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                        <h3 className="text-lg font-display font-bold text-white uppercase leading-tight group-hover:text-linos-gold transition-colors">
                            {product.name}
                        </h3>
                    </Link>

                    <p className="text-white/30 text-xs italic line-clamp-2 font-light">
                        {product.description}
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest block">Deployment Value</span>
                            <span className="text-xl font-display font-bold text-white">
                                {isQuoteOnly ? (
                                    <span className="text-linos-gold text-sm tracking-widest uppercase italic">Price on Request</span>
                                ) : (
                                    <>₦{Number(String(product?.price || '').replace(/[₦,]/g, '')).toLocaleString()}</>
                                )}
                            </span>
                        </div>
                        <ShieldCheck className="w-5 h-5 text-linos-gold/20" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href={`/products/${product.slug}`}
                            className="btn-outline !py-3 !px-2 flex items-center justify-center space-x-2 text-[9px] font-bold uppercase tracking-widest group/btn"
                        >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={whatsappUrl}
                            className="bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600 hover:text-white transition-all py-3 px-2 flex items-center justify-center space-x-2 text-[9px] font-bold uppercase tracking-widest"
                        >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Micro-Interaction Bar */}
            <div className="h-1 w-0 bg-linos-gold group-hover:w-full transition-all duration-700 absolute bottom-0"></div>
        </div>
    );
}
