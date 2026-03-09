import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight,
  MessageCircle,
  FileText,
  ShieldCheck,
  Truck,
  Settings,
  ArrowLeft,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { products } from '../data/products';
import { formatCurrency, cn } from '../lib/utils';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();

  const product = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  // Dynamic SEO Injection
  React.useEffect(() => {
    if (!product) return;

    // 1. Title
    const siteSuffix = ' | Linos E’ Security Ltd';
    document.title = product.meta_title || `${product.name}${siteSuffix}`;

    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', product.meta_description || product.description);

    // 3. Structured Data (JSON-LD)
    const scriptId = `product-schema-${product.id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": [product.image],
      "description": product.description,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": "Linos E’ Security"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "NGN",
        "price": parseFloat(product.price.replace(/[^0-9.]/g, '') || '0'),
        "availability": product.availability === 'out-of-stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        "areaServed": "Abuja, Nigeria"
      }
    };

    script.text = JSON.stringify(schema);

    return () => {
      // Cleanup on unmount or product change
      const oldScript = document.getElementById(scriptId);
      if (oldScript) oldScript.remove();
    };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const whatsappNumber = '2348000000000';
  const whatsappMessage = encodeURIComponent(`Hello Linos Security, I'd like to order the ${product.name}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const availabilityConfig = {
    'in-stock': { label: 'In Stock & Ready for Installation', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    'low-stock': { label: 'Low Stock - Order Soon', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    'out-of-stock': { label: 'Out of Stock - Contact for Pre-order', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
  };

  const availability = availabilityConfig[product.availability];

  return (
    <div className="pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-gray-400 text-sm mb-12">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-bold">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-accent transition-colors">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className={cn(
                "text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block border",
                availability.color
              )}>
                {availability.label}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-primary mb-6">
                {formatCurrency(product.price)}
              </div>
              <p className="text-gray-500 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-accent" />
                <span className="text-sm font-bold text-primary">2-Year Warranty</span>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center space-x-3">
                <Truck className="w-6 h-6 text-accent" />
                <span className="text-sm font-bold text-primary">Abuja Delivery</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 flex items-center justify-center space-x-3"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Order on WhatsApp</span>
              </a>
              <button className="btn-outline flex-1 flex items-center justify-center space-x-3">
                <FileText className="w-6 h-6" />
                <span>Request Custom Quote</span>
              </button>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <h4 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Professional Installation Included',
                  'Mobile App Integration',
                  '24/7 Technical Support',
                  'High-Performance Components',
                  'Abuja Site Survey Available',
                  'Certified Security Solution'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs/Details */}
        <section className="mb-32">
          <div className="border-b border-gray-100 mb-12">
            <div className="flex space-x-12">
              <button className="pb-4 border-b-2 border-accent text-primary font-bold">Product Overview</button>
              <button className="pb-4 text-gray-400 hover:text-primary transition-colors">Technical Specifications</button>
              <button className="pb-4 text-gray-400 hover:text-primary transition-colors">Installation Details</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-display font-bold text-primary">Comprehensive Security Solution</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                {product.seo_description || `The ${product.name} is engineered specifically for the demanding environments of Abuja and Nigeria. Whether you're looking to secure a residential property in Maitama or a commercial complex in Central Area, this system provides the reliability and performance you need.`}
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Our installation team handles everything from initial site survey to final configuration and user training. We ensure that your system is optimized for local conditions, including power fluctuations and weather resistance.
              </p>

              <div className="bg-primary rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-accent" />
                  <span>Technical Highlights</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="text-white/40 text-xs uppercase font-bold tracking-widest">Integration</div>
                    <div className="font-medium">Full Smart Home Compatibility</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/40 text-xs uppercase font-bold tracking-widest">Durability</div>
                    <div className="font-medium">IP67 Weatherproof Rating</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/40 text-xs uppercase font-bold tracking-widest">Connectivity</div>
                    <div className="font-medium">WiFi, Ethernet & 4G Support</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/40 text-xs uppercase font-bold tracking-widest">Power</div>
                    <div className="font-medium">Solar & Battery Backup Ready</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6">Need Assistance?</h3>
                <p className="text-gray-500 text-sm mb-8">Not sure if this is the right fit for your property? Our Abuja-based experts are ready to help.</p>
                <div className="space-y-4">
                  <button className="w-full btn-primary py-4">Book Free Consultation</button>
                  <button className="w-full btn-outline border-primary text-primary hover:bg-primary hover:text-white py-4">Download Datasheet</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-primary mb-2">Related Systems</h2>
                <p className="text-gray-500">Other solutions you might be interested in.</p>
              </div>
              <Link to={`/category/${product.category}`} className="text-primary font-bold flex items-center hover:text-accent transition-colors">
                View Category <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
