const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = path.join(__dirname, '../data/products.csv');
const outputFile = path.join(__dirname, '../data/products.json');

const products = [];

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        // Determine category slug
        const categoryName = row.category || 'General';
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

        // Clean and process each product
        const product = {
            // User's requested fields
            product: row.product || row.title || '',
            description: row.description || '',
            price: row.price || 'Call for Quote',
            photo_url: row.photo_url || row['Photo url'] || '',
            category: categoryName,
            seo_description: row.seo_description || row['seo_description'] || '',
            meta_title: row.meta_title || row['meta_title'] || '',
            meta_description: row.meta_description || row['meta_description'] || '',
            whatsapp_cta_link: row.whatsapp_cta_link || row['whatsapp_cta_link'] || 'https://wa.me/2348069423078',
            product_slug: row.product_slug || row['product_slug'] || '',
            json_ld_schema: {}, // Default empty since CSV might not have it yet

            // Computed fields for UI
            availability: determineAvailability(row.price),
            stock_status: getStockStatus(row.price),
            has_valid_price: hasValidPrice(row.price),

            // Legacy compatibility fields
            name: row.product || row.title || '',
            slug: row.product_slug || row['product_slug'] || '',
            image: row.photo_url || row['Photo url'] || '',
            whatsapp: row.whatsapp_cta_link || row['whatsapp_cta_link'] || 'https://wa.me/2348069423078',
            category_slug: categorySlug,
            google_product_category: row.google_product_category || '600',
            condition: 'new',
            seo: {
                meta_title: row.meta_title || row['meta_title'] || '',
                meta_description: row.meta_description || row['meta_description'] || ''
            }
        };

        try {
            if (row.json_ld_schema) {
                product.json_ld_schema = JSON.parse(row.json_ld_schema);
            }
        } catch (e) { }

        // Clean price for numeric products
        if (product.has_valid_price) {
            const cleanPrice = String(row.price).replace(/[₦,]/g, '');
            const numPrice = parseFloat(cleanPrice);
            if (!isNaN(numPrice)) {
                product.price_numeric = numPrice;
            }
        }

        products.push(product);
    })
    .on('end', () => {
        // Write to JSON file - Wrapped in object for legacy compatibility but also has flat structure if needed
        // However, the user's ProductPage expects it to be an array directly: `productsData as Product[]`
        // So I will output it as an array to satisfy the user's fix.
        // I will then update lib/products.ts to handle the array format.
        fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
        console.log(`✅ Successfully wrote ${products.length} products to ${outputFile}`);
    });

// Helper functions
function determineAvailability(price) {
    if (!price) return 'call-for-quote';
    const priceStr = String(price).toLowerCase();
    if (priceStr.includes('get quote') ||
        priceStr.includes('get a quote') ||
        priceStr.includes('quote') ||
        priceStr === 'n/a' ||
        priceStr === '') {
        return 'call-for-quote';
    }
    return 'in-stock';
}

function getStockStatus(price) {
    if (!price) return 'Call for Quote';
    const priceStr = String(price).toLowerCase();
    if (priceStr.includes('get quote') || priceStr.includes('quote')) {
        return 'Call for Quote';
    }
    return 'In Stock';
}

function hasValidPrice(price) {
    if (!price) return false;
    const priceStr = String(price).toLowerCase();
    return !(priceStr.includes('get quote') ||
        priceStr.includes('get a quote') ||
        priceStr.includes('quote') ||
        priceStr === 'n/a' ||
        priceStr === '');
}
