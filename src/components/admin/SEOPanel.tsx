import React from 'react';
import { Sparkles, Layout, Activity, Search, Globe, Instagram, Twitter, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SEOPanel({ formData, handleChange, onAIUpdate }: { formData: any, handleChange: any, onAIUpdate?: (data: any) => void }) {
    const [loadingAI, setLoadingAI] = React.useState(false);

    const handleAIOptimize = async () => {
        if (!formData.title) return alert('Enter a title first');
        setLoadingAI(true);
        try {
            const res = await fetch('/api/ai/optimize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: formData.title, content: formData.content })
            });
            const data = await res.json();
            if (onAIUpdate) onAIUpdate(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Search Appearance */}
            <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-8 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-display font-bold text-white flex items-center space-x-4">
                        <div className="p-3 bg-accent rounded-2xl shadow-lg shadow-accent/20">
                            <Search className="w-6 h-6 text-primary" />
                        </div>
                        <span>Search Engine Health</span>
                    </h3>
                    <button
                        type="button"
                        onClick={handleAIOptimize}
                        disabled={loadingAI}
                        className="flex items-center space-x-2 text-accent hover:text-white transition-colors py-2 px-4 rounded-xl border border-accent/20 hover:bg-accent/20 bg-accent/5 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                        {loadingAI ? <TrendingUp className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        <span>AI Optimize Strategy</span>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">SEO Title (60 chars max)</label>
                            <span className={cn("text-[10px] font-bold", formData.meta_title?.length > 60 ? "text-red-400" : "text-accent")}>
                                {formData.meta_title?.length || 0} / 60
                            </span>
                        </div>
                        <input
                            name="meta_title"
                            value={formData.meta_title}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent transition-colors"
                            placeholder="Primary ranking title..."
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Meta Description (160 chars max)</label>
                            <span className={cn("text-[10px] font-bold", formData.meta_description?.length > 160 ? "text-red-400" : "text-accent")}>
                                {formData.meta_description?.length || 0} / 160
                            </span>
                        </div>
                        <textarea
                            name="meta_description"
                            value={formData.meta_description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors resize-none"
                            placeholder="Add compelling description for higher CTR..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Focus Keyword</label>
                            <input
                                name="focus_keyword"
                                value={formData.focus_keyword}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                                placeholder="Target phrase..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Canonical URL</label>
                            <input
                                name="canonical_url"
                                value={formData.canonical_url}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                                placeholder="Self-referencing default..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <input
                            type="checkbox"
                            id="robots_index"
                            name="robots_index"
                            checked={formData.robots_index}
                            onChange={handleChange}
                            className="w-5 h-5 accent-accent cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <label htmlFor="robots_index" className="text-white font-bold text-sm cursor-pointer">Index this post</label>
                            <span className="text-white/30 text-xs">Allow search engines to discover and rank this page.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media - Open Graph */}
            <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-8 backdrop-blur-sm">
                <h3 className="text-xl font-display font-bold text-white flex items-center space-x-4">
                    <div className="p-3 bg-accent/20 border border-accent/20 rounded-2xl">
                        <Globe className="w-6 h-6 text-accent" />
                    </div>
                    <span>Social Media Authority (OG)</span>
                </h3>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">OG Title</label>
                        <input
                            name="og_title"
                            value={formData.og_title}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                            placeholder="Catchy social title..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">OG Description</label>
                        <textarea
                            name="og_description"
                            value={formData.og_description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors resize-none"
                            placeholder="Catchy social snippet..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">OG Image URL</label>
                            <input
                                name="og_image"
                                value={formData.og_image}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Twitter Card</label>
                            <select
                                name="twitter_card"
                                value={formData.twitter_card}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                            >
                                <option value="summary">Summary</option>
                                <option value="summary_large_image">Summary Large Image</option>
                                <option value="app">App</option>
                                <option value="player">Player</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
