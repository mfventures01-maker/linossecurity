import React from 'react';
import { Code, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SchemaPreview({ formData, handleChange }: { formData: any, handleChange: any }) {
    const generateSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": formData.title,
            "image": formData.featured_image,
            "author": {
                "@type": "Person",
                "name": formData.author || "Linos Security"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Linos E’ Security Ltd",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://linosecurity.com.ng/logo.png"
                }
            },
            "datePublished": formData.publish_date,
            "dateModified": new Date().toISOString().split('T')[0],
            "description": formData.meta_description || formData.excerpt,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://linosecurity.com.ng/blog/${formData.slug}`
            }
        };

        handleChange({
            target: { name: 'schema_json', value: JSON.stringify(schema, null, 2) }
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl space-y-8 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-display font-bold text-white flex items-center space-x-4">
                        <div className="p-3 bg-blue-500/20 rounded-2xl">
                            <Code className="w-6 h-6 text-blue-400" />
                        </div>
                        <span>Structured Data (JSON-LD)</span>
                    </h3>
                    <button
                        type="button"
                        onClick={generateSchema}
                        className="flex items-center space-x-2 text-blue-400 hover:text-white transition-colors py-2 px-4 rounded-xl border border-blue-400/20 hover:bg-blue-400/20 bg-blue-400/5 text-xs font-bold"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Generate Default Schema</span>
                    </button>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl flex items-start space-x-4">
                    <Info className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                    <p className="text-blue-200/60 text-xs leading-relaxed">
                        Structured data helps search engines understand your content better. This JSON-LD will be injected directly into the head of your code on publish.
                    </p>
                </div>

                <div className="relative group">
                    <textarea
                        name="schema_json"
                        value={formData.schema_json}
                        onChange={handleChange}
                        className="w-full h-[500px] bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-blue-300 font-mono text-xs focus:border-blue-400 transition-all resize-none leading-relaxed custom-scrollbar shadow-inner"
                        placeholder='{ "@context": "https://schema.org", ... }'
                    />
                    <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Valid JSON Required</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
