"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ArrowRight, Star, ShieldCheck } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    slug: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group border border-white/5 bg-white/[0.01] hover:bg-linos-gold/5 transition-all overflow-hidden relative">
            <Link href={`/product/${product.slug}`} className="block aspect-square relative overflow-hidden bg-[#0A0A0A]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 bg-linos-black/80 backdrop-blur-md px-3 py-1 border border-white/10 flex items-center space-x-2">
                    <ShieldCheck className="w-3 h-3 text-linos-gold" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Certified</span>
                </div>
            </Link>

            <div className="p-8">
                <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.2em] block mb-4">{product.category}</span>
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider group-hover:text-linos-gold transition-colors">{product.name}</h3>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-display font-bold text-white">
                        {product.price === 'Get Quote' ? 'QUOTE' : `₦${product.price}`}
                    </span>
                    <Link
                        href={`/product/${product.slug}`}
                        className="w-10 h-10 bg-linos-gold text-linos-black flex items-center justify-center hover:bg-white transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
