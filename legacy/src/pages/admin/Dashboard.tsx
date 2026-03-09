import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, ArrowUpRight, ArrowDownRight, TrendingUp, Users, Eye, Sparkles, Plus, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { cn } from '../../lib/utils';

export default function Dashboard() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            });
    }, []);

    const stats = [
        { name: 'Total Posts', value: posts.length, icon: FileText, change: '+12%', trend: 'up', color: 'bg-blue-500' },
        { name: 'Index Health', value: '98%', icon: Sparkles, change: '+2%', trend: 'up', color: 'bg-green-500' },
        { name: 'Avg. Ranking', value: '#1.4', icon: TrendingUp, change: '-0.3', trend: 'up', color: 'bg-accent' },
        { name: 'Crawl Rate', value: '2.4s', icon: Eye, change: '-0.1s', trend: 'up', color: 'bg-purple-500' },
    ];

    const recentPosts = posts.slice(0, 5);

    return (
        <AdminLayout>
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-display font-bold text-white tracking-tight leading-none italic">
                            Dashboard <span className="text-accent">Authority</span>
                        </h1>
                        <p className="text-white/40 text-lg font-medium">Monitoring Linos E’ Security ranking performance in Abuja.</p>
                    </div>
                    <Link
                        to="/admin/blog/create"
                        className="group flex items-center space-x-3 px-10 py-5 bg-accent text-primary font-bold rounded-[2rem] hover:bg-accent-hover transition-all shadow-2xl shadow-accent/10 active:scale-95"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        <span className="text-lg tracking-tight">Create Masterpiece</span>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.name} className="relative group bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] shadow-2xl hover:bg-white/5 transition-all overflow-hidden">
                            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 opacity-10 group-hover:opacity-20 transition-opacity", stat.color)} />
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className={cn("p-4 rounded-2xl shadow-xl shadow-black/10 transition-transform group-hover:scale-110", stat.color)}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={cn(
                                        "flex items-center space-x-1 text-xs font-bold py-2 px-3 rounded-full border bg-white/5",
                                        stat.trend === 'up' ? "text-green-400 border-green-500/20" : "text-red-400 border-red-500/20"
                                    )}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-4xl font-display font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{stat.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3.5rem] shadow-2xl space-y-10 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center space-x-4">
                            <div className="w-2 h-10 bg-accent rounded-full" />
                            <span>Recent Content Strategy</span>
                        </h2>
                        <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    className="bg-transparent pl-12 pr-4 py-2 text-white text-sm outline-none w-full"
                                    placeholder="Search strategy..."
                                />
                            </div>
                            <button className="p-2 hover:bg-white/10 rounded-xl text-white/40 transition-all active:scale-95">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <th className="pb-6 pl-2">Status</th>
                                    <th className="pb-6">Title & Authority</th>
                                    <th className="pb-6 text-center">CTR / Ranking</th>
                                    <th className="pb-6">Date</th>
                                    <th className="pb-6 text-right pr-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {recentPosts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-8 pl-2">
                                            <span className={cn(
                                                "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border",
                                                post.status === 'published' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-white/5 text-white/40 border-white/10"
                                            )}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-16 h-12 bg-white/5 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                                    {post.featured_image ? (
                                                        <img src={post.featured_image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center"><FileText className="w-5 h-5 text-white/20" /></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-white font-bold text-lg mb-1 truncate leading-none transition-colors group-hover:text-accent tracking-tight">{post.title}</span>
                                                    <span className="text-white/30 text-xs truncate max-w-md">{post.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8 text-center">
                                            <div className="flex flex-col items-center space-y-1">
                                                <span className="text-white font-bold text-sm tracking-tight">{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}%</span>
                                                <div className="flex items-center space-x-1">
                                                    <TrendingUp className="w-3 h-3 text-green-400" />
                                                    <span className="text-green-400/60 text-[10px] font-bold">+1.2%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <span className="text-white/40 text-xs font-medium">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </td>
                                        <td className="py-8 text-right pr-2">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    to={`/admin/blog/edit/${post.slug}`}
                                                    className="p-3 bg-white/5 border border-white/5 rounded-2xl text-accent hover:bg-accent hover:text-primary transition-all shadow-xl active:scale-90"
                                                >
                                                    <FileText className="w-5 h-5" />
                                                </Link>
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="p-3 bg-white/5 border border-white/5 rounded-2xl text-white/40 hover:bg-white/10 hover:text-white transition-all shadow-xl active:scale-90"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-white/20 italic font-medium">No posts available yet. Create your first masterpiece to start ranking.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
