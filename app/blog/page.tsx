import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { BUSINESS_DETAILS } from '@/config/business';
import JsonLd, { generateBreadcrumbSchema } from '@/components/SEO/JsonLd';
import { ArrowRight, Calendar, User, Clock, Shield } from 'lucide-react';

export const metadata = {
    title: 'Technical Intelligence Blog | Linos E Security Nigeria',
    description: 'Expert insights on automatic doors, security automation, and protection architecture in Nigeria.',
};

export default function BlogPage() {
    const posts = getAllPosts();

    const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Blog', url: `${BUSINESS_DETAILS.website}/blog` }
    ]);

    return (
        <div className="bg-[#050505] min-h-screen pt-40 pb-20">
            <JsonLd data={breadcrumbs} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <Shield className="w-5 h-5 text-linos-gold" />
                        <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Knowledge Repository</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 uppercase tracking-tight">
                        Technical <span className="text-linos-gold">Intelligence</span>
                    </h1>
                    <p className="text-white/40 max-w-2xl mx-auto font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                        Precision analysis on security architecture, automation engineering, and facility protection protocols for the West African market.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:border-linos-gold/30 transition-all duration-700 hover:-translate-y-2"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                            </div>

                            <div className="p-10 flex-grow flex flex-col">
                                <div className="flex items-center space-x-4 mb-6 text-[8px] text-white/30 font-bold uppercase tracking-widest">
                                    <span className="text-linos-gold">{post.publishDate}</span>
                                    <span>•</span>
                                    <span>{post.author}</span>
                                </div>
                                <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-widest leading-relaxed group-hover:text-linos-gold transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-8 italic line-clamp-2">
                                    {post.metaDescription}
                                </p>
                                <div className="mt-auto flex items-center text-[10px] text-linos-gold font-bold uppercase tracking-[0.2em]">
                                    Analyze Intel <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
