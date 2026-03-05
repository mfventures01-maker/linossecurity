import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../lib/useAuth';
import { cn } from '../../lib/utils';

export default function Sidebar() {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'All Posts', icon: FileText, path: '/admin/blog/posts' },
        { name: 'Create Post', icon: FileText, path: '/admin/blog/create' },
        { name: 'Site Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="w-80 bg-primary/95 backdrop-blur-xl border-r border-white/5 flex flex-col h-full overflow-hidden shadow-2xl">
            <div className="p-10">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="bg-accent p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20">
                        <LayoutDashboard className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-display font-bold text-white tracking-tight">LINOS ADMIN</span>
                        <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase opacity-70">Control Panel</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4 custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={cn(
                                "flex items-center justify-between group px-6 py-4 rounded-2xl transition-all duration-300 transform active:scale-95",
                                isActive
                                    ? "bg-accent text-primary font-bold shadow-xl shadow-accent/10 translate-x-1"
                                    : "text-white/50 hover:text-white hover:bg-white/5 hover:translate-x-1"
                            )}
                        >
                            <div className="flex items-center space-x-4">
                                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-accent/60 group-hover:text-accent group-hover:scale-110 transition-transform")} />
                                <span className="text-sm tracking-wide">{item.name}</span>
                            </div>
                            <ChevronRight className={cn("w-4 h-4 opacity-0 transition-all", isActive ? "opacity-100" : "group-hover:opacity-40")} />
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="flex items-center space-x-4 mb-8 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-primary font-bold text-lg shadow-inner shadow-white/20">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                        <span className="text-white font-bold text-sm truncate">{user?.username}</span>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Administrator</span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl text-red-400 font-bold text-sm border border-red-400/10 hover:bg-red-400/10 hover:border-red-400/30 transition-all transform active:scale-95 group"
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Secure Sign Out</span>
                </button>
            </div>
        </div>
    );
}
