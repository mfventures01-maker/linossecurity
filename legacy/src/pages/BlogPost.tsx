import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Tag, ChevronRight, Bookmark, Sparkles, Shield, Zap, Camera, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/posts/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Not Found');
                return res.json();
            })
            .then(data => {
                setPost(data);

                // SEO: Meta Data Injection (Frontend)
                document.title = `${data.meta_title || data.title} | Linos E’ Security`;
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) metaDesc.setAttribute('content', data.meta_description || data.excerpt);

                // Structured Data (JSON-LD)
                const existingScript = document.getElementById('json-ld-schema');
                if (existingScript) existingScript.remove();

                if (data.schema_json) {
                    const script = document.createElement('script');
                    script.id = 'json-ld-schema';
                    script.type = 'application/ld+json';
                    script.text = data.schema_json;
                    document.head.appendChild(script);
                }

                // Fetch related posts (simple mock: just call all and filter)
                fetch('/api/posts')
                    .then(res => res.json())
                    .then(all => {
                        setRelatedPosts(all.filter((p: any) => p.status === 'published' && p.slug !== slug).slice(0, 3));
                    });

                setLoading(false);
            })
            .catch(() => {
                navigate('/blog');
            });
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center pt-40">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-40 pb-32">
            {/* Breadcrumbs */}
            <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-center space-x-3 text-sm text-gray-400 font-bold uppercase tracking-widest animate-in fade-in duration-500">
                <Link to="/blog" className="hover:text-accent transition-colors">Insights</Link>
                <ChevronRight className="w-4 h-4 text-accent/40" />
                <Link to={`/blog/category/${post.category?.toLowerCase()}`} className="hover:text-accent transition-colors truncate">{post.category}</Link>
                <ChevronRight className="w-4 h-4 text-accent/40 hidden md:block" />
                <span className="text-primary truncate max-w-[200px] hidden md:block">{post.title}</span>
            </nav>

            {/* Hero Section */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="space-y-10 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center space-x-3 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">Authority Publication</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-[1.05] tracking-tight">{post.title}</h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-gray-100">
                        <div className="flex items-center space-x-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-accent font-bold text-xl shadow-xl shadow-black/10">
                                {post.author?.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-primary font-bold text-lg">{post.author}</span>
                                <div className="flex items-center space-x-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                    <span>{Math.ceil(post.content.length / 500)} Min Read</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-sm">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-sm">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative aspect-video rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] mb-20 group"
                    >
                        <img src={post.featured_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={post.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                    </motion.div>
                )}

                {/* Content Body */}
                <div
                    className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-img:rounded-[2.5rem] prose-img:shadow-2xl animate-in fade-in duration-1000 leading-relaxed text-gray-600 mb-32"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Post Footer / Tags */}
                {post.tags && (
                    <div className="flex flex-wrap gap-3 mb-20 pt-10 border-t border-gray-100">
                        {post.tags.split(',').map((tag: string, i: number) => (
                            <span key={i} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:bg-primary hover:text-white transition-all cursor-default">
                                # {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <section className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center mb-32">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight underline decoration-accent/40 decoration-4 underline-offset-8">
                            Want a customized safety strategy for your property?
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed">
                            Our Abuja security auditors provide comprehensive site assessments at no cost.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                            <Link to="/contact" className="btn-primary text-lg px-12 py-5 bg-accent rounded-2xl">
                                Book Site Survey
                            </Link>
                            <a href="tel:+2348000000000" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-12 py-5 rounded-2xl transition-all">
                                Call Expert
                            </a>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="space-y-12">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                            <h2 className="text-3xl font-display font-bold text-primary tracking-tight">Expand Your Knowledge</h2>
                            <Link to="/blog" className="flex items-center text-accent font-bold text-sm group">
                                <span>View All Strategy</span>
                                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {relatedPosts.map((rPost, i) => (
                                <Link key={i} to={`/blog/${rPost.slug}`} className="group space-y-4">
                                    <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-700">
                                        {rPost.featured_image ? (
                                            <img src={rPost.featured_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={rPost.title} />
                                        ) : (
                                            <div className="w-full h-full bg-gray-50 flex items-center justify-center"><Shield className="w-10 h-10 text-accent/10" /></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2">{rPost.title}</h3>
                                    <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-widest pt-2">
                                        <span>Read Case Study</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-accent" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>

            {/* Back to Top Floating Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-12 left-12 p-5 bg-white border border-gray-100 rounded-full shadow-2xl hover:bg-primary hover:text-white transition-all transform active:scale-90 group z-50 text-primary"
            >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
    );
}
