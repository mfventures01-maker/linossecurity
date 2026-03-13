import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '@/data/products.json';

// ============================================
// COMPLETE PRODUCT INTERFACE DEFINITION
// ============================================
interface Product {
    // Core product fields (from CSV)
    product: string;
    description: string;
    price: string | number;
    photo_url: string;
    category: string;
    seo_description: string;
    meta_title: string;
    meta_description: string;
    whatsapp_cta_link: string;
    product_slug: string;
    json_ld_schema: any;

    // Computed fields (added by process_products.js)
    availability?: 'in-stock' | 'out-of-stock' | 'call-for-quote';
    stock_status?: string;
    price_numeric?: number;
    has_valid_price?: boolean;
}

// Type guard to check if product has valid price
const hasValidPrice = (product: Product): boolean => {
    if (!product.price) return false;

    const priceStr = String(product.price).toLowerCase();
    const isQuote = priceStr.includes('get quote') ||
        priceStr.includes('get a quote') ||
        priceStr.includes('quote') ||
        priceStr === 'n/a' ||
        priceStr === '';

    return !isQuote;
};

// Cast imported data with proper typing
const products: Product[] = productsData as any[];

// ============================================
// PAGE COMPONENT WITH FULL ERROR HANDLING
// ============================================
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Find product by slug with null check
    const rawProduct = products.find(p => p.product_slug === slug || (p as any).slug === slug);

    // Handle 404
    if (!rawProduct) {
        notFound();
    }

    // Safe product with defaults
    const product = {
        ...rawProduct,
        product: (rawProduct as any).name || rawProduct.product || 'Unnamed Asset',
        description: rawProduct.description || '',
        price: rawProduct.price || 'Call for Quote',
        photo_url: rawProduct.photo_url || (rawProduct as any).image || '',
        category: rawProduct.category || 'General',
        whatsapp_cta_link: rawProduct.whatsapp_cta_link || (rawProduct as any).whatsapp || `https://wa.me/2348069423078?text=Hello%20Linos,%20I%20want%20to%20order%20the%20${encodeURIComponent((rawProduct as any).name || rawProduct.product || 'Asset')}`
    };

    // Determine availability status using multiple checks
    const isValidPrice = hasValidPrice(product as any);
    const displayPrice = (() => {
        if (!isValidPrice) return 'Call for Quote';
        if (typeof product.price === 'number') return `₦${product.price.toLocaleString()}`;
        // Remove any existing currency symbols and add ₦
        const cleanPrice = String(product.price).replace(/[₦,]/g, '');
        const numPrice = parseFloat(cleanPrice);
        return isNaN(numPrice) ? product.price : `₦${numPrice.toLocaleString()}`;
    })();

    return (
        <div className="min-h-screen bg-linos-black text-white">
            {/* MAIN PRODUCT CONTENT */}
            <main className="container mx-auto px-4 pt-32 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT COLUMN - PRODUCT IMAGE */}
                    <div className="relative">
                        <div className="relative h-[400px] md:h-[500px] bg-white/[0.02] border border-white/10 p-2 group overflow-hidden">
                            <div className="w-full h-full border border-linos-gold/20 bg-linos-black relative overflow-hidden">
                                {product.photo_url && product.photo_url !== 'N/A' && product.photo_url !== '' ? (
                                    <Image
                                        src={product.photo_url}
                                        alt={product.product}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        priority
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-linos-black to-white/5 text-linos-gold/20">
                                        <svg className="w-24 h-24 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                        </svg>
                                        <span className="text-xs uppercase tracking-widest">Product Image Arriving</span>
                                    </div>
                                )}
                            </div>

                            {/* BADGES OVERLAY */}
                            <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                                <span className="bg-linos-gold text-linos-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">
                                    ✅ Certified Asset
                                </span>

                                {/* STOCK BADGE - FIXED CONDITION */}
                                {isValidPrice && (
                                    <span className="bg-white text-linos-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg flex items-center">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2"></span>
                                        In Stock
                                    </span>
                                )}

                                {!isValidPrice && (
                                    <span className="bg-linos-gold/80 text-linos-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">
                                        📞 Call for Quote
                                    </span>
                                )}
                            </div>

                            {/* CATEGORY BADGE - BOTTOM LEFT */}
                            <div className="absolute bottom-8 left-8">
                                <span className="bg-linos-black/80 backdrop-blur-md text-white/40 text-[9px] px-4 py-2 border border-white/10 uppercase tracking-[0.2em] font-bold italic">
                                    Node: {product.category || 'General'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - PRODUCT DETAILS */}
                    <div className="flex flex-col space-y-8">
                        {/* BREADCRUMBS */}
                        <div className="text-[10px] uppercase font-bold tracking-widest text-white/30 flex items-center flex-wrap gap-2">
                            <Link href="/" className="hover:text-linos-gold transition">// HOME</Link>
                            <span className="text-linos-gold/20 mr-2">/</span>
                            <Link href={`/category/${product.category?.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-linos-gold transition">
                                {product.category || 'VAULT'}
                            </Link>
                            <span className="text-linos-gold/20 mr-2">/</span>
                            <span className="text-white truncate max-w-[200px]">{product.product}</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="h-[1px] w-8 bg-linos-gold"></div>
                                <span className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.4em]">Authorized Engineering Protocol</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 uppercase leading-tight">
                                {product.product}
                            </h1>
                        </div>

                        {/* PRICE SECTION */}
                        <div className="p-8 border border-linos-gold/20 bg-linos-gold/[0.03] space-y-4">
                            <div className="text-[10px] text-white/20 uppercase font-bold tracking-[0.3em] font-display italic">Asset Deployment Value</div>
                            <div className="flex items-baseline flex-wrap gap-6">
                                <span className="text-4xl md:text-5xl font-display font-bold text-white">
                                    {displayPrice}
                                </span>
                                {isValidPrice && (
                                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest border border-green-500/20 px-3 py-1">
                                        Certified Listing
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-linos-gold uppercase tracking-[0.4em] italic mb-4">Technical Description</h2>
                            <p className="text-white/40 leading-relaxed text-lg italic font-light">
                                {product.description}
                            </p>
                        </div>

                        {/* KEY FEATURES (Extracted from description) */}
                        <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-linos-gold uppercase tracking-[0.4em] italic mb-6">Execution Specifications</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.description.split('. ').slice(0, 4).map((sentence, idx) => (
                                    sentence.length > 15 && (
                                        <li key={idx} className="flex items-start bg-white/[0.01] border border-white/5 p-4 group">
                                            <span className="text-linos-gold mr-3 mt-1 group-hover:scale-125 transition-transform italic text-sm">»</span>
                                            <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest leading-relaxed">{sentence}.</span>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>

                        {/* WHATSAPP CTA BUTTON */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={product.whatsapp_cta_link || `https://wa.me/2348069423078?text=Hello%20Linos,%20I%20want%20to%20order%20the%20${encodeURIComponent(product.product)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center bg-linos-gold hover:bg-white text-linos-black font-bold py-6 px-8 transition-all transform hover:translate-y-[-2px] shadow-2xl uppercase tracking-[0.3em] text-xs group"
                            >
                                <div className="mr-3 group-hover:rotate-12 transition-transform">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.447-1.273.607-1.446c.16-.173.346-.216.462-.216l.332.006c.106.004.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.087.274.072.374-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z" />
                                    </svg>
                                </div>
                                {isValidPrice ? 'Initialize Order' : 'Consult Strategy'}
                            </a>

                            <Link
                                href="/contact"
                                className="flex-1 inline-flex items-center justify-center border border-white/10 hover:border-linos-gold/40 text-white font-bold py-6 px-8 transition-all uppercase tracking-[0.3em] text-xs hover:bg-white/5 italic"
                            >
                                Request Technical Audit
                            </Link>
                        </div>
                    </div>
                </div>

                {/* JSON-LD SCHEMA - SEO OPTIMIZED */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": product.product,
                            "image": product.photo_url || "https://linosessecurity.com/logo.png",
                            "description": product.description,
                            "sku": product.product_slug,
                            "mpn": product.product_slug,
                            "brand": {
                                "@type": "Brand",
                                "name": "Linos E' Security Ltd"
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": `https://linosessecurity.com/product/${product.product_slug}`,
                                "priceCurrency": "NGN",
                                "price": isValidPrice ? String(product.price).replace(/[₦,]/g, '') : "0",
                                "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                                "availability": isValidPrice ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                                "seller": {
                                    "@type": "Organization",
                                    "name": "Linos E' Security Ltd"
                                }
                            },
                            "category": product.category
                        })
                    }}
                />
            </main>

            {/* RELATED STRATEGY ADVICE */}
            <div className="container mx-auto px-4 mb-20">
                <div className="bg-white/[0.01] border border-white/5 p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-linos-gold/30"></div>
                    <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-[0.4em]">Strategic Implementation</h3>
                    <p className="text-white/30 text-xs italic max-w-xl mx-auto leading-relaxed mb-8">
                        This asset provides maximum tactical benefit when integrated within the broader Linos Security Protocol. Deploy this hardware as part of your comprehensive infrastructure upgrade.
                    </p>
                    <Link href="/services" className="text-linos-gold text-[10px] font-bold uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all duration-700 underline underline-offset-8 decoration-linos-gold/20">
                        Explore Enterprise Solutions
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ============================================
// GENERATE STATIC PATHS FOR BUILD
// ============================================
export async function generateStaticParams() {
    return (products || []).map((product) => ({
        slug: product?.product_slug || (product as any)?.slug,
    })).filter(p => p.slug);
}

// ============================================
// GENERATE METADATA FOR SEO
// ============================================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = products.find(p => p?.product_slug === slug || (p as any)?.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found | Linos E\' Security',
            description: 'The requested product could not be found.'
        };
    }

    return {
        title: product?.meta_title || `${product?.product || (product as any)?.name} | Linos E' Security`,
        description: product?.meta_description || product?.seo_description || product?.description,
        openGraph: {
            title: product?.meta_title || product?.product || (product as any)?.name,
            description: product?.meta_description || product?.description,
            images: product?.photo_url ? [product?.photo_url] : [],
        },
    };
}
