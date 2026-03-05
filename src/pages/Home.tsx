import React from 'react';
import { motion } from 'motion/react';
import { Zap, Camera, Lock, Shield, ArrowRight, Star, CheckCircle2, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = [
  { name: 'Solar Power', slug: 'solar', icon: Zap, count: 9, desc: 'Hybrid & Off-grid systems' },
  { name: 'CCTV Systems', slug: 'cctv', icon: Camera, count: 2, desc: 'Smart surveillance' },
  { name: 'Access Control', slug: 'access-control', icon: Lock, count: 2, desc: 'Biometrics & RFID' },
  { name: 'Gate Automation', slug: 'gate-automation', icon: Shield, count: 1, desc: 'Smart gate motors' },
  { name: 'Estate Security', slug: 'estate-security', icon: HomeIcon, count: 1, desc: 'Gated community tech' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-32 pb-20">
      <Hero />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-primary mb-4 italic">Our Core <span className="text-accent underline decoration-white/20">Solutions</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            We provide end-to-end security and power automation tailored for the high-end Nigerian environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group block p-8 rounded-[2.5rem] bg-gray-50 hover:bg-primary transition-all duration-500 border border-gray-100 hover:border-primary shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-accent transition-colors">
                  <cat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-white mb-2">{cat.name}</h3>
                <p className="text-gray-500 group-hover:text-white/40 text-xs mb-4">{cat.desc}</p>
                <div className="flex items-center text-accent font-bold text-xs uppercase tracking-widest mt-auto">
                  <span>{cat.count} Systems</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-4">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Premium Selection</span>
              </div>
              <h2 className="text-4xl font-display font-bold text-primary mb-4">Featured <span className="text-accent">Systems</span></h2>
              <p className="text-gray-500 max-w-xl font-medium">
                Explore our hand-picked selection of high-performance security and power assets.
              </p>
            </div>
            <Link to="/category/solar" className="btn-outline border-primary text-primary hover:bg-primary hover:text-white flex items-center transition-all bg-white">
              View All Inventory <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1590053132142-4f32c9414e7d?auto=format&fit=crop&q=80&w=1000"
                alt="Professional Installation"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block max-w-xs border border-gray-50">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-primary font-bold italic text-lg leading-relaxed">"The best security installation team in Abuja. Professional and absolutely reliable."</p>
              <div className="flex items-center space-x-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-accent" />
                <div>
                  <p className="text-primary font-bold text-sm">Estate Manager</p>
                  <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest">Maitama, Abuja</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight">
              Why Abuja Trusts <br /> <span className="text-accent italic font-light">Linos E’ Security</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              With over a decade of experience in the Nigerian market, we understand the unique challenges of power and security in Abuja.
            </p>

            <ul className="space-y-8">
              {[
                { title: 'Certified Technicians', desc: 'Our team is trained and certified by global security brands like Hikvision and ZKTeco.' },
                { title: 'Nationwide Delivery', desc: 'Fast and secure shipping to all 36 states with priority Abuja logistics.' },
                { title: 'Free Site Survey', desc: 'We offer professional site assessment within the FCT at no cost.' },
                { title: 'Premium Warranty', desc: 'All products carry an official Linos Authority warranty of up to 2 years.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-6 group">
                  <div className="bg-accent/10 p-2 rounded-xl mt-1 group-hover:bg-accent transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="btn-primary inline-flex items-center space-x-3 px-10 py-5 rounded-2xl shadow-xl shadow-accent/20">
              <span className="text-lg">Book a Technical Survey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -ml-40 -mb-40" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              Ready to Secure Your <br /> <span className="text-accent underline decoration-white/10 italic">Property</span>?
            </h2>
            <p className="text-white/50 text-xl leading-relaxed">
              Contact our Abuja office today for a customized security and power solution that fits your budget and luxury needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <Link to="/contact" className="px-10 py-5 bg-accent text-primary font-bold rounded-2xl hover:bg-accent-hover transition-all text-lg shadow-xl shadow-accent/20 active:scale-95">
                Get a Custom Quote
              </Link>
              <a href="tel:+2348000000000" className="px-10 py-5 bg-white/5 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg active:scale-95">
                Call Our Experts
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
