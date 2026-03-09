import React, { useState, useEffect } from 'react';
import { Save, Settings, Globe, Shield, Zap, Camera, Lock, Share2, Sparkles, TrendingUp, Info } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { cn } from '../../lib/utils';

export default function SiteSettings() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [settings, setSettings] = useState<any>({
        site_name: 'Linos E’ Security Ltd',
        site_description: 'Premium Security & Solar Automation in Abuja',
        contact_email: 'info@linosecurity.com.ng',
        whatsapp_number: '+2348000000000',
        meta_title_suffix: '| Linos E’ Security',
        google_analytics_id: '',
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
        linkedin_url: '',
        footer_text: '© 2026 Linos E’ Security Ltd. All rights reserved.',
    });

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length > 0) {
                    setSettings(data);
                }
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(null), 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-display font-bold text-white tracking-tight leading-none italic">
                            Site <span className="text-accent">Authority</span>
                        </h1>
                        <p className="text-white/40 text-lg font-medium">Global configurations for Linos E’ Security infrastructure.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="group flex items-center space-x-3 px-10 py-5 bg-accent text-primary font-bold rounded-[2rem] hover:bg-accent-hover transition-all shadow-2xl shadow-accent/10 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? <TrendingUp className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                        <span className="text-lg tracking-tight">{success ? 'Synchronized' : 'Save Config'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* General Branding */}
                        <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8 backdrop-blur-sm">
                            <h3 className="text-xl font-display font-bold text-white flex items-center space-x-4">
                                <div className="p-3 bg-accent rounded-2xl shadow-lg shadow-accent/20">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <span>Identity & Branding</span>
                            </h3>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Site Global Name</label>
                                        <input
                                            name="site_name"
                                            value={settings.site_name}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Global Meta Suffix</label>
                                        <input
                                            name="meta_title_suffix"
                                            value={settings.meta_title_suffix}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Meta Description (Global)</label>
                                    <textarea
                                        name="site_description"
                                        value={settings.site_description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Authority */}
                        <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8 backdrop-blur-sm">
                            <h3 className="text-xl font-display font-bold text-white flex items-center space-x-4">
                                <div className="p-3 bg-blue-500/20 rounded-2xl">
                                    <Share2 className="w-6 h-6 text-blue-400" />
                                </div>
                                <span>Social Authority</span>
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">WhatsApp Broadcast</label>
                                    <input
                                        name="whatsapp_number"
                                        value={settings.whatsapp_number}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Instagram Handle</label>
                                    <input
                                        name="instagram_url"
                                        value={settings.instagram_url}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Twitter (X) Profile</label>
                                    <input
                                        name="twitter_url"
                                        value={settings.twitter_url}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">LinkedIn Page</label>
                                    <input
                                        name="linkedin_url"
                                        value={settings.linkedin_url}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white/[0.05] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-8 sticky top-12">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center space-x-3">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                    <span>Search Engine Power</span>
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">GA4 Measurement ID</label>
                                        <input
                                            name="google_analytics_id"
                                            value={settings.google_analytics_id}
                                            onChange={handleChange}
                                            placeholder="G-XXXXXXXXXX"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs focus:border-accent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-accent/10 border border-accent/20 p-6 rounded-2xl flex items-start space-x-4">
                                <Info className="w-5 h-5 text-accent mt-1 shrink-0" />
                                <p className="text-accent/60 text-[10px] leading-relaxed">
                                    Changes made here reflect globally across the storefront, impacting canonical structures and metadata authority.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Sitemap Status</span>
                                    <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Automatic</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Robots Check</span>
                                    <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Optimized</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
