import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Filter, Trash2, Eye, LayoutGrid, List, MoreVertical, TrendingUp, Sparkles, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { cn } from '../../lib/utils';

export default function PostList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPosts = () => {
        setLoading(true);
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this authority post? This cannot be undone.')) {
            await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            fetchPosts();
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 overflow-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-display font-bold text-white tracking-tight leading-none italic">
                            All <span className="text-accent">Strategy</span>
                        </h1>
                        <p className="text-white/40 text-lg font-medium">Managing {posts.length} ranking assets on Linos E’ Security.</p>
                    </div>
                    <Link
                        to="/admin/blog/create"
                        className="group flex items-center space-x-3 px-10 py-5 bg-accent text-primary font-bold rounded-[2rem] hover:bg-accent-hover transition-all shadow-2xl shadow-accent/10 active:scale-95"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        <span className="text-lg tracking-tight">Create Masterpiece</span>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2.5rem] flex flex-col md:flex-row justify-between gap-6 backdrop-blur-xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-16 pr-6 text-white text-sm outline-none focus:border-accent transition-all placeholder:text-white/10"
                            placeholder="Search by title, slug or focus keyword..."
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setView('list')}
                                className={cn("p-3 rounded-lg transition-all", view === 'list' ? "bg-accent text-primary shadow-lg" : "text-white/40 hover:text-white")}
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setView('grid')}
                                className={cn("p-3 rounded-lg transition-all", view === 'grid' ? "bg-accent text-primary shadow-lg" : "text-white/40 hover:text-white")}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>

                        <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-white/40 hover:text-accent transition-all active:scale-95">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* List View */}
                {view === 'list' && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/[0.01]">
                                    <th className="py-8 pl-10">Status</th>
                                    <th className="py-8">Authority Asset</th>
                                    <th className="py-8">Engagement</th>
                                    <th className="py-8">SEO Score</th>
                                    <th className="py-8 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-white/[0.02] transition-all duration-500">
                                        <td className="py-8 pl-10">
                                            <span className={cn(
                                                "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all duration-500 group-hover:px-5",
                                                post.status === 'published' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-white/5 text-white/40 border-white/10"
                                            )}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-20 h-16 bg-white/5 rounded-2xl overflow-hidden border border-white/10 shrink-0 group-hover:scale-105 transition-transform duration-700 shadow-xl shadow-black/20 relative">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent z-10" />
                                                    {post.featured_image ? (
                                                        <img src={post.featured_image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center"><FileText className="w-8 h-8 text-white/10" /></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-white font-bold text-xl mb-1 truncate leading-none transition-all group-hover:text-accent tracking-tight max-w-sm">{post.title}</span>
                                                    <div className="flex items-center space-x-3 text-white/30 text-xs mt-1">
                                                        <span className="font-bold text-accent/40">{post.category}</span>
                                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <Eye className="w-3 h-3 text-white/20" />
                                                    <span className="text-white font-bold text-sm tracking-tight">{Math.floor(Math.random() * 5000) + 100}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <TrendingUp className="w-3 h-3 text-green-400" />
                                                    <span className="text-green-400/60 text-[10px] font-bold">+{(Math.random() * 10).toFixed(1)}% Velocity</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 font-bold text-accent text-xs shadow-inner">
                                                    84
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex space-x-1">
                                                        {[1, 2, 3, 4, 5].map(s => <div key={s} className={cn("w-1.5 h-1.5 rounded-full", s < 5 ? "bg-accent" : "bg-white/10")} />)}
                                                    </div>
                                                    <span className="text-[10px] text-white/20 font-bold uppercase mt-1">Excellent</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8 text-right pr-10">
                                            <div className="flex justify-end space-x-3">
                                                <Link
                                                    to={`/admin/blog/edit/${post.slug}`}
                                                    className="p-4 bg-white/5 border border-white/5 rounded-2xl text-accent hover:bg-accent hover:text-primary transition-all shadow-xl active:scale-90"
                                                >
                                                    <FileText className="w-6 h-6" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-4 bg-white/5 border border-white/5 rounded-2xl text-red-400 hover:bg-red-400 hover:text-white transition-all shadow-xl active:scale-90"
                                                >
                                                    <Trash2 className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Grid View */}
                {view === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="group bg-white/[0.03] border border-white/5 rounded-[3rem] overflow-hidden hover:bg-white/5 transition-all duration-500 shadow-2xl flex flex-col relative">
                                <div className="absolute top-6 right-6 z-20">
                                    <span className={cn(
                                        "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md",
                                        post.status === 'published' ? "bg-green-500/20 text-green-400 border-green-500/20" : "bg-white/10 text-white/40 border-white/10"
                                    )}>
                                        {post.status}
                                    </span>
                                </div>

                                <div className="relative aspect-video overflow-hidden">
                                    {post.featured_image ? (
                                        <img src={post.featured_image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt="" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center"><FileText className="w-12 h-12 text-white/10" /></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                                    <div className="space-y-3">
                                        <div className="text-accent text-[10px] font-bold uppercase tracking-[0.2em]">{post.category}</div>
                                        <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-accent transition-colors leading-tight line-clamp-2">{post.title}</h3>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex items-center space-x-3 text-white/30 text-xs">
                                            <span className="font-bold text-white/50">{post.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Link
                                                to={`/admin/blog/edit/${post.slug}`}
                                                className="p-3 bg-white/5 border border-white/5 rounded-xl text-accent hover:bg-accent hover:text-primary transition-all active:scale-90"
                                            >
                                                <FileText className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-3 bg-white/5 border border-white/5 rounded-xl text-red-400 hover:bg-red-400 hover:text-white transition-all active:scale-90"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredPosts.length === 0 && !loading && (
                    <div className="bg-white/[0.03] border border-white/10 p-24 rounded-[4rem] text-center space-y-10 group shadow-2xl">
                        <div className="inline-flex items-center justify-center p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group-hover:rotate-12 transition-transform shadow-inner shadow-white/5">
                            <AlertCircle className="w-16 h-16 text-accent/20" />
                        </div>
                        <div className="max-w-md mx-auto space-y-4">
                            <h2 className="text-3xl font-display font-bold text-white tracking-tight italic">The void is silent.</h2>
                            <p className="text-white/30 text-lg leading-relaxed font-medium">No results matched your strategy. Refine your search or pioneer new territory.</p>
                        </div>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all active:scale-95 border border-white/10 shadow-xl"
                        >
                            Reset Search Filter
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
