/**
 * LINOS SECURITY - ULTIMATE GOOGLE INTEGRATION ENGINE
 * Powers: Website API, Google Merchant, GMB, SEO, AI Search
 */

function doGet(request) {
  const path = request.parameter.path || 'products';
  
  switch(path) {
    case 'products':
      return handleProducts(request);
    case 'product':
      return handleSingleProduct(request);
    case 'sitemap':
      return generateSitemap();
    case 'merchant-feed':
      return generateMerchantFeed();
    case 'gmb-feed':
      return generateGMBFeed();
    case 'schema':
      return generateSchemaMarkup();
    default:
      return jsonResponse({ error: 'Invalid path' }, 404);
  }
}

// --------------------------------------------
// PRODUCT API
// --------------------------------------------
function handleProducts(request) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const products = rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      let cleanHeader = header.toString().trim().toLowerCase().replace(/\s+/g, '_');
      obj[cleanHeader] = row[i];
    });
    return transformRow(obj);
  }).filter(p => p !== null);
  
  return jsonResponse(products);
}

function transformRow(row) {
  try {
    const name = (row.title || row.product || row.product_name || '').toString().trim();
    if (!name) return null;

    let slug = (row.handle || row.product_slug || '').toString().trim();
    if (!slug) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    return {
        product: name,
        name: name,
        product_slug: slug,
        slug: slug,
        description: (row.description || row.body_html || '').toString().replace(/<[^>]*>?/gm, ''),
        price: row.variant_price || row.price || 'Get Quote',
        photo_url: row.image_src || row.photo_url || '',
        category: row.category || 'General',
        meta_title: row.seo_title || row.meta_title || name,
        meta_description: row.seo_description || row.meta_description || '',
        whatsapp_cta_link: row.whatsapp_cta_link || ''
    };
  } catch (err) { return null; }
}

// --------------------------------------------
// MERCHANT CENTER FEED
// --------------------------------------------
function generateMerchantFeed() {
  const products = getProductsInternal();
  const merchantItems = products.map(p => ({
      "id": p.product_slug,
      "title": p.name,
      "description": p.description,
      "link": `https://linosessecurity.com/product/${p.product_slug}`,
      "image_link": p.photo_url,
      "availability": "in stock",
      "price": `${p.price.toString().replace(/[₦,]/g, '')} NGN`,
      "brand": "Linos E' Security Ltd",
      "condition": "new"
  }));
  
  return jsonResponse({ items: merchantItems });
}

// --------------------------------------------
// SITEMAP (XML)
// --------------------------------------------
function generateSitemap() {
  const products = getProductsInternal();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  products.forEach(p => {
    xml += `<url><loc>https://linosessecurity.com/product/${p.product_slug}</loc></url>\n`;
  });
  xml += '</urlset>';
  return ContentService.createTextOutput(xml).setMimeType(ContentService.MimeType.XML);
}

function getProductsInternal() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      let cleanHeader = header.toString().trim().toLowerCase().replace(/\s+/g, '_');
      obj[cleanHeader] = row[i];
    });
    return transformRow(obj);
  }).filter(p => p !== null);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
