import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Grid, MessageCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getCategories } from '@/lib/products';
import { BUSINESS_DETAILS, WHATSAPP_LINKS } from '@/config/business';
import JsonLd, { generateBreadcrumbSchema } from '@/components/SEO/JsonLd';

interface Props {
    params: { category: string };
}

export async function generateStaticParams() {
    const categories = getCategories();
    return categories.map((category) => ({
        category: category.toLowerCase().replace(/ /g, '-'),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categories = getCategories();
    const rawCategory = params.category.replace(/-/g, ' ');
    const categoryName = categories.find(c => c.toLowerCase() === rawCategory.toLowerCase()) || rawCategory.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `${categoryName} | Linos E Security Services`,
        description: `Professional ${categoryName} solutions for residential and commercial security in Nigeria. Authorized equipment deployment by Linos E Security.`,
    };
}

export default function CategoryPage({ params }: Props) {
    const categories = getCategories();
    const rawCategory = params.category.replace(/-/g, ' ');
    const categoryName = categories.find(c => c.toLowerCase() === rawCategory.toLowerCase()) || rawCategory.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const products = getProductsByCategory(categoryName);

    if (products.length === 0 && !categories.some(c => c.toLowerCase() === rawCategory.toLowerCase())) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Home', url: BUSINESS_DETAILS.website },
        { name: 'Shop', url: `${BUSINESS_DETAILS.website}/shop` },
        { name: categoryName, url: `${BUSINESS_DETAILS.website}/category/${params.category}` }
    ];

    return (
        <div className="bg-linos-black pt-40 pb-20 min-h-screen">
            <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-20">
                    <div className="flex items-center space-x-3 mb-6">
                        <ShieldCheck className="w-5 h-5 text-linos-gold" />
                        <span className="text-[10px] text-linos-gold font-bold uppercase tracking-[0.4em]">Authorized Category</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase leading-tight">
                        {categoryName} <span className="text-linos-gold italic font-normal">Vault</span>.
                    </h1>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] italic max-w-2xl leading-relaxed">
                        Explore our curated selection of high-performance {categoryName} assets. Engineered for reliability and seamless integration into the Linos security ecosystem.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {products.map((product, i) => (
                        <ProductCard key={product.slug} product={product as any} />
                    ))}
                </div>

                {/* Category CTA */}
                <div className="p-16 border border-linos-gold/30 bg-linos-gold/[0.03] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linos-gold/5 blur-[100px] -mr-32 -mt-32"></div>
                    <h2 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-widest">Need a Custom {categoryName} Design?</h2>
                    <p className="text-white/40 text-sm max-w-xl mx-auto italic mb-12">
                        Our engineering team specializes in bespoke {categoryName} architectures for large-scale facilities and luxury estates.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href={WHATSAPP_LINKS.serviceMessage(categoryName)} className="btn-gold px-12 uppercase font-bold tracking-widest flex items-center justify-center space-x-3">
                            <MessageCircle className="w-5 h-5" />
                            <span>Get Technical Quote</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
