"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Zap, Camera, Lock, ArrowRight, CheckCircle2, Monitor, DoorClosed, AlertTriangle } from 'lucide-react';
import WorkSlider from '@/components/WorkSlider';

const services = [
    {
        title: 'Access Control Installation',
        slug: 'access-control-installation',
        icon: Lock,
        desc: 'High-precision biometric and facial recognition systems for corporate headquarters and luxury villas.',
        features: ['Facial Recognition', 'Fingerprint Terminals', 'Card Readers', 'Cloud Management']
    },
    {
        title: 'CCTV Surveillance Systems',
        slug: 'cctv-installation',
        icon: Camera,
        desc: 'AI-powered 4K surveillance networks with remote mobile monitoring and threat detection.',
        features: ['4K Resolutions', 'Night Vision x30', 'AI Detection', 'Remote Storage']
    },
    {
        title: 'Automatic Gate Automation',
        slug: 'automatic-gate-installation',
        icon: Shield,
        desc: 'Heavy-duty gate motors and smart operators for residential and high-security sites.',
        features: ['Sliding Motors', 'Swing Operators', 'GSM Control', 'Safety Sensors']
    },
    {
        title: 'Solar Power Systems',
        slug: 'solar-power-installation',
        icon: Zap,
        desc: 'Hybrid and off-grid solar solutions engineered for Abuja’s power dynamics.',
        features: ['Lithium Storage', 'Hybrid Inverters', 'Smart Monitoring', 'Grade-A Panels']
    },
    {
        title: 'Turnstile & Barrier Gates',
        slug: 'turnstile-installation',
        icon: Monitor,
        desc: 'High-speed pedestrian control and traffic management barriers.',
        features: ['Glass Barriers', 'Tripod Turnstiles', 'Parking Barriers', 'RFID Sync']
    },
    {
        title: 'Smart Home Automation',
        slug: 'smart-home-installation',
        icon: DoorClosed,
        desc: 'Integrated control for lighting, climate, and security via unified interfaces.',
        features: ['Voice Control', 'Smart Lighting', 'App Integration', 'Unified Security']
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-linos-black pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">Infrastructure <span className="text-linos-gold">Solutions</span></h1>
                    <p className="text-white/40 max-w-3xl mx-auto text-lg leading-relaxed italic">
                        Linos E Security provides mission-critical technology installations designed for reliability, authority, and longevity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-10 border border-white/5 bg-white/[0.01] hover:bg-linos-gold/5 hover:border-linos-gold/20 transition-all flex flex-col h-full"
                        >
                            <div className="w-16 h-16 bg-linos-gold flex items-center justify-center p-4 mb-10 group-hover:scale-110 transition-transform">
                                <service.icon className="w-full h-full text-linos-black" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">{service.title}</h3>
                            <p className="text-white/40 text-sm mb-10 min-h-[60px] leading-relaxed italic">{service.desc}</p>

                            <div className="space-y-4 mb-12 flex-grow">
                                {service.features.map((feature, j) => (
                                    <div key={j} className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 bg-linos-gold rounded-full" />
                                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={`/services/${service.slug}`}
                                className="w-full btn-outline flex items-center justify-center space-x-3 text-xs"
                            >
                                <span>View Engineering Specs</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-32">
                <WorkSlider />
            </div>

            {/* Expertise Section */}
            <section className="mt-40 bg-linos-gold py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-16 items-center">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-linos-black mb-8 leading-tight">
                                Military Precision. <br /> Corporate Security. <br /> <span className="text-white">Built for Nigeria.</span>
                            </h2>
                        </div>
                        <div>
                            <Link href="/contact" className="w-full bg-linos-black text-linos-gold px-10 py-6 font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors flex items-center justify-center">
                                Request site survey
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
