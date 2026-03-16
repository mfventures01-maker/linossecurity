import React from 'react';

interface JsonLdProps {
    data: any;
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export const generateOrganizationSchema = (business: any) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": business.name,
    "url": business.website,
    "logo": `${business.website}/logo.png`,
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": business.phone,
        "contactType": "customer service",
        "areaServed": "NG",
        "availableLanguage": "English"
    },
    "sameAs": [
        business.socials.facebook,
        business.socials.instagram,
        business.socials.linkedin
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Security Products",
        "itemListElement": [
            { "@type": "OfferCatalog", "name": "Solar Power", "numberOfItems": 6 },
            { "@type": "OfferCatalog", "name": "Access Control", "numberOfItems": 6 },
            { "@type": "OfferCatalog", "name": "CCTV", "numberOfItems": 5 },
            { "@type": "OfferCatalog", "name": "Gate Automation", "numberOfItems": 3 },
            { "@type": "OfferCatalog", "name": "Vehicle Access", "numberOfItems": 5 },
            { "@type": "OfferCatalog", "name": "Integrated Security", "numberOfItems": 1 },
            { "@type": "OfferCatalog", "name": "Smart Door Locks", "numberOfItems": 5 },
            { "@type": "OfferCatalog", "name": "Security Vehicle Equipment", "numberOfItems": 2 }
        ]
    }
});

export const generateLocalBusinessSchema = (business: any) => ({
    '@context': 'https://schema.org',
    '@type': 'SecurityComponent',
    'name': business.name,
    'address': {
        '@type': 'PostalAddress',
        'streetAddress': business.address,
        'addressLocality': business.city,
        'addressRegion': business.state,
        'postalCode': business.zip,
        'addressCountry': 'NG'
    },
    'telephone': business.phone,
    'url': business.website,
    'logo': `${business.website}/logo.png`,
    'image': `${business.website}/og-image.jpg`,
    'priceRange': '₦₦₦',
    'openingHours': 'Mo-Fr 08:00-18:00',
    'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 9.0765,
        'longitude': 7.4727
    },
    'sameAs': [
        business.socials.facebook,
        business.socials.instagram,
        business.socials.linkedin
    ]
});

export const generateProductSchema = (product: any, business: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': product.image,
    'description': product.meta_description || product.description,
    'brand': {
        '@type': 'Brand',
        'name': business.name
    },
    'offers': {
        '@type': 'Offer',
        'url': `${business.website}/product/${product.slug}`,
        'priceCurrency': 'NGN',
        'price': String(product.price).replace(/[^0-9.]/g, ''),
        'availability': product.availability === 'in-stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'seller': {
            '@type': 'Organization',
            'name': business.name
        }
    }
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
    }))
});

export const generateArticleSchema = (post: any, business: any) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
        `${business.website}${post.coverImage}`
    ],
    "datePublished": post.publishDate,
    "author": {
        "@type": "Organization",
        "name": post.author || business.name,
        "url": business.website
    },
    "publisher": {
        "@type": "Organization",
        "name": business.name,
        "logo": {
            "@type": "ImageObject",
            "url": `${business.website}/logo.png`
        }
    },
    "description": post.metaDescription,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${business.website}/blog/${post.slug}`
    }
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});
