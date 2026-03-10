import productsData from '@/data/products.json';
import { Product } from '@/types/product';

// Handle both legacy { products: [...] } and new [...] formats
const productsArr: Product[] = Array.isArray(productsData)
    ? productsData as any
    : (productsData as any).products || [];

export const getAllProducts = (): Product[] => {
    return productsArr;
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
