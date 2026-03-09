import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Layout, Search, Image as ImageIcon, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Code, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import AdminLayout from '../../components/admin/AdminLayout.tsx';
import SEOPanel from '../../components/admin/SEOPanel.tsx';
import SchemaPreview from '../../components/admin/SchemaPreview.tsx';
import ImageUpload from '../../components/admin/ImageUpload.tsx';
import SEOColorChecklist from '../../components/admin/SEOScoring.tsx';
import InternalLinkingAssistant from '../../components/admin/InternalLinkingAssistant.tsx';
import slugify from 'slugify';

export default function BlogEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'schema'>('content');
    const [showPreview, setShowPreview] = useState(false);

    // Form State
    const [formData, setFormData] = useState<any>({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featured_image: '',
        category: 'Solar Power',
        tags: '',
        author: 'Linos Security',
        publish_date: new Date().toISOString().split('T')[0],
        status: 'draft',
        meta_title: '',
        meta_description: '',
        focus_keyword: '',
        canonical_url: '',
        robots_index: true,
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_card: 'summary_large_image',
        schema_json: ''
    });

    useEffect(() => {
        if (id && id !== 'create') {
            fetch(`/api/posts/${id}`) // Note: Assuming slug or id here depending on how we route
                .then(res => res.json())
                .then(data => setFormData({
                    ...data,
                    robots_index: !!data.robots_index,
                    publish_date: data.publish_date ? new Date(data.publish_date).toISOString().split('T')[0] : ''
                }));
        } else {
            const saved = localStorage.getItem('blog_draft');
            if (saved) {
                setFormData(JSON.parse(saved));
            }
        }
    }, [id]);

    // Autosave logic
    useEffect(() => {
        if (id === 'create') {
            const timer = setTimeout(() => {
                localStorage.setItem('blog_draft', JSON.stringify(formData));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [formData, id]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const updated = { ...prev, [name]: val };
            if (name === 'title' && !id) {
                updated.slug = slugify(value, { lower: true, strict: true });
                updated.meta_title = value.substring(0, 60);
            }
            return updated;
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Auto-generate schema if empty
        let finalSchema = formData.schema_json;
        if (!finalSchema) {
            finalSchema = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": formData.title,
                "image": formData.featured_image,
                "author": { "@type": "Organization", "name": "Linos E’ Security" },
                "publisher": { "@type": "Organization", "name": "Linos E’ Security" },
                "datePublished": formData.publish_date,
                "description": formData.meta_description
            }, null, 2);
        }

        try {
            const url = id && id !== 'create' ? `/api/posts/${formData.id}` : '/api/posts';
            const method = id && id !== 'create' ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, schema_json: finalSchema }),
            });

            if (res.ok) {
                navigate('/admin/blog/posts');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/admin/blog/posts"
                            className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:-translate-x-1 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-accent" />
                        </Link>
                        <div>
                            <div className="flex items-center space-x-3 mb-1">
                                <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                                    {id === 'create' ? 'Create Masterpiece' : 'Edit Post'}
                                </h1>
                                <span className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                                    formData.status === 'published' ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                )}>
                                    {formData.status}
                                </span>
                            </div>
                            <p className="text-white/40 text-sm">Write an authority blog post that ranks #1 in Abuja.</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-4 bg-white/5 border border-white/5 text-white/80 font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95"
                        >
                            <Eye className="w-5 h-5" />
                            <span>Preview</span>
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-10 py-4 bg-accent text-primary font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-xl shadow-accent/10 active:scale-95"
                        >
                            {loading ? <TrendingUp className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>{id === 'create' ? 'Publish Now' : 'Sync Changes'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* Tabs */}
                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                            {[
                                { id: 'content', label: 'Editor', icon: Layout },
                                { id: 'seo', label: 'SEO Authority', icon: Sparkles },
                                { id: 'schema', label: 'Structured Data', icon: Code },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "flex-1 flex items-center justify-center space-x-3 py-3 rounded-xl text-sm font-bold transition-all",
                                        activeTab === tab.id
                                            ? "bg-white text-primary shadow-lg scale-[1.02]"
                                            : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {activeTab === 'content' && (
                            <div className="space-y-10">
                                {/* Main Details */}
                                <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-8 backdrop-blur-sm">
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Authority Title (H1)</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-0 border-b border-white/10 text-4xl font-display font-bold text-white focus:outline-none focus:border-accent py-4 placeholder:text-white/10"
                                            placeholder="e.g. 5 Best Solar Inverters for Abuja Estates"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">URL Slug</label>
                                            <input
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                                                placeholder="best-solar-inverters-abuja"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent transition-colors"
                                            >
                                                <option value="Solar Power">Solar Power</option>
                                                <option value="CCTV Systems">CCTV Systems</option>
                                                <option value="Access Control">Access Control</option>
                                                <option value="Gate Automation">Gate Automation</option>
                                                <option value="Security Tips">Security Tips</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Editor */}
                                <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Post content (HTML Supported)</label>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded">Alt+Shift+F to format</span>
                                        </div>
                                    </div>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        className="w-full h-[600px] bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-white/90 font-mono text-sm focus:border-accent transition-all resize-none leading-relaxed custom-scrollbar"
                                        placeholder="<p>Start your ranking journey here...</p>"
                                    />
                                    <div className="flex justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                                        <span>Word Count: {formData.content.trim().split(/\s+/).length}</span>
                                        <span>Supports HTML & Structured Blocks</span>
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-4">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Meta Excerpt / Lead Paragraph</label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                        maxLength={250}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-white text-sm focus:border-accent min-h-[120px] resize-none"
                                        placeholder="Short summary for search results and cards..."
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'seo' && (
                            <SEOPanel
                                formData={formData}
                                handleChange={handleChange}
                                onAIUpdate={(data: any) => setFormData({ ...formData, ...data })}
                            />
                        )}

                        {activeTab === 'schema' && (
                            <SchemaPreview formData={formData} handleChange={handleChange} />
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                        {/* Publish Settings */}
                        <div className="bg-white/[0.05] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-8 sticky top-12">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center space-x-3">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                    <span>Ranking Health</span>
                                </h3>

                                <SEOColorChecklist formData={formData} />
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <h3 className="text-lg font-bold text-white flex items-center space-x-3">
                                    <ImageIcon className="w-5 h-5 text-accent" />
                                    <span>Featured Asset</span>
                                </h3>

                                <ImageUpload
                                    value={formData.featured_image}
                                    onChange={(url: string) => setFormData({ ...formData, featured_image: url, og_image: url })}
                                />
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <h3 className="text-lg font-bold text-white flex items-center space-x-3">
                                    <LinkIcon className="w-5 h-5 text-accent" />
                                    <span>Internal Linking</span>
                                </h3>
                                <InternalLinkingAssistant />
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="space-y-4">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest block ml-1">Visibility</label>
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                                        <button
                                            onClick={() => setFormData({ ...formData, status: 'draft' })}
                                            className={cn("flex-1 py-3 text-xs font-bold rounded-lg transition-all", formData.status === 'draft' ? "bg-accent text-primary" : "text-white/40 hover:text-white/60")}
                                        >
                                            Draft
                                        </button>
                                        <button
                                            onClick={() => setFormData({ ...formData, status: 'published' })}
                                            className={cn("flex-1 py-3 text-xs font-bold rounded-lg transition-all", formData.status === 'published' ? "bg-green-500 text-white" : "text-white/40 hover:text-white/60")}
                                        >
                                            Publish
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest block ml-1">Publish Date</label>
                                    <input
                                        type="date"
                                        name="publish_date"
                                        value={formData.publish_date}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-white/40 text-xs font-bold uppercase tracking-widest block ml-1">Author Override</label>
                                    <input
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-accent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPreview && (
                <div className="fixed inset-0 z-50 bg-primary/95 flex flex-col p-10 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-display font-bold text-white">Live Search Preview</h2>
                        <button
                            onClick={() => setShowPreview(false)}
                            className="p-4 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all font-bold"
                        >
                            Exit Preview
                        </button>
                    </div>
                    <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl p-12 overflow-y-auto custom-scrollbar-light shadow-2xl">
                        <p className="text-[#1a0dab] text-xl font-medium mb-1 truncate">{formData.meta_title || formData.title}</p>
                        <p className="text-[#006621] text-sm mb-2 truncate">linosecurity.com.ng › blog › {formData.slug}</p>
                        <p className="text-[#4d5156] text-sm leading-relaxed mb-8">
                            <span className="text-gray-400">{new Date(formData.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — </span>
                            {formData.meta_description || formData.excerpt || 'No description provided.'}
                        </p>

                        <hr className="my-10 border-gray-100" />

                        <article className="prose prose-lg prose-slate max-w-none">
                            <h1 className="text-primary font-display font-bold text-4xl mb-6">{formData.title}</h1>
                            {formData.featured_image && (
                                <img src={formData.featured_image} alt={formData.title} className="w-full rounded-2xl mb-8 shadow-lg" />
                            )}
                            <div
                                className="text-gray-600 leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: formData.content }}
                            />
                        </article>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
