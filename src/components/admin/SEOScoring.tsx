import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SEOScoring({ formData }: { formData: any }) {
    const checks = [
        {
            label: 'Focus keyword in title',
            valid: formData.title.toLowerCase().includes((formData.focus_keyword || '').toLowerCase()) && !!formData.focus_keyword,
            weight: 15
        },
        {
            label: 'Keyword in first 100 words',
            valid: formData.content.substring(0, 500).toLowerCase().includes((formData.focus_keyword || '').toLowerCase()) && !!formData.focus_keyword,
            weight: 15
        },
        {
            label: 'Meta description length (120-160)',
            valid: formData.meta_description?.length >= 120 && formData.meta_description?.length <= 160,
            weight: 10
        },
        {
            label: 'Featured image exists',
            valid: !!formData.featured_image,
            weight: 10
        },
        {
            label: 'Alt text included (in HTML)',
            valid: formData.content.includes('alt="'),
            weight: 10
        },
        {
            label: 'Internal linking suggested',
            valid: formData.content.includes('<a href="/'),
            weight: 10
        },
        {
            label: 'Word count (min 1200)',
            valid: formData.content.trim().split(/\s+/).length >= 1200,
            weight: 20
        },
        {
            label: 'Structured data valid JSON',
            valid: (() => { try { JSON.parse(formData.schema_json || '{}'); return !!formData.schema_json; } catch (e) { return false; } })(),
            weight: 10
        }
    ];

    const score = checks.reduce((acc, curr) => acc + (curr.valid ? curr.weight : 0), 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative h-40 bg-white/5 rounded-3xl border border-white/10 overflow-hidden group shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 z-10 transition-transform duration-700 group-hover:scale-105">
                    <div className="flex items-end space-x-1">
                        <span className={cn("text-6xl font-display font-bold transition-colors", score > 80 ? "text-green-400" : score > 50 ? "text-accent" : "text-red-400")}>
                            {score}
                        </span>
                        <span className="text-white/20 text-xl font-bold mb-2">%</span>
                    </div>
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-[0.3em]">SEO Ranking Potential</span>
                </div>
                <div className="absolute top-4 right-4 animate-pulse">
                    <Sparkles className="w-5 h-5 text-accent opacity-50" />
                </div>
            </div>

            <div className="space-y-4 p-8 bg-white/[0.02] rounded-3xl border border-white/5 backdrop-blur-sm">
                {checks.map((check, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center space-x-4">
                            <div className={cn(
                                "w-2 h-2 rounded-full shadow-lg transition-colors",
                                check.valid ? "bg-green-400 shadow-green-400/20 scale-110" : "bg-white/10"
                            )} />
                            <span className={cn(
                                "text-xs font-bold transition-colors",
                                check.valid ? "text-white/80" : "text-white/20 group-hover:text-white/40"
                            )}>
                                {check.label}
                            </span>
                        </div>
                        {check.valid ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400 opacity-60" />
                        ) : (
                            <AlertCircle className="w-4 h-4 text-white/5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl flex items-start space-x-4 shadow-xl">
                <TrendingUp className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div className="space-y-1">
                    <p className="text-white font-bold text-xs">Authority Insight</p>
                    <p className="text-accent/60 text-[10px] leading-relaxed">
                        {score < 50 ? "Critical SEO improvements required for first-page ranking in Abuja." :
                            score < 80 ? "On the right track. Optimize word count and keywords further." :
                                "Masterpiece detected. Ready to dominate Search Console."}
                    </p>
                </div>
            </div>
        </div>
    );
}
