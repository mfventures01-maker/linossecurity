import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Calendar, User, Tag, ChevronRight, Search, Shield, Zap, Camera, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function BlogHome() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data.filter((p: any) => p.status === 'published'));
                setLoading(false);
            });
    }, []);

    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center pt-40">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-40 pb-32">
            {/* Hero Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48 -mb-48" />

                    <div className="relative z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center space-x-3 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">Knowledge Authority</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight">
                            Solar & Security <span className="text-accent italic">Insights</span> Abuja
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Stay ahead with expert guides on high-performance solar systems, luxury security automation, and estate safety tailored for the Abuja lifestyle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 group">
                    <Link to={`/blog/${featuredPost.slug}`}>
                        <div className="grid lg:grid-cols-2 gap-16 items-center bg-gray-50 p-8 md:p-12 rounded-[3.5rem] border border-gray-100 group-hover:bg-white group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-700">
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                                {featuredPost.featured_image ? (
                                    <img src={featuredPost.featured_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={featuredPost.title} />
                                ) : (
                                    <div className="w-full h-full bg-primary flex items-center justify-center"><Shield className="w-20 h-20 text-accent/20" /></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10">
                                    <span className="bg-accent px-4 py-2 rounded-lg text-primary font-bold text-xs shadow-lg">{featuredPost.category}</span>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div className="flex items-center space-x-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-accent" />
                                        <span>{featuredPost.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-accent" />
                                        <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors tracking-tight">{featuredPost.title}</h2>
                                <p className="text-gray-500 text-lg leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                                <div className="flex items-center text-primary font-bold text-lg group-hover:translate-x-4 transition-transform">
                                    <span>Explore Insight</span>
                                    <ArrowRight className="w-6 h-6 ml-3 text-accent" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Categories Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 overflow-x-auto custom-scrollbar pb-6">
                <div className="flex space-x-8 min-w-max">
                    {[
                        { name: 'Latest Strategy', icon: Sparkles },
                        { name: 'Solar Power', icon: Zap },
                        { name: 'CCTV Systems', icon: Camera },
                        { name: 'Access Control', icon: Lock },
                        { name: 'Gate Automation', icon: Shield },
                    ].map((cat, i) => (
                        <button key={i} className="flex items-center space-x-3 text-sm font-bold text-primary group hover:bg-gray-100 px-6 py-4 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-gray-200">
                            <cat.icon className="w-5 h-5 text-accent opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                            <span className="tracking-tight">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Post Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {otherPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col space-y-6"
                        >
                            <Link to={`/blog/${post.slug}`} className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700">
                                {post.featured_image ? (
                                    <img src={post.featured_image} className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center"><Shield className="w-12 h-12 text-accent/10" /></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                            </Link>

                            <div className="space-y-4 px-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-lg border border-accent/20">{post.category}</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                                <Link to={`/blog/${post.slug}`}>
                                    <h3 className="text-2xl font-display font-bold text-primary group-hover:text-accent transition-colors leading-tight tracking-tight line-clamp-2">{post.title}</h3>
                                </Link>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                                <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-bold text-sm pt-2 group/btn">
                                    <span>Read Article</span>
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform text-accent" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {posts.length === 0 && !loading && (
                <div className="max-w-2xl mx-auto text-center py-40 px-6 space-y-10 group bg-gray-50 rounded-[4rem] border border-gray-100">
                    <div className="inline-flex items-center justify-center p-8 bg-white rounded-3xl shadow-xl shadow-black/5 group-hover:rotate-12 transition-transform">
                        <Shield className="w-16 h-16 text-accent/10" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-display font-bold text-primary tracking-tight italic">Authority Pending.</h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm mx-auto">We are currently curating the definitive strategies for Abuja's premium security.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
