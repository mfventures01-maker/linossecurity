/**
 * Google Apps Script for Linos Security Product Data
 * This script exports Google Sheet data as JSON for the Next.js frontend.
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code into Code.gs.
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select 'Web App'.
 * 6. Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'.
 * 7. Copy the Web App URL.
 */

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const products = rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return transformRow(obj);
  }).filter(p => p !== null);
  
  return ContentService.createTextOutput(JSON.stringify(products))
    .setMimeType(ContentService.MimeType.JSON);
}

function transformRow(row) {
  try {
    const name = (row.Title || row.product || row.product_name || row.installation_capacity || '').toString().trim();
    if (!name) return null;

    let slug = (row.Handle || row.product_slug || '').toString().trim();
    if (!slug) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const description = row['Body (HTML)'] || row.description || row.seo_description || '';
    const price = row['Variant Price'] || row.price || 'Get Quote';
    const image = row['Image Src'] || row.photo_url || '';
    const googleCategory = row['Google Shopping / Google Product Category'] || row.category || '';
    const whatsapp = row.whatsapp_cta_link || '';

    // SEO optimization fallbacks
    const metaTitle = row['SEO Title'] || row.meta_title || '';
    const metaDesc = row['SEO Description'] || row.meta_description || row.seo_description || '';

    // Determine internal category name
    let categoryName = row.category || 'General';
    const gCat = String(googleCategory).toLowerCase();

    if (gCat.includes('power supplies') || gCat.includes('solar')) categoryName = 'Solar Power';
    else if (gCat.includes('cctv')) categoryName = 'CCTV';
    else if (gCat.includes('access control')) categoryName = 'Access Control';
    else if (gCat.includes('doors & gates') || gCat.includes('gate opener')) {
        if (name.toLowerCase().includes('gate')) categoryName = 'Gate Automation';
        else if (name.toLowerCase().includes('lock')) categoryName = 'Smart Door Locks';
        else categoryName = 'Access Control';
    }
    else if (gCat.includes('road flares') || gCat.includes('vehicle')) categoryName = 'Security Vehicle Equipment';
    else if (gCat.includes('security & surveillance') || gCat.includes('integrated')) categoryName = 'Integrated Security';

    const categoryMapping = {
        "Solar Power": "solar-power",
        "Access Control": "access-control",
        "CCTV": "cctv",
        "Gate Automation": "gate-automation",
        "Vehicle Access Control": "vehicle",
        "Integrated Security": "integrated",
        "Smart Door Locks": "door-locks",
        "Security Vehicle Equipment": "security-vehicle"
    };
    const categorySlug = categoryMapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');

    const priceStr = String(price).toLowerCase();
    const isQuote = priceStr.includes('quote') || priceStr === 'n/a' || priceStr === '' || priceStr === 'nan';

    const product = {
        product: name,
        description: description.replace(/<[^>]*>?/gm, ''),
        body_html: description,
        price: (price === 'nan' || !price) ? 'Get Quote' : price,
        photo_url: (image === 'nan' || !image) ? '' : image,
        category: categoryName,
        seo_description: metaDesc,
        meta_title: metaTitle,
        meta_description: metaDesc,
        whatsapp_cta_link: (whatsapp === 'nan') ? '' : whatsapp,
        product_slug: slug,
        google_product_category: googleCategory,
        condition: 'new',
        name: name,
        slug: slug,
        image: image === 'nan' ? '' : image,
        whatsapp: whatsapp === 'nan' ? '' : whatsapp,
        category_slug: categorySlug,
        seo: {
            meta_title: metaTitle,
            meta_description: metaDesc
        },
        availability: isQuote ? 'call-for-quote' : 'in-stock',
        stock_status: isQuote ? 'Call for Quote' : 'In Stock',
        has_valid_price: !isQuote
    };

    if (product.has_valid_price) {
        const cleanPrice = String(price).replace(/[₦,]/g, '');
        const numPrice = parseFloat(cleanPrice);
        if (!isNaN(numPrice)) product.price_numeric = numPrice;
    }

    return product;
  } catch (err) {
    return null;
  }
}
