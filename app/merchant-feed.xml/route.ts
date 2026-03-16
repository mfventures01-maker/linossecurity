import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';
import { BUSINESS_DETAILS } from '@/config/business';

export async function GET() {
    const products = getAllProducts();
    const baseUrl = BUSINESS_DETAILS.website;

    const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${BUSINESS_DETAILS.name}</title>
    <link>${baseUrl}</link>
    <description>${BUSINESS_DETAILS.name} Elite Security Ecommerce Feed</description>
    ${products.map(product => `
    <item>
      <g:id>${product.product_slug || product.slug}</g:id>
      <g:title>${product.name || product.product}</g:title>
      <g:description>${product.description || product.name}</g:description>
      <g:link>${baseUrl}/products/${product.product_slug || product.slug}</g:link>
      <g:image_link>${product.photo_url || product.image || `${baseUrl}/logo.png`}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.availability === 'in-stock' ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${String(product.price).replace(/[^0-9.]/g, '')} NGN</g:price>
      <g:brand>${BUSINESS_DETAILS.name}</g:brand>
      <g:google_product_category>Home &amp; Garden &gt; Security &amp; Surveillance</g:google_product_category>
    </item>`).join('')}
  </channel>
</rss>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
        },
    });
}
