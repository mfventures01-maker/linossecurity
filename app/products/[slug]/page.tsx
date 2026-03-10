import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { Product } from '@/types/product';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = getAllProducts();

    // Find product by slug
    const product = products.find(p => p.product_slug === slug || p.slug === slug);

    if (!product) {
        notFound();
    }

    const isValidPrice = !String(product.price).toLowerCase().includes('quote') && product.price !== '';

    const displayPrice = (() => {
        if (!isValidPrice) return 'Call for Quote';
        if (typeof product.price === 'number') return `₦${product.price.toLocaleString()}`;
        const cleanPrice = String(product.price).replace(/[₦,]/g, '');
        const numPrice = parseFloat(cleanPrice);
        return isNaN(numPrice) ? String(product.price) : `₦${numPrice.toLocaleString()}`;
    })();

    return (
        <div className="min-h-screen bg-linos-black text-white">
            <main className="container mx-auto px-4 pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* IMAGE SECION */}
                    <div className="space-y-6">
                        <div className="relative aspect-square border border-white/10 p-2 group overflow-hidden bg-white/[0.01]">
                            <div className="w-full h-full border border-linos-gold/20 bg-linos-black relative overflow-hidden">
                                <Image
                                    src={product.image || product.photo_url || '/placeholder.jpg'}
                                    alt={product.name || product.product}
                                    fill
                                    className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    priority
                                />

                                <div className="absolute top-8 left-8 flex flex-col gap-2">
                                    <span className="bg-linos-gold text-linos-black text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest shadow-2xl">Certified Security Asset</span>
                                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest border border-white/10">Authorized Relay Node</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1">
                            {['Militarty-Grade', 'Authorized Hub', 'Global Compliance'].map((tag) => (
                                <div key={tag} className="border border-white/5 py-4 text-center">
                                    <span className="text-[8px] text-white/20 uppercase font-bold tracking-[0.3em]">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CONTENT SECTION */}
                    <div className="flex flex-col space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-[1px] w-12 bg-linos-gold"></div>
                                <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.4em]">Engineering Protocol: {product.category}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-none">
                                {product.name || product.product}
                            </h1>
                        </div>

                        <div className="p-10 border border-linos-gold/20 bg-linos-gold/[0.03] space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.41c-2.39-1.2-4.17-3.42-4.72-6.06.84-.44 1.81-.69 2.84-.74.19.14.39.27.6.38.44.22.92.35 1.44.35s1-.13 1.44-.35c.21-.11.41-.24.6-.38 1.03.05 2 .3 2.84.74-.55 2.64-2.33 4.86-4.72 6.06z" /></svg>
                            </div>
                            <span className="text-[10px] text-white/20 uppercase font-bold tracking-[0.4em] font-display italic">Asset Deployment Valuation</span>
                            <div className="flex items-baseline gap-6">
                                <span className="text-5xl font-display font-bold text-white">
                                    {displayPrice}
                                </span>
                                {isValidPrice && (
                                    <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest bg-green-500/10 px-4 py-1 rounded-full border border-green-500/20">
                                        NNSA Certified
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-[10px] font-bold text-linos-gold uppercase tracking-[0.5em] italic">Technical Summary</h2>
                            <p className="text-white/40 text-lg italic leading-relaxed font-light">
                                {product.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-10">
                            <a
                                href={product.whatsapp_cta_link || `https://wa.me/2348069423078?text=Hello%20Linos,%20I%20want%20to%20order%20the%20${encodeURIComponent(product.name || product.product)}`}
                                className="btn-gold !py-6 flex items-center justify-center space-x-4 uppercase tracking-[0.3em] font-bold text-xs"
                            >
                                Initialize Deployment
                            </a>
                            <Link
                                href="/contact"
                                className="btn-outline !py-6 flex items-center justify-center space-x-4 uppercase tracking-[0.3em] font-bold text-xs italic"
                            >
                                Technical Audit
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": product.name || product.product,
                        "image": product.image || product.photo_url,
                        "description": product.description,
                        "brand": { "@type": "Brand", "name": "Linos E' Security Ltd" },
                        "offers": {
                            "@type": "Offer",
                            "price": isValidPrice ? String(product.price).replace(/[₦,]/g, '') : "0",
                            "priceCurrency": "NGN",
                            "availability": isValidPrice ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                        }
                    })
                }}
            />
        </div>
    );
}

export async function generateStaticParams() {
    const products = getAllProducts();
    return products.map((product) => ({
        slug: product.product_slug || product.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = getAllProducts();
    const product = products.find(p => p.product_slug === slug || p.slug === slug);

    if (!product) return { title: 'Asset Not Found' };

    return {
        title: product.meta_title || `${product.name || product.product} | Linos E' Security`,
        description: product.meta_description || product.description,
    };
}
