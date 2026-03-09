"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, CheckCircle2, ArrowRight, Cog, MessageCircle, PenTool, Calendar, Settings, ShieldCheck, Zap } from 'lucide-react';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';
import JsonLd, { generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

export default function ServiceDetail() {
    const params = useParams();
    const rawSlug = params.slug as string;
    const serviceName = rawSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Services', url: `${BUSINESS_DETAILS.website}/services` },
        { name: serviceName, url: `${BUSINESS_DETAILS.website}/services/${rawSlug}` }
    ];

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': serviceName,
        'provider': {
            '@type': 'Organization',
            'name': BUSINESS_DETAILS.name,
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': BUSINESS_DETAILS.address,
                'addressLocality': BUSINESS_DETAILS.city,
                'addressRegion': BUSINESS_DETAILS.state,
                'postalCode': BUSINESS_DETAILS.zip,
                'addressCountry': 'NG'
            }
        },
        'areaServed': 'Nigeria',
        'description': `Professional ${serviceName} service for residential and commercial properties. Authorized technical infrastructure deployment by Linos E Security.`
    };

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <JsonLd data={serviceSchema} />
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
                    <div className="w-full lg:w-3/5 space-y-10">
                        <div className="inline-flex items-center space-x-2 bg-linos-gold/10 px-4 py-2 border border-linos-gold/20">
                            <Shield className="w-4 h-4 text-linos-gold" />
                            <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.3em]">Engineering Protocol: {serviceName}</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-display font-bold text-white uppercase leading-tight">
                            {serviceName} <br /> <span className="text-linos-gold font-normal italic">Architecture</span>.
                        </h1>

                        <p className="text-white/40 text-lg leading-relaxed italic font-light">
                            Linos E Security provides elite technical execution for {serviceName}. We go beyond simple installation, designing redundant architectures that ensure your facility remains operational and secure under any conditions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/contact" className="btn-gold flex items-center justify-center">
                                <Calendar className="w-4 h-4 mr-2" /> Book Site Inspection
                            </Link>
                            <a
                                href={WHATSAPP_LINKS.serviceMessage(serviceName)}
                                className="btn-outline flex items-center justify-center space-x-3 group"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span>Get Custom Estimate</span>
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5">
                        <div className="aspect-[3/4] border border-white/5 bg-white/[0.01] relative p-1 group overflow-hidden">
                            <div className="w-full h-full border border-linos-gold/10 bg-linos-black flex items-center justify-center relative">
                                <Cog className="w-24 h-24 text-linos-gold/10 group-hover:rotate-180 transition-transform duration-[4000ms]" />
                                <div className="absolute inset-x-8 bottom-8 p-6 glass-panel border border-white/5 text-center">
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">System uptime guaranteed by Linos Technical Relay</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Process */}
                <div className="mb-32">
                    <h2 className="text-2xl font-display font-bold text-white mb-16 text-center uppercase tracking-[0.3em]">Execution <span className="text-linos-gold">Workflow</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { step: '01', title: 'Tactical Audit', desc: 'Full-spectrum risk assessment of the physical facility.', icon: PenTool },
                            { step: '02', title: 'Design Modeling', desc: 'Custom blueprinting for equipment placement and power paths.', icon: Zap },
                            { step: '03', title: 'Precision Install', desc: 'Military-grade deployment by certified field engineers.', icon: Settings },
                            { step: '04', title: 'Mission Support', desc: '24/7 technical relay and periodic system hardening.', icon: ShieldCheck }
                        ].map((item, i) => (
                            <div key={i} className="p-10 border border-white/10 bg-white/[0.02] relative group hover:bg-linos-gold/5 transition-all">
                                <span className="text-6xl font-display font-bold text-linos-gold/5 absolute -top-2 right-6 group-hover:text-linos-gold/10 transition-colors">{item.step}</span>
                                <item.icon className="w-8 h-8 text-linos-gold mb-8 italic" />
                                <h3 className="text-base font-bold text-white mb-6 uppercase tracking-widest">{item.title}</h3>
                                <p className="text-white/40 text-[10px] italic leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service FAQ */}
                <div className="mb-32">
                    <h2 className="text-2xl font-display font-bold text-white mb-16 text-center uppercase tracking-[0.3em]">Technical <span className="text-linos-gold">FAQ</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { q: "Is a site inspection required for an estimate?", a: "Yes, for professional security deployments, we require a tactical site audit to ensure the system architecture is optimized for your specific facility layout." },
                            { q: "What is the warranty on your installations?", a: "All professional installations carry a 24-month technical warranty and access to our priority technical relay service." },
                            { q: "Can you upgrade existing legacy systems?", a: "Precisely. Our engineering team specializes in modernizing existing systems with cloud-relay and AI-driven monitoring capabilities." },
                            { q: "Do you offer industrial-scale contracts?", a: "Linos E Security handles multi-site corporate and industrial infrastructure deployments across Nigeria's major commercial hubs." }
                        ].map((faq, i) => (
                            <div key={i} className="p-10 border border-white/5 bg-white/[0.01]">
                                <h4 className="text-white font-bold mb-4 uppercase tracking-[0.2em] text-xs">// Protocol Question</h4>
                                <p className="text-white text-sm font-bold mb-4 italic">{faq.q}</p>
                                <p className="text-white/30 text-xs leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Call to Order */}
                <div className="p-16 border border-linos-gold/30 bg-linos-gold/[0.03] text-center relative overflow-hidden">
                    <ShieldCheck className="w-64 h-64 text-linos-gold/[0.02] absolute -bottom-20 -right-20 rotate-12" />
                    <h2 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-widest">Ready for Deployment?</h2>
                    <p className="text-white/40 text-sm max-w-xl mx-auto italic mb-12">
                        Get the elite security infrastructure your facility deserves. Secure your technical survey today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/contact" className="btn-gold px-12 uppercase font-bold tracking-widest">Request Proposal</Link>
                        <a href={WHATSAPP_LINKS.serviceMessage(serviceName)} className="btn-outline px-12 uppercase font-bold tracking-widest">Quick WhatsApp Chat</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

