import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Filter, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Category } from '../types';

const categoryMeta: Record<Category, { title: string; desc: string; image: string }> = {
  'solar': {
    title: 'Solar Power Systems',
    desc: 'High-performance hybrid and off-grid solar inverters for homes and businesses in Abuja.',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=2000'
  },
  'cctv': {
    title: 'CCTV & Surveillance',
    desc: 'Advanced smart cameras and monitoring systems for 24/7 property protection.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=2000'
  },
  'access-control': {
    title: 'Access Control & Biometrics',
    desc: 'Secure your premises with facial recognition, fingerprint, and RFID technology.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2000'
  },
  'gate-automation': {
    title: 'Gate Automation',
    desc: 'Premium smart gate motors and controllers for convenience and security.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2000'
  },
  'perimeter-security': {
    title: 'Perimeter Security',
    desc: 'Bollards, spikes, and turnstiles for high-level perimeter protection.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2000'
  },
  'estate-security': {
    title: 'Estate Security',
    desc: 'Comprehensive security management solutions for residential estates in Nigeria.',
    image: 'https://images.unsplash.com/photo-1590053132142-4f32c9414e7d?auto=format&fit=crop&q=80&w=2000'
  }
};

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const category = useMemo(() => {
    return categorySlug as Category;
  }, [categorySlug]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === category);
  }, [category]);

  const meta = categoryMeta[category] || {
    title: 'Our Products',
    desc: 'Premium security and power solutions.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2000'
  };

  return (
    <div className="pb-20">
      {/* Category Hero */}
      <section className="relative h-[50vh] flex items-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent z-10" />
          <img
            src={meta.image}
            alt={meta.title}
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex items-center space-x-2 text-white/60 text-sm mb-6">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Products</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-bold">{meta.title}</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              {meta.title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              {meta.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-8 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <span className="text-gray-400 text-sm">{filteredProducts.length} Products found</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button className="p-2 bg-white rounded-md shadow-sm text-primary">
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem]">
            <h3 className="text-2xl font-bold text-primary mb-4">No products found in this category</h3>
            <p className="text-gray-500 mb-8">We are currently updating our inventory. Please check back soon.</p>
            <Link to="/" className="btn-primary">Return Home</Link>
          </div>
        )}
      </section>
    </div>
  );
}
