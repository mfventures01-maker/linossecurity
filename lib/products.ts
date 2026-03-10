import productsData from '@/data/products.json';

export interface Product {
    name: string;
    slug: string;
    category: string;
    category_slug: string;
    price: number | string;
    image: string;
    description: string;
    body_html?: string;
    seo: {
        meta_title: string;
        meta_description: string;
    };
    whatsapp: string;
    google_product_category?: string;
    condition?: string;
    brand?: string;
}

// Global data cache to prevent multiple reads if we use fs (though currently using static import)
// We maintain the static import for Client Components but add server-side safety checks
const data = productsData as any;

export const getAllProducts = (): Product[] => {
    return data.products || [];
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return getAllProducts().find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
    return getAllProducts().filter((p) => p.category_slug.toLowerCase() === category.toLowerCase());
};

export const getCategories = (): string[] => {
    const products = getAllProducts();
    return Array.from(new Set(products.map((p) => p.category_slug)));
};
