import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';
import { BUSINESS_DETAILS } from '@/config/business';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = BUSINESS_DETAILS.website;

    const products = getAllProducts();
    const blogPosts = getAllPosts();

    const productUrls = products.map((p) => ({
        url: `${baseUrl}/products/${p.product_slug || p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const blogUrls = blogPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(p.publishDate),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const channels = [
        '',
        '/shop',
        '/services',
        '/blog',
        '/contact',
        '/locations',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    return [...channels, ...productUrls, ...blogUrls];
}
