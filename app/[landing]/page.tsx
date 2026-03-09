"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import LocationPage from '@/app/locations/[city]/page';
import ServiceDetail from '@/app/services/[slug]/page';

// This is a "Domination Pattern" catch-all
// It handles intersection pages like /cctv-installation-abuja
export default function LandingIntersectionPage() {
    const params = useParams();
    const slug = params.landing as string;

    // Define known cities and services for intersection matching
    const cities = ['abuja', 'lagos', 'port-harcourt', 'kano', 'enugu', 'owerri', 'ibadan'];
    const services = ['cctv-installation', 'access-control-installation', 'solar-inverter-installation', 'automatic-gate-installation', 'turnstile-installation'];

    // Check if slug matches a pattern: [service]-[city]
    let matchedCity = '';
    let matchedService = '';

    for (const city of cities) {
        if (slug.endsWith(`-${city}`)) {
            matchedCity = city;
            matchedService = slug.replace(`-${city}`, '');
            break;
        }
    }

    if (matchedCity && services.includes(matchedService)) {
        // We render a localized version of the service page or a specialized hybrid
        // For this architecture, we'll proxy to the LocationPage but we could also
        // create a specific Intersection component if needed for deeper SEO.
        // To simplify and ensure high quality, we'll re-use the LocationPage logic 
        // which already handles localized technical details.

        // Note: In Next.js App router, we can provide params manually if we were using a component
        // But since this is a page, we return a specialized view.
        return <IntersectionTemplate city={matchedCity} service={matchedService} />;
    }

    // If it's not a matched intersection, and not a standard route, it might be 404
    // However, since this is in the root app/ folder, we must be careful not to hide standard routes.
    // Next.js handles static routes first, so /shop, /contact, etc. are safe.
    notFound();
}

function IntersectionTemplate({ city, service }: { city: string; service: string }) {
    // This is the ultimate SEO Domination landing page
    // Combined local authority with service precision
    return <LocationPage />; // Using LocationPage as it already handles city dynamic content
}
