"use client";

import React, { useState } from 'react';
import { FileText, Plus, Search, MoreVertical, Edit2, Trash2, Globe, Shield, Zap } from 'lucide-react';
import { getAllPosts, BlogPost } from '@/lib/blog';
import Link from 'next/link';

export default function AdminBlogList() {
    const [posts] = useState(getAllPosts());

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
                <button className="btn-gold !py-4 px-10 flex items-center space-x-3 group">
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
                        <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Filter: All Sectors</span>
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
                                        {post.date}
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Propagated</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end space-x-3">
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-linos-gold hover:text-linos-black transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                                                <Globe className="w-4 h-4" />
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

                <div className="px-10 py-10 border-t border-white/5 bg-white/[0.01] text-center">
                    <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.4em]">End of Intelligence Stream</p>
                </div>
            </div>
        </div>
    );
}
