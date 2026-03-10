"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SecurityConfigurator from '@/components/SecurityConfigurator';
import { Shield, Zap, Camera, Lock, ArrowRight, CheckCircle2, Star, ShieldAlert, Cpu } from 'lucide-react';

const specialties = [
  { name: 'Access Control', icon: Lock, desc: 'Biometric & Facial Recognition' },
  { name: 'CCTV Systems', icon: Camera, desc: '4K Smart AI Surveillance' },
  { name: 'Gate Automation', icon: Shield, desc: 'Heavy-duty Gate Operators' },
  { name: 'Solar Power', icon: Zap, desc: 'Hybrid Hybrid Backup Energy' },
];

export default function Home() {
  return (
    <div className="bg-linos-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Graphic Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linos-gold/5 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linos-gold/5 rounded-full blur-[100px] -ml-20 -mb-20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-linos-gold/10 border border-linos-gold/20 px-4 py-2 rounded-sm mb-8">
                <ShieldCheckIcon className="w-4 h-4 text-linos-gold" />
                <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.3em]">Official Security Infrastructure</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-8">
                Nigeria’s Trusted <br />
                <span className="text-linos-gold italic">Security Automation</span> <br />
                Installers.
              </h1>

              <p className="text-white/60 text-lg mb-10 max-w-xl leading-relaxed">
                Elite technology infrastructure for premium assets. We engineer reliability into every luxury home and commercial facility across the FCT and nationwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/contact" className="btn-gold flex items-center justify-center group">
                  Get Installation Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#inspection" className="btn-outline flex items-center justify-center">
                  Book Site Inspection
                </Link>
              </div>

              <div className="mt-16 flex items-center space-x-12 p-8 glass-panel border-white/5 rounded-sm">
                <div>
                  <span className="block text-2xl font-bold text-white uppercase">500+</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Deployments</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="block text-2xl font-bold text-white uppercase">24/7</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Live Support</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="block text-2xl font-bold text-white uppercase">100%</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Compliance</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-sm overflow-hidden border border-linos-gold/20 aspect-[4/5] bg-[#0A0A0A] group">
                <Image
                  src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=2070&auto=format&fit=crop"
                  alt="Security Integration"
                  fill
                  className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-linos-black via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 p-8 glass-panel rounded-sm">
                  <div className="flex items-center space-x-4">
                    <div className="bg-linos-gold p-3 rounded-full">
                      <Cpu className="w-6 h-6 text-linos-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-wider text-sm">Industrial Integration</h4>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Linos Tech Infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-linos-gold/20 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-linos-gold flex items-center justify-center p-4">
                <Shield className="w-full h-full text-linos-black" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialty Grid */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Execution <span className="text-linos-gold">Excellence</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">A comprehensive suite of security and power automation systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 border border-white/5 bg-white/[0.02] hover:bg-linos-gold/10 hover:border-linos-gold/30 transition-all group"
              >
                <item.icon className="w-12 h-12 text-linos-gold mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{item.name}</h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed italic">{item.desc}</p>
                <Link href="/services" className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.2em] flex items-center hover:translate-x-2 transition-transform">
                  Explore Service <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SecurityConfigurator />

      {/* Blog Intelligence Section */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-6">
            <div className="flex justify-center items-center space-x-2">
              <Shield className="w-4 h-4 text-linos-gold" />
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.4em]">Expert Intelligence Hub</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">Technical <span className="text-linos-gold italic underline decoration-white/10">Insights</span>.</h2>
            <p className="text-white/30 max-w-2xl mx-auto text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">Stay updated with the latest in security automation, energy autonomy, and facility management.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Surveillance AI', href: '/category/cctv-cameras' },
              { name: 'Access Mastery', href: '/category/access-control-systems' },
              { name: 'Energy Autonomy', href: '/category/solar-power-systems' },
              { name: 'Gate Protocols', href: '/category/gate-automation' },
              { name: 'Smart Defense', href: '/category/smart-door-locks' },
              { name: 'Site Strategy', href: '/blog' },
            ].map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={topic.href}
                  className="block w-full py-8 border border-white/5 bg-white/[0.02] text-center hover:bg-linos-gold hover:text-linos-black transition-all duration-500 rounded-sm relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 transition-colors duration-500">{topic.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link href="/blog" className="group flex items-center space-x-4 text-white/30 hover:text-linos-gold transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Enter Intelligence Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-32 bg-linos-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                Ready to Secure Your <br /> <span className="text-linos-gold italic underline decoration-white/10">Property</span>?
              </h2>

              <ul className="space-y-8">
                {[
                  'Free technical site survey in Abuja & Lagos',
                  'Official 2-year Linos hardware warranty',
                  'Certified military-grade installations',
                  '24/7 technical relay & support'
                ].map((text, i) => (
                  <li key={i} className="flex items-center space-x-6 group">
                    <div className="w-10 h-10 bg-linos-gold flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-linos-black" />
                    </div>
                    <span className="text-white font-bold uppercase tracking-widest text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <Link href="/contact" className="btn-gold !px-12">
                  Request Technical Design
                </Link>
                <a href="https://wa.me/2348000000000" className="btn-outline flex items-center justify-center px-10">
                  WhatsApp Engineer
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square border border-linos-gold/20 p-4">
                <div className="w-full h-full border border-linos-gold/40 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
                    alt="Linos Execution"
                    fill
                    className="object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="absolute -top-10 -right-10 bg-linos-gold text-linos-black p-10 font-bold uppercase tracking-tighter text-4xl transform rotate-3 shadow-2xl">
                ELITE <br /> ONLY
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
