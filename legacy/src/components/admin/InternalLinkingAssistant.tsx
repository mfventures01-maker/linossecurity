import React, { useState, useEffect } from 'react';
import { Search, Link as LinkIcon, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function InternalLinkingAssistant() {
    const [posts, setPosts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data.filter((p: any) => p.status === 'published')));
    }, []);

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const copyLink = (slug: string) => {
        const link = `<a href="/blog/${slug}">${posts.find(p => p.slug === slug).title}</a>`;
        navigator.clipboard.writeText(link);
        setCopied(slug);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-xs outline-none focus:border-accent transition-all placeholder:text-white/10"
                    placeholder="Search authority assets..."
                />
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {filteredPosts.map(post => (
                    <div key={post.id} className="group p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between gap-4">
                        <div className="flex flex-col min-w-0">
                            <span className="text-white font-bold text-[11px] truncate leading-tight group-hover:text-accent transition-colors">{post.title}</span>
                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">{post.category}</span>
                        </div>
                        <button
                            onClick={() => copyLink(post.slug)}
                            className={cn(
                                "p-2 rounded-lg transition-all active:scale-90 shrink-0",
                                copied === post.slug ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                            )}
                            title="Copy internal link HTML"
                        >
                            {copied === post.slug ? <CheckCircle2 className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
                {filteredPosts.length === 0 && (
                    <p className="text-center text-white/10 text-[10px] font-bold py-10 uppercase tracking-widest">No assets found</p>
                )}
            </div>
        </div>
    );
}
