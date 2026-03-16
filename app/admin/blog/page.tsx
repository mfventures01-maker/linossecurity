"use client";

import React, { useState } from 'react';
import { FileText, Plus, Search, MoreVertical, Edit2, Trash2, Globe, Shield, Zap, Wand2, Save, X, Eye, Hash } from 'lucide-react';
import { getAllPosts, BlogPost } from '@/lib/blog';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminBlogList() {
    const [posts, setPosts] = useState(getAllPosts());
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const openEditor = (post: BlogPost | null = null) => {
        setEditingPost(post || {
            slug: '',
            title: '',
            excerpt: '',
            metaTitle: '',
            metaDescription: '',
            focusKeyword: '',
            secondaryKeywords: [],
            publishDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            author: 'Technical Support',
            readTime: '5 min read',
            content: '',
            coverImage: '/images/hero/default.png',
            schemaType: 'Article'
        });
        setIsEditorOpen(true);
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <Zap className="w-5 h-5 text-linos-gold" />
                        <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Intelligence Management</span>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tight">Technical <span className="text-linos-gold">Intelligence</span></h1>
                </div>
                <button
                    onClick={() => openEditor()}
                    className="btn-gold !py-4 px-10 flex items-center space-x-3 group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Create Intel Asset</span>
                </button>
            </div>

            {/* Posts Table-ish view */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Operational Assets</h2>
                    <div className="flex items-center space-x-6">
                        <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Sort: Latest Protocol</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] text-white/20 uppercase font-bold tracking-widest border-b border-white/5 font-display">
                                <th className="px-10 py-8">Topic Authority</th>
                                <th className="px-10 py-8">Deployment Sector</th>
                                <th className="px-10 py-8">Relay Date</th>
                                <th className="px-10 py-8">Status</th>
                                <th className="px-10 py-8 text-right">Operational Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {posts.map((post) => (
                                <tr key={post.slug} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FileText className="w-5 h-5 text-linos-gold/40" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-white truncate max-w-xs">{post.title}</p>
                                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest italic">{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-2 bg-white/5 rounded-lg text-[9px] text-white/60 font-bold uppercase tracking-widest border border-white/5">
                                            {post.slug.includes('cctv') ? 'Surveillance' : post.slug.includes('solar') ? 'Energy' : 'Security'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                        {post.publishDate}
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Propagated</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end space-x-3">
                                            <button
                                                onClick={() => openEditor(post)}
                                                className="p-3 bg-white/5 rounded-xl hover:bg-linos-gold hover:text-linos-black transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Editor Sidebar / Modal */}
            <AnimatePresence>
                {isEditorOpen && (
                    <div className="fixed inset-0 z-[200] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditorOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-4xl bg-[#080808] border-l border-white/5 h-screen overflow-y-auto flex flex-col"
                        >
                            {/* Editor Header */}
                            <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#080808]/80 backdrop-blur-xl z-10">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-linos-gold/10 rounded-xl">
                                        <Edit2 className="w-5 h-5 text-linos-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest leading-none">Intelligence Editor</h3>
                                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.3em] mt-2">Precision Content & SEO Architecture</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button className="p-4 bg-white/5 rounded-xl text-white/40 hover:text-white transition-all" onClick={() => setIsEditorOpen(false)}>
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button className="btn-gold !py-4 px-8 flex items-center space-x-3 group">
                                        <Save className="w-4 h-4" />
                                        <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Propagate Asset</span>
                                    </button>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <div className="p-10 space-y-12">
                                {/* SEO AI Assistant Callout */}
                                <div className="p-8 bg-linos-gold/5 border border-linos-gold/10 rounded-3xl flex items-center justify-between group">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-14 h-14 bg-linos-gold rounded-2xl flex items-center justify-center p-3 shadow-xl shadow-linos-gold/20">
                                            <Wand2 className="w-full h-full text-linos-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest">High Precision AI SEO</h4>
                                            <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.1em] mt-1">Generate meta tags, optimize slugs, and analyze resonance.</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-linos-gold text-linos-black font-bold text-[9px] uppercase tracking-widest hover:scale-105 transition-transform rounded-xl">
                                        Optimize with AI
                                    </button>
                                </div>

                                {/* Content Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Asset Title</label>
                                        <input
                                            defaultValue={editingPost?.title}
                                            placeholder="Enter high-impact title"
                                            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm font-bold text-white outline-none focus:border-linos-gold/30 transition-all font-display"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Technical Slug</label>
                                        <div className="relative">
                                            <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input
                                                defaultValue={editingPost?.slug}
                                                placeholder="e.g. cctv-ai-security-abuja"
                                                className="w-full bg-white/5 border border-white/10 p-5 pl-12 rounded-2xl text-xs text-white outline-none focus:border-linos-gold/30 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SEO Metadata Block */}
                                <div className="space-y-6 pt-10 border-t border-white/5">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Globe className="w-4 h-4 text-blue-400" />
                                        <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">Search Engine Intelligence</h4>
                                    </div>
                                    <div className="grid grid-cols-1 gap-8 p-8 bg-white/[0.01] border border-white/5 rounded-3xl">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em]">SEO Meta Title</label>
                                                <span className="text-[8px] text-white/20 font-bold">54/60 chars</span>
                                            </div>
                                            <input defaultValue={editingPost?.title} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em]">SEO Meta Description</label>
                                                <span className="text-[8px] text-white/20 font-bold">142/160 chars</span>
                                            </div>
                                            <textarea rows={2} defaultValue={editingPost?.excerpt} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none resize-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em]">Indexing Priority</label>
                                                <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none appearance-none font-bold uppercase tracking-widest">
                                                    <option>A (Mission Critical)</option>
                                                    <option>B (Support Tier)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em]">Canonical Link</label>
                                                <input placeholder="Auto-generated if empty" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs text-white outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Editor */}
                                <div className="space-y-4 pt-10 border-t border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Intel Payload (Markdown)</label>
                                        <button className="text-[9px] text-linos-gold font-bold uppercase tracking-widest flex items-center space-x-2">
                                            <Eye className="w-3 h-3" />
                                            <span>Preview Output</span>
                                        </button>
                                    </div>
                                    <textarea
                                        rows={20}
                                        defaultValue={editingPost?.content}
                                        placeholder="Enter technical specifications and strategic narrative..."
                                        className="w-full bg-white/5 border border-white/10 p-8 rounded-3xl text-sm leading-relaxed text-white outline-none focus:border-linos-gold/30 transition-all font-inter"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
