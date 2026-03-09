"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Shield, CheckCircle2, ArrowRight, Phone, MessageSquare, ShieldCheck, Zap, Target } from 'lucide-react';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';
import JsonLd, { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

export default function LocationPage() {
    const params = useParams();
    const rawCity = params.city as string;
    const city = rawCity.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Locations', url: `${BUSINESS_DETAILS.website}/locations` },
        { name: city, url: `${BUSINESS_DETAILS.website}/locations/${rawCity}` }
    ];

    const localSchema = generateLocalBusinessSchema({
        ...BUSINESS_DETAILS,
        city: city,
        name: `${BUSINESS_DETAILS.name} - ${city} Regional Office`
    });

    return (
        <div className="bg-linos-black pt-40 pb-20">
            <JsonLd data={localSchema} />
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                    <div className="w-full lg:w-3/5 space-y-10">
                        <div className="inline-flex items-center space-x-2 bg-linos-gold/10 px-4 py-2 border border-linos-gold/20">
                            <MapPin className="w-4 h-4 text-linos-gold" />
                            <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.3em]">Authorized Deployment Hub: {city}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-tight">
                            Security <span className="text-linos-gold font-normal italic">Domination</span> <br /> in {city}.
                        </h1>

                        <p className="text-white/40 text-lg leading-relaxed italic">
                            Linos E Security deploys precision-engineered technical infrastructure for the {city} elite. Our systems meet international safety compliance while addressing the specific local volatility and environmental challenges of the {city} region.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                            <div className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-linos-gold" />
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Regional Line</p>
                                    <p className="text-white font-bold">{BUSINESS_DETAILS.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MessageSquare className="w-5 h-5 text-linos-gold" />
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest">WhatsApp Relay</p>
                                    <p className="text-white font-bold">Priority Channel</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <a
                                href={WHATSAPP_LINKS.locationMessage(city)}
                                className="btn-gold flex items-center justify-center"
                            >
                                <Zap className="w-4 h-4 mr-2" /> Request {city} Site Audit
                            </a>
                            <Link href="/services" className="btn-outline">
                                View Service Protocol
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/5">
                        <div className="aspect-[4/5] border border-white/10 bg-white/[0.02] relative p-1">
                            <div className="w-full h-full border border-linos-gold/20 bg-linos-black overflow-hidden relative">
                                <iframe
                                    src={BUSINESS_DETAILS.googleMapsEmbed}
                                    className="w-full h-full grayscale invert opacity-50 contrast-125"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-linos-black/90 backdrop-blur-md border-t border-linos-gold/20">
                                    <p className="text-[10px] text-linos-gold font-bold uppercase tracking-widest mb-2">Regional Address</p>
                                    <p className="text-white text-xs italic">{BUSINESS_DETAILS.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
                    {[
                        { title: '4K CCTV Networks', desc: `Ultra-high-definition surveillance grid deployment for ${city} commercial complexes.`, icon: ShieldCheck },
                        { title: 'Estate Automation', desc: `Seamless biometric turnstile and gate control systems for luxury gated communities in ${city}.`, icon: Zap },
                        { title: 'Solar Autonomy', desc: `Hybrid inverter infrastructure providing zero-downtime power for critical security operations in ${city}.`, icon: Target }
                    ].map((service, i) => (
                        <div key={i} className="p-10 border border-white/5 bg-white/[0.01] hover:bg-linos-gold/5 transition-all group">
                            <service.icon className="w-10 h-10 text-linos-gold mb-10 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">{service.title}</h3>
                            <p className="text-white/40 text-sm italic mb-10 leading-relaxed font-light">{service.desc}</p>
                            <Link href="/services" className="text-linos-gold text-[10px] font-bold uppercase tracking-widest flex items-center hover:translate-x-2 transition-all">
                                Technical Specs <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mb-32">
                    <h2 className="text-3xl font-display font-bold text-white mb-16 text-center uppercase tracking-[0.2em]">Service <span className="text-linos-gold">FAQ</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { q: `Do you provide site surveys in ${city}?`, a: "Yes, our technical team provides same-day site audits for verified residential and commercial properties within the metropolitan area." },
                            { q: "What is the typical installation timeline?", a: "Standard CCTV and Gate systems are deployed within 48-72 hours post-audit. Large industrial solar grids vary by capacity." },
                            { q: "Are your systems remote-capable?", a: "Every Linos deployment includes encrypted mobile relay, allowing you to monitor and control your system from anywhere in the world." },
                            { q: `Is maintenance available locally in ${city}?`, a: `We maintain a dedicated relay team in ${city} for 24/7 technical support and periodic system maintenance.` }
                        ].map((faq, i) => (
                            <div key={i} className="p-8 border border-white/5 bg-white/[0.02]">
                                <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm italic">Q: {faq.q}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Local Trust */}
                <div className="p-12 glass-panel border border-linos-gold/20 text-center bg-linos-gold/[0.03]">
                    <h2 className="text-3xl font-display font-bold text-white mb-8">Deploy Peak Security in <span className="text-linos-gold">{city}</span>.</h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-sm mb-12 italic leading-relaxed">
                        Authorized by Linos E Security Ltd. Nigeria. Our regional engineering hub in {city} is ready for immediate infrastructure deployment.
                    </p>
                    <a href={WHATSAPP_LINKS.locationMessage(city)} className="btn-gold px-12 inline-flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" /> Connect with {city} Technical Lead
                    </a>
                </div>
            </div>
        </div>
    );
}

