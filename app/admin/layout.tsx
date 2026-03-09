"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, LayoutDashboard, FileText, ShoppingBag, Settings, LogOut, Search } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const isLoginPage = pathname === '/admin/login';
        const auth = localStorage.getItem('linos_auth');

        if (!auth && !isLoginPage) {
            router.push('/admin/login');
        } else {
            setAuthorized(true);
        }
    }, [pathname, router]);

    // Handle Login page specifically (don't wrap in admin layout UI if on login page)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!authorized) return <div className="min-h-screen bg-linos-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-linos-gold border-t-transparent rounded-full animate-spin"></div>
    </div>;
    const signOut = () => {
        localStorage.removeItem('linos_auth');
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 flex flex-col pt-10 px-6 fixed h-full bg-black/50 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-12 px-2">
                    <div className="w-8 h-8 bg-linos-gold rounded-full flex items-center justify-center p-1.5 shadow-lg shadow-linos-gold/20">
                        <Shield className="w-full h-full text-linos-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-display font-bold text-white tracking-widest leading-none uppercase">LINOS HQ</span>
                        <span className="text-[7px] font-bold text-linos-gold uppercase tracking-[0.3em] mt-1">Authority Terminal</span>
                    </div>
                </div>

                <nav className="flex-grow space-y-2">
                    {[
                        { name: 'Intelligence Feed', icon: LayoutDashboard, href: '/admin' },
                        { name: 'Blog Posts', icon: FileText, href: '/admin/blog' },
                        { name: 'Asset Catalog', icon: ShoppingBag, href: '/admin/shop' },
                        { name: 'Site Protocols', icon: Settings, href: '/admin/settings' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group"
                        >
                            <item.icon className="w-4 h-4 group-hover:text-linos-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="pb-10 px-4">
                    <button
                        onClick={signOut}
                        className="flex items-center space-x-4 text-white/20 hover:text-red-500 transition-all w-full text-left"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Decommission</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-12">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-linos-gold transition-colors" />
                        <input
                            type="text"
                            placeholder="Search technical assets..."
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs text-white placeholder:text-white/10 focus:outline-none focus:border-linos-gold/30 transition-all font-display"
                        />
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Admin Authorization</span>
                            <span className="text-[8px] text-linos-gold font-bold uppercase tracking-[0.3em]">Technical Lead</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-linos-gold/20" />
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
