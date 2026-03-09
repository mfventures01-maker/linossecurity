import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';
import { BUSINESS_DETAILS } from '@/config/business';

export async function GET() {
    const products = getAllProducts();
    const baseUrl = BUSINESS_DETAILS.website;

    const feed = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${BUSINESS_DETAILS.name} - Official Product Feed</title>
    <link>${baseUrl}</link>
    <description>Authorized security and solar power hardware for the Nigerian market.</description>
    ${products.map(product => `
    <item>
      <g:id>${product.slug}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>${baseUrl}/products/${product.slug}</g:link>
      <g:image_link>${product.image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.price === 'Get Quote' ? 'out_of_stock' : 'in_stock'}</g:availability>
      <g:price>${product.price === 'Get Quote' ? '0' : product.price} NGN</g:price>
      <g:brand>LINOS E Security</g:brand>
      <g:google_product_category>${product.google_product_category || '600'}</g:google_product_category>
      <g:product_type>${product.category}</g:product_type>
    </item>`).join('')}
  </channel>
</rss>`;

    return new NextResponse(feed, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
    });
}
