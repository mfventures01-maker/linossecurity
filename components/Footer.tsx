import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { BUSINESS_DETAILS } from '@/config/business';

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-linos-gold/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 bg-linos-gold rounded-full flex items-center justify-center p-2 shadow-lg shadow-linos-gold/20 flex-shrink-0">
                                <Image src="/logo.png" alt="Linos Logo" width={30} height={30} className="object-contain" unoptimized />
                            </div>
                            <span className="text-xl font-display font-bold text-white tracking-widest leading-none">LINOS E</span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed">
                            {BUSINESS_DETAILS.name} — Nigeria’s trusted authority in security automation and technology infrastructure. Providing elite protection for corporate and residential assets.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-linos-gold hover:bg-white/10 transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-8 border-l-2 border-linos-gold pl-4 text-sm">Solutions</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Solar Power', slug: 'solar-power' },
                                { name: 'Access Control', slug: 'access-control' },
                                { name: 'CCTV Systems', slug: 'cctv' },
                                { name: 'Gate Automation', slug: 'gate-automation' },
                                { name: 'Smart Locks', slug: 'door-locks' }
                            ].map((item) => (
                                <li key={item.slug}>
                                    <Link href={`/category/${item.slug}`} className="text-white/40 hover:text-linos-gold text-sm transition-colors">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-8 border-l-2 border-linos-gold pl-4 text-sm">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Project Portfolio', 'Industries', 'Installation Packages', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="/contact" className="text-white/40 hover:text-linos-gold text-sm transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-8 border-l-2 border-linos-gold pl-4 text-sm">Contact Abuja</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-4">
                                <MapPin className="w-5 h-5 text-linos-gold shrink-0" />
                                <div className="space-y-2">
                                    <span className="text-white/40 text-sm leading-relaxed block">{BUSINESS_DETAILS.address}</span>
                                    <a href="https://maps.google.com/?q=21+Blantyre+Street,+Wuse+2,+Abuja" target="_blank" rel="noopener noreferrer" className="text-linos-gold text-[10px] font-bold uppercase tracking-widest hover:underline">Open in Google Maps</a>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-linos-gold shrink-0" />
                                <span className="text-white/40 text-sm">{BUSINESS_DETAILS.phone}</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Mail className="w-5 h-5 text-linos-gold shrink-0" />
                                <span className="text-white/40 text-sm lowercase">{BUSINESS_DETAILS.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
                        © 2026 LINOS E SECURITY LIMITED. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-white/20">
                            <ShieldCheck className="w-4 h-4 text-linos-gold" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Certified Security Infrastructure</span>
                        </div>

                        {/* Admin Portal Button */}
                        <Link
                            href="/admin"
                            className="flex items-center space-x-2 px-3 py-1.5 border border-white/5 rounded-full text-white/20 hover:text-linos-gold hover:border-linos-gold/30 transition-all duration-300 group"
                        >
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Admin Portal</span>
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
