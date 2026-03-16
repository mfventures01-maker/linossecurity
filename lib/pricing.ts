export const PRICE_API = 'https://script.google.com/macros/s/AKfycbwj57zDGnWB4H3_x6ghLsLdyYcyB-aGLUxWXcUo5pzwXMwJ5QkbGHIWz3SP5V5DBCSJ/exec';

export interface RemoteProduct {
    id: string;
    name: string;
    price: string | number;
    availability?: string;
}

export async function getRemotePrices(): Promise<RemoteProduct[]> {
    try {
        const res = await fetch(PRICE_API, {
            next: { revalidate: 3600 } // ISR for 1 hour
        });
        if (!res.ok) throw new Error('Failed to fetch pricing');
        const data = await res.json();
        return data.products || [];
    } catch (error) {
        console.error('Pricing Relay Error:', error);
        return [];
    }
}
