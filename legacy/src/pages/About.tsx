import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, Award, CheckCircle2, Zap, Camera, Lock } from 'lucide-react';

const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Projects Completed', value: '500+' },
    { label: 'Technical Experts', value: '25+' },
    { label: 'Client Satisfaction', value: '100%' },
];

const values = [
    {
        title: 'Uncompromising Security',
        desc: 'We believe security is a right, not a luxury. Our systems are engineered to withstand the toughest local conditions.',
        icon: Shield
    },
    {
        title: 'Innovative Excellence',
        desc: 'Static security is obsolete. We deploy the latest AI-driven surveillance and smart automation technologies.',
        icon: Target
    },
    {
        title: 'Local Expertise',
        desc: 'Deeply rooted in Abuja, we understand the specific power and security challenges of the Nigerian landscape.',
        icon: Users
    }
];

export default function About() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-32 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/hero/hero-1.png"
                        alt="About Linos"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                            Pioneering <span className="text-accent">Security</span> <br />
                            Infrastructure in Nigeria
                        </h1>
                        <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                            Linos E’ Security Ltd is Abuja’s premier authority in luxury solar automation and high-end security systems. We combine global technology with local precision.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display font-bold text-primary mb-8 leading-tight">
                                Our Mission is to Secure <br /> Your <span className="text-accent">Future</span>
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Founded on the principles of reliability and technical excellence, Linos E’ Security Ltd has grown from a specialized installation team into a full-scale security architecture firm.
                                </p>
                                <p>
                                    We don't just sell products; we engineer ecosystems. From the moment we conduct a site survey in Maitama or Asokoro, our focus is on creating a seamless, automated environment where power is constant and security is absolute.
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-8">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-400 uppercase font-bold tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=1000"
                                    alt="Linos Execution"
                                    className="w-full aspect-[4/5] object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 bg-accent p-10 rounded-[2rem] shadow-2xl hidden md:block">
                                <Award className="w-12 h-12 text-primary mb-4" />
                                <h4 className="text-primary font-bold text-lg">ISO Certified</h4>
                                <p className="text-primary/60 text-sm">Security Protocols</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-32 bg-primary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-display font-bold text-white mb-4">Values That Drive Us</h2>
                        <p className="text-white/40 max-w-2xl mx-auto">The pillars of our operations and the promise we keep to our clients.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-colors group"
                            >
                                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <value.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                                <p className="text-white/40 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checklist */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-display font-bold text-primary mb-8">What Sets Us Apart?</h2>
                                <div className="space-y-6">
                                    {[
                                        'In-house expert engineering team (No sub-contracting)',
                                        'Real-time mobile monitoring integration for all systems',
                                        'Proactive maintenance alerts and 24/7 technical relay',
                                        'Deep customization for Abuja’s fluctuating power grid',
                                        'Premium warranty on all high-voltage components'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center space-x-4">
                                            <div className="bg-green-500/10 p-1 rounded-full">
                                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-40 bg-accent/20 rounded-3xl flex items-center justify-center">
                                        <Zap className="w-12 h-12 text-accent" />
                                    </div>
                                    <div className="h-60 bg-primary rounded-3xl overflow-hidden">
                                        <img src="https://i.postimg.cc/QdTMzQvh/5kva_setup.jpg" className="w-full h-full object-cover opacity-60" />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="h-60 bg-gray-200 rounded-3xl overflow-hidden">
                                        <img src="https://i.postimg.cc/CLqP2YQV/swing-turnstile.jpg" className="w-full h-full object-cover opacity-60" />
                                    </div>
                                    <div className="h-40 bg-accent rounded-3xl flex items-center justify-center">
                                        <Lock className="w-12 h-12 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
