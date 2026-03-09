"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Zap, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Official Credentials: linosadmin / linos01
        if (username === 'linosadmin' && password === 'linos01') {
            localStorage.setItem('linos_auth', 'authorized_relay_active');
            router.push('/admin');
        } else {
            setError('Authorization Failed: Security Protocol Rejected Credentials');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linos-gold/5 blur-[120px] -mr-64 -mt-64 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linos-gold/5 blur-[120px] -ml-64 -mb-64 rounded-full"></div>

            <div className="w-full max-w-md space-y-12 relative">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="relative w-20 h-20 bg-linos-gold rounded-full flex items-center justify-center p-4 shadow-2xl shadow-linos-gold/40">
                            <Image src="/logo.png" alt="Linos Logo" width={50} height={50} className="object-contain" />
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Authority <span className="text-linos-gold italic">Login</span></h1>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">LINOS E SECURITY • SECURE TERMINAL ACCESS</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-linos-gold transition-colors" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-linos-gold/30 transition-all font-display"
                                placeholder="Admin Identification"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-linos-gold transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-linos-gold/30 transition-all font-display"
                                placeholder="Security Passphrase"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-gold !py-6 flex items-center justify-center space-x-4 group shadow-2xl shadow-linos-gold/10"
                    >
                        <span className="uppercase tracking-[0.3em] font-bold text-xs">{loading ? 'Verifying...' : 'Initiate Session'}</span>
                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        {loading && <Zap className="w-4 h-4 animate-spin" />}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-white/10 text-[8px] font-bold uppercase tracking-[0.5em]">Warning: All access attempts are logged and monitored.</p>
                </div>
            </div>
        </div>
    );
}
