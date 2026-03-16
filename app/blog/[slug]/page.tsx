import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { BUSINESS_DETAILS } from '@/config/business';
import JsonLd, { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/components/SEO/JsonLd';
import { ChevronLeft, Calendar, User, Clock, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: [post.focusKeyword, ...post.secondaryKeywords].join(', '),
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            images: [post.coverImage],
            type: 'article',
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    const schemas: any[] = [
        generateArticleSchema(post, BUSINESS_DETAILS),
        generateBreadcrumbSchema([
            { name: 'Home', url: BUSINESS_DETAILS.website },
            { name: 'Blog', url: `${BUSINESS_DETAILS.website}/blog` },
            { name: post.title, url: `${BUSINESS_DETAILS.website}/blog/${post.slug}` }
        ])
    ];

    if (post.faq && post.faq.length > 0) {
        schemas.push(generateFAQSchema(post.faq));
    }

    return (
        <article className="bg-[#050505] min-h-screen pt-40 pb-20">
            {schemas.map((s, i) => (
                <JsonLd key={i} data={s} />
            ))}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/blog"
                    className="flex items-center text-white/40 hover:text-linos-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-12 transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence
                </Link>

                <header className="mb-16 space-y-8">
                    <div className="flex items-center space-x-4 text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">
                        <span className="px-3 py-1 border border-linos-gold/30 rounded-full">{post.schemaType}</span>
                        <span>•</span>
                        <span>{post.publishDate}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center space-x-6 pt-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-linos-gold/40" />
                        </div>
                        <div>
                            <p className="text-[10px] text-white font-bold uppercase tracking-widest leading-none">{post.author}</p>
                            <p className="text-[8px] text-white/20 uppercase font-bold tracking-[0.2em] mt-2">Technical Authority</p>
                        </div>
                    </div>
                </header>

                <div className="relative h-[25rem] md:h-[35rem] mb-16 rounded-[3rem] overflow-hidden border border-white/5">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8 blog-content">
                        <div
                            className="text-white/60 text-lg leading-relaxed space-y-8 font-inter"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {post.faq && post.faq.length > 0 && (
                            <div className="mt-20 space-y-12">
                                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Intelligence <span className="text-linos-gold italic">Briefing (FAQ)</span></h3>
                                <div className="space-y-6">
                                    {post.faq.map((item, i) => (
                                        <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                                            <h4 className="text-white font-bold uppercase tracking-widest mb-4 flex items-center">
                                                <ShieldCheck className="w-5 h-5 text-linos-gold mr-4 shrink-0" />
                                                {item.question}
                                            </h4>
                                            <p className="text-white/40 text-sm leading-relaxed pl-9">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Cross-linking */}
                    <aside className="lg:col-span-4 space-y-10">
                        <div className="p-10 bg-linos-gold/5 border border-linos-gold/20 rounded-[2.5rem] space-y-8 sticky top-40">
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Deployment Nodes</h4>
                            <div className="space-y-4">
                                {post.internalLinks?.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl group hover:bg-linos-gold hover:text-linos-black transition-all"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{link.text}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-6">Need Immediate Intel?</p>
                                <a
                                    href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}`}
                                    className="flex items-center justify-center space-x-3 w-full py-5 bg-linos-gold text-linos-black font-bold text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Engineering Relay</span>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
