import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, CheckCircle2, TrendingUp, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ImageUpload({ value, onChange }: { value: string, onChange: (url: string) => void }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInput, setUrlInput] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.url) {
                onChange(data.url);
            } else {
                setError(data.error || 'Upload failed');
            }
        } catch (err) {
            setError('An error occurred during upload.');
        } finally {
            setUploading(false);
        }
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (urlInput) {
            onChange(urlInput);
            setShowUrlInput(false);
            setUrlInput('');
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative group">
                {value ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent/40 transition-colors shadow-xl">
                        <img src={value} alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                            <button
                                onClick={() => onChange('')}
                                className="p-3 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-all transform active:scale-95"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="absolute top-4 right-4 bg-accent text-primary p-2 rounded-xl shadow-lg">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </div>
                ) : (
                    <div className="aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center p-8 text-center group-hover:border-accent/40 hover:bg-white/[0.08] transition-all cursor-pointer relative overflow-hidden">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            disabled={uploading}
                        />

                        {uploading ? (
                            <>
                                <TrendingUp className="w-12 h-12 text-accent animate-spin mb-4" />
                                <p className="text-white font-bold text-sm tracking-wide">Compressing & Uploading...</p>
                                <p className="text-white/40 text-xs mt-2 font-medium uppercase tracking-[0.2em]">Converting to WebP</p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-accent" />
                                </div>
                                <p className="text-white font-bold text-sm tracking-wide">Drop featured asset here</p>
                                <p className="text-white/40 text-[10px] mt-2 font-bold uppercase tracking-[0.2em]">Max 10MB • JPG, PNG, WEBP</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between gap-4">
                {!value && (
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-xs font-bold hover:bg-white/10 transition-all active:scale-95"
                    >
                        <LinkIcon className="w-4 h-4" />
                        <span>{showUrlInput ? 'Back to Upload' : 'Use External URL'}</span>
                    </button>
                )}
            </div>

            {showUrlInput && !value && (
                <form onSubmit={handleUrlSubmit} className="animate-in slide-in-from-top-2 duration-300">
                    <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-accent transition-colors">
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="flex-1 bg-transparent px-4 py-3 text-white text-xs outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-accent px-4 py-3 text-primary font-bold text-xs hover:bg-accent-hover transition-colors"
                        >
                            Fetch
                        </button>
                    </div>
                </form>
            )}

            {error && (
                <div className="flex items-center space-x-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 text-xs font-bold animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
