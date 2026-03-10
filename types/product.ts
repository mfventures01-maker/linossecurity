// types/product.ts
export interface Product {
    // Core fields
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
    google_product_category: string;
    condition: string;
    json_ld_schema: Record<string, any>;

    // Legacy compatibility fields
    name: string;
    slug: string;
    image: string;
    whatsapp: string;
    category_slug: string;
    seo: {
        meta_title: string;
        meta_description: string;
    };

    // Computed fields
    availability?: 'in-stock' | 'out-of-stock' | 'call-for-quote';
    stock_status?: string;
    price_numeric?: number;
    has_valid_price?: boolean;
}

// Type guard functions
export function isProduct(obj: any): obj is Product {
    return obj && typeof obj.product === 'string';
}

export function hasPrice(product: Product): boolean {
    if (!product.price) return false;
    const priceStr = String(product.price).toLowerCase();
    return !priceStr.includes('quote') &&
        !priceStr.includes('n/a') &&
        priceStr !== '';
}

export function getDisplayPrice(product: Product): string {
    if (!hasPrice(product)) return 'Call for Quote';

    if (typeof product.price === 'number') {
        return `₦${product.price.toLocaleString()}`;
    }

    const cleanPrice = String(product.price).replace(/[₦,]/g, '');
    const numPrice = parseFloat(cleanPrice);
    return isNaN(numPrice) ? String(product.price) : `₦${numPrice.toLocaleString()}`;
}
