import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (data.success) {
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -ml-48 -mb-48" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-accent rounded-2xl mb-6 shadow-lg shadow-accent/20">
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Linos Admin</h1>
                    <p className="text-white/60">Enter your credentials to manage the authority site.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-white/80 text-sm font-bold mb-2 ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="linos"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-bold mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full bg-accent hover:bg-accent-hover text-primary font-bold py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-accent/10",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-white/40 text-sm">
                    © {new Date().getFullYear()} Linos E’ Security Ltd. All rights reserved.
                </p>
            </div>
        </div>
    );
}
