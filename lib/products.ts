import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { PRICE_API, RemoteProduct } from './pricing';

/**
 * Robust product fetching with dynamic pricing from Google Apps Script
 */
export async function getProducts(): Promise<Product[]> {
    try {
        // Fetch base product metadata (categories, descriptions, etc)
        const localProducts = getLocalProducts();

        // Fetch live pricing from Google Apps Script
        const pricingRes = await fetch(PRICE_API, {
            next: { revalidate: 3600 } // ISR for 1 hour
        });

        if (pricingRes.ok) {
            const pricingData = await pricingRes.json();
            const remotePrices: RemoteProduct[] = pricingData.products || [];

            // Merge prices into local metadata
            return localProducts.map(p => {
                const match = remotePrices.find(rp => rp.id === p.product_slug);
                if (match) {
                    return { ...p, price: String(match.price), availability: match.availability || 'in-stock' };
                }
                return p;
            });
        }

        return localProducts;

    } catch (error) {
        console.error('Error fetching products or prices:', error);
        return getLocalProducts();
    }
}

function getLocalProducts(): Product[] {
    const products = Array.isArray(productsData)
        ? productsData as any
        : (productsData as any).products || [];
    return validateProducts(products);
}

function validateProducts(products: any[]): Product[] {
    return (products || []).map(p => {
        const name = p?.name || p?.product || p?.product_name || 'Unnamed Product';
        const price = p?.price || 'Get Quote';
        const slug = p?.product_slug || p?.slug || '';
        const image = p?.photo_url || p?.image || '';

        return {
            ...p,
            name,
            product: name,
            category: p?.category || 'General',
            category_slug: p?.category_slug || (p?.category || 'General').toLowerCase().replace(/\s+/g, '-'),
            price: String(price),
            product_slug: slug,
            slug: slug,
            photo_url: image,
            image: image,
            description: p?.description || '',
            meta_title: p?.meta_title || `${name} | Linos Security Nigeria`,
            meta_description: p?.meta_description || p?.description?.substring(0, 160)
        };
    }).filter(p => p.product_slug);
}

// Keep legacy exports for compatibility but make them safer
export const getAllProducts = (): Product[] => {
    return getLocalProducts();
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return getAllProducts().find((p) => (p.product_slug === slug || p.slug === slug));
};

export const getProductsByCategory = (category: string): Product[] => {
    return getAllProducts().filter((p) => p.category_slug?.toLowerCase() === category.toLowerCase());
};

export const getCategories = (): string[] => {
    const products = getAllProducts();
    return Array.from(new Set(products.map((p) => p.category_slug).filter(Boolean)));
};
