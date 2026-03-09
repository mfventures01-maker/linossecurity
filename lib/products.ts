import productsData from '@/data/products.json';

export interface Product {
    name: string;
    slug: string;
    category: string;
    price: number | string;
    image: string;
    description: string;
    seo: {
        meta_title: string;
        meta_description: string;
    };
    whatsapp: string;
    google_product_category?: string;
    condition?: string;
    brand?: string;
}

export const getAllProducts = (): Product[] => {
    return productsData.products;
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return productsData.products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
    return productsData.products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
};

export const getCategories = (): string[] => {
    return Array.from(new Set(productsData.products.map((p) => p.category)));
};
