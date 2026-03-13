import productsData from '@/data/products.json';
import { Product } from '@/types/product';

/**
 * Robust product fetching with null safety and error handling
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const url = process.env.GOOGLE_SHEETS_PRODUCT_URL;
        if (!url) {
            console.warn('⚠️ Missing GOOGLE_SHEETS_PRODUCT_URL, falling back to local data');
            return getLocalProducts();
        }

        // Add timeout and error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(`${url}?path=products`, {
            signal: controller.signal,
            next: { revalidate: 300 }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`❌ HTTP error! Status: ${response.status}`);
            return getLocalProducts();
        }

        const data = await response.json();
        const products = Array.isArray(data) ? data : (data.products || []);
        return validateProducts(products);

    } catch (error) {
        console.error('Error fetching products:', error);
        return getLocalProducts(); // Always return fallback on error
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
        const price = p?.price || p?.['price_(₦)'] || 'Call for Quote';
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
            description: p?.description || ''
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
