import React from 'react';
import { motion } from 'motion/react';
import { Zap, Camera, Lock, Shield, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = [
  { name: 'Solar Power', slug: 'solar', icon: Zap, count: 7, desc: 'Hybrid & Off-grid systems' },
  { name: 'CCTV Systems', slug: 'cctv', icon: Camera, count: 3, desc: 'Smart surveillance' },
  { name: 'Access Control', slug: 'access-control', icon: Lock, count: 6, desc: 'Biometrics & RFID' },
  { name: 'Gate Automation', slug: 'gate-automation', icon: Shield, count: 1, desc: 'Smart gate motors' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-32 pb-20">
      <Hero />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">Our Core Solutions</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We provide end-to-end security and power automation tailored for the Nigerian environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="group block p-8 rounded-3xl bg-gray-50 hover:bg-primary transition-all duration-500 border border-gray-100 hover:border-primary"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-accent transition-colors">
                  <cat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary group-hover:text-white mb-2">{cat.name}</h3>
                <p className="text-gray-500 group-hover:text-white/60 text-sm mb-4">{cat.desc}</p>
                <div className="flex items-center text-accent font-bold text-sm">
                  <span>{cat.count} Products</span>
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
              <h2 className="text-4xl font-display font-bold text-primary mb-4">Featured Systems</h2>
              <p className="text-gray-500 max-w-xl">
                Explore our hand-picked selection of high-performance security and power products.
              </p>
            </div>
            <Link to="/category/solar" className="text-primary font-bold flex items-center hover:text-accent transition-colors">
              View All Products <ArrowRight className="w-5 h-5 ml-2" />
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
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1590053132142-4f32c9414e7d?auto=format&fit=crop&q=80&w=1000"
                alt="Professional Installation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-3xl hidden md:block max-w-xs">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-primary font-bold italic">"The best security installation team in Abuja. Professional and reliable."</p>
              <p className="text-primary/60 text-sm mt-2">— Estate Manager, Maitama</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold text-primary leading-tight">
              Why Abuja Trusts <span className="text-accent">Linos E’ Security</span>
            </h2>
            <p className="text-gray-500 text-lg">
              With over a decade of experience in the Nigerian market, we understand the unique challenges of power and security in Abuja.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: 'Certified Technicians', desc: 'Our team is trained and certified by global security brands.' },
                { title: 'Nationwide Delivery', desc: 'Fast and secure shipping to all 36 states in Nigeria.' },
                { title: 'Free Site Survey', desc: 'We offer professional site assessment in Abuja at no cost.' },
                { title: 'Premium Warranty', desc: 'All our products come with a comprehensive manufacturer warranty.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-1 rounded-full mt-1">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Book a Free Survey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              Ready to Secure Your Property?
            </h2>
            <p className="text-white/70 text-lg mb-12">
              Contact our Abuja office today for a customized security and power solution that fits your budget and needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="btn-primary">
                Get a Custom Quote
              </Link>
              <a href="tel:+2348000000000" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Call Our Experts
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
