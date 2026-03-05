import React from 'react';
import { useAuth } from '../../lib/useAuth';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex bg-primary min-h-screen font-sans selection:bg-accent selection:text-primary">
            <div className="sticky top-0 h-screen shrink-0">
                <Sidebar />
            </div>
            <main className="flex-1 overflow-y-auto px-12 py-12 custom-scrollbar">
                <div className="max-w-6xl mx-auto space-y-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
