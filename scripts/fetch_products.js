const fs = require('fs');
const path = require('path');

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_PRODUCT_URL;
const outputFile = path.join(__dirname, '../data/products.json');

if (!GOOGLE_SHEETS_URL) {
    console.error('❌ Error: GOOGLE_SHEETS_PRODUCT_URL is not set.');
    process.exit(1);
}

const targetUrl = GOOGLE_SHEETS_URL.includes('?')
    ? `${GOOGLE_SHEETS_URL}&path=products`
    : `${GOOGLE_SHEETS_URL}?path=products`;

console.log('📡 Fetching products using native fetch...');

async function run() {
    try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const products = await response.json();
        if (!Array.isArray(products)) throw new Error('Response is not an array');

        fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
        console.log(`✅ Successfully synced ${products.length} products.`);
    } catch (err) {
        console.error(`❌ Fetch Error: ${err.message}`);
        process.exit(1);
    }
}

run();
