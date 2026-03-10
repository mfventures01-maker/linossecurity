import { MetadataRoute } from 'next';
import { getAllProducts, getCategories, Product } from '@/lib/products';
import { BUSINESS_DETAILS } from '@/config/business';

export default function sitemap(): MetadataRoute.Sitemap {
    const products = getAllProducts();
    const categories = ['solar-power', 'access-control', 'cctv', 'gate-automation', 'safes', 'vehicle-security', 'integrated-security', 'security-vehicle'];
    const cities = ['abuja', 'lagos', 'port-harcourt', 'kano', 'enugu', 'owerri', 'ibadan'];
    const services = ['cctv-installation', 'access-control-installation', 'solar-power-installation', 'automatic-gate-installation', 'turnstile-installation', 'smart-home-installation'];

    const productEntries = products.map((product: Product) => ({
        url: `${BUSINESS_DETAILS.website}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categoryEntries = categories.map((cat: string) => ({
        url: `${BUSINESS_DETAILS.website}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const locationEntries = cities.map((city) => ({
        url: `${BUSINESS_DETAILS.website}/locations/${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const serviceEntries = services.map((service) => ({
        url: `${BUSINESS_DETAILS.website}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Intersection entries (City + Service)
    const intersectionEntries: MetadataRoute.Sitemap = [];
    cities.forEach(city => {
        services.forEach(service => {
            intersectionEntries.push({
                url: `${BUSINESS_DETAILS.website}/${service}-${city}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            });
        });
    });

    return [
        {
            url: BUSINESS_DETAILS.website,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${BUSINESS_DETAILS.website}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${BUSINESS_DETAILS.website}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${BUSINESS_DETAILS.website}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        ...productEntries,
        ...categoryEntries,
        ...locationEntries,
        ...serviceEntries,
        ...intersectionEntries,
    ];
}
