"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, ChevronRight, MessageCircle, Share2, ShieldCheck, Zap } from 'lucide-react';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';
import JsonLd, { generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

import { getPostBySlug } from '@/lib/blog';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = getPostBySlug(slug);

    if (!post) {
        if (slug.includes('installation')) return <BlogPostTemplate slug={slug} title={slug.replace(/-/g, ' ')} />;
        notFound();
    }

    return <BlogPostTemplate {...post} />;
}

function BlogPostTemplate({ title, date, author, readTime, content, slug }: any) {
    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Blog', url: `${BUSINESS_DETAILS.website}/blog` },
        { name: title, url: `${BUSINESS_DETAILS.website}/blog/${slug}` }
    ];

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-8 mb-16">
                    <div className="flex items-center space-x-3">
                        <ShieldCheck className="w-4 h-4 text-linos-gold" />
                        <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Official Technical Intelligence</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase leading-tight">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 py-8 border-y border-white/5">
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-white/20" />
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{date || 'March 2026'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-white/20" />
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{author || 'Technical Lead'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-white/20" />
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{readTime || '10 min read'}</span>
                        </div>
                    </div>
                </div>

                <div className="prose prose-invert prose-linos max-w-none">
                    <div className="text-white/60 leading-relaxed text-lg italic mb-12" dangerouslySetInnerHTML={{ __html: content || '<p>Detailed technical analysis incoming...</p>' }} />
                </div>

                {/* Internal Links & CTA */}
                <div className="mt-20 p-10 border border-linos-gold/20 bg-linos-gold/[0.02] relative overflow-hidden">
                    <Zap className="w-32 h-32 text-linos-gold/[0.03] absolute -bottom-10 -right-10" />
                    <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-widest">Deploy Professional Security</h3>
                    <p className="text-white/40 text-sm italic mb-10 leading-relaxed max-w-2xl">
                        Technical intelligence is the first step toward facility dominance. The next is professional-grade execution. Linos E Security provides end-to-end installation for all systems discussed in this article.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/services" className="btn-gold px-10">View Technical Protocols</Link>
                        <a href={WHATSAPP_LINKS.general} className="btn-outline px-10 flex items-center justify-center space-x-3">
                            <MessageCircle className="w-5 h-5" />
                            <span>Instant Technical Relay</span>
                        </a>
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center">
                    <Link href="/blog" className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center hover:text-linos-gold transition-colors">
                        <ChevronRight className="w-4 h-4 mr-2 rotate-180" /> Back to Intelligence Hub
                    </Link>
                    <button className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center hover:text-linos-gold transition-colors">
                        Share Tech Intelligence <Share2 className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </article>
        </div>
    );
}
