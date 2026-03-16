import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getAllProducts } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';
import { BUSINESS_DETAILS } from '@/config/business';
import JsonLd, { generateProductSchema, generateBreadcrumbSchema } from '@/components/SEO/JsonLd';
import { Phone, MessageSquare, ShieldCheck, Truck, Clock, Wrench, ChevronRight, Star } from 'lucide-react';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = await getProducts();
    const allPosts = getAllPosts();

    // Find product
    const product = products.find(p => p.product_slug === slug || p.slug === slug);

    if (!product) {
        notFound();
    }

    // Related blog posts
    const relatedPosts = allPosts.filter(post =>
        post.focusKeyword.toLowerCase().includes(product.category.toLowerCase()) ||
        product.description.toLowerCase().includes(post.focusKeyword.toLowerCase())
    ).slice(0, 2);

    const isValidPrice = !String(product.price).toLowerCase().includes('quote') && product.price !== '';

    const displayPrice = (() => {
        if (!isValidPrice) return 'Call for Quote';
        const cleanPrice = String(product.price).replace(/[₦,]/g, '');
        const numPrice = parseFloat(cleanPrice);
        return isNaN(numPrice) ? String(product.price) : `₦${numPrice.toLocaleString()}`;
    })();

    const schemas: any[] = [
        generateProductSchema(product, BUSINESS_DETAILS),
        generateBreadcrumbSchema([
            { name: 'Home', url: BUSINESS_DETAILS.website },
            { name: 'Products', url: `${BUSINESS_DETAILS.website}/shop` },
            { name: product.name, url: `${BUSINESS_DETAILS.website}/products/${slug}` }
        ])
    ];

    return (
        <div className="min-h-screen bg-linos-black text-white pt-32 pb-24">
            {schemas.map((s, i) => <JsonLd key={i} data={s} />)}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left: Media & Gallery */}
                    <div className="space-y-10">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.01]">
                            <Image
                                src={product.image || product.photo_url || '/placeholder.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-all duration-1000"
                                priority
                            />
                            <div className="absolute top-10 left-10">
                                <span className="bg-linos-gold text-linos-black text-[9px] font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl">Elite Asset</span>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheck, label: 'NNSA Certified' },
                                { icon: Wrench, label: 'Pro Installation' },
                                { icon: Clock, label: '24/7 Monitoring' }
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                    <badge.icon className="w-5 h-5 text-linos-gold mb-3" />
                                    <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Technical Specs & Conversion */}
                    <div className="flex flex-col space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.5em]">{product.category} Protocols</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none">
                                {product.name}
                            </h1>
                            <div className="flex items-center space-x-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-linos-gold text-linos-gold" />)}
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-4">5.0 | Peer Validated Architecture</span>
                            </div>
                        </div>

                        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative overflow-hidden">
                            <div className="flex flex-col space-y-2">
                                <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Pricing Relay</span>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-5xl font-display font-bold text-white leading-none">{displayPrice}</span>
                                    {isValidPrice && <span className="text-[10px] text-linos-gold font-bold uppercase tracking-widest">+ Pro Deployment</span>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-linos-gold pl-6">Technical Brief</h3>
                            <p className="text-white/60 text-lg leading-relaxed">{product.description}</p>
                        </div>

                        {/* Conversion Matrix */}
                        <div className="space-y-4 pt-10 border-t border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a
                                    href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Initialize%20deployment%20protocol%20for%20${encodeURIComponent(product.name)}`}
                                    className="btn-gold !py-6 flex items-center justify-center space-x-4 uppercase tracking-[0.3em] font-bold text-[10px]"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Sync via WhatsApp</span>
                                </a>
                                <a
                                    href={`tel:${BUSINESS_DETAILS.phone}`}
                                    className="btn-outline !py-6 flex items-center justify-center space-x-4 uppercase tracking-[0.3em] font-bold text-[10px]"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>Priority Relay</span>
                                </a>
                            </div>
                            <Link
                                href="/contact"
                                className="flex items-center justify-center w-full py-5 text-[9px] text-white/20 uppercase font-bold tracking-[0.4em] hover:text-linos-gold transition-colors"
                            >
                                Request Technical Audit & Site Survey <ChevronRight className="w-3 h-3 ml-2" />
                            </Link>
                        </div>

                        {/* Related Blog Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="pt-16 space-y-8">
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Intelligence Briefings</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {relatedPosts.map(post => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            className="flex items-center space-x-6 p-6 bg-white/5 border border-white/5 rounded-3xl group hover:border-linos-gold/30 transition-all"
                                        >
                                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed mb-2 group-hover:text-linos-gold transition-colors">{post.title}</h4>
                                                <p className="text-[8px] text-white/30 uppercase font-bold tracking-widest italic">{post.publishDate} • Tech Analysis</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function generateStaticParams() {
    const products = getAllProducts();
    return products.map((product) => ({
        slug: product.product_slug || product.slug,
    })).filter(p => p.slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = getAllProducts();
    const product = products.find(p => p.product_slug === slug || p.slug === slug);

    if (!product) return { title: 'Asset Not Found' };

    return {
        title: `${product.name} | Security Infrastructure Nigeria`,
        description: product.description.substring(0, 160),
    };
}
