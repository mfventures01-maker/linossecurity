const fs = require('fs');
const path = require('path');
const https = require('https');

// The URL of your Google Sheets Web App (Deploy as Web App)
// You should set this in your environment variables as GOOGLE_SHEETS_PRODUCT_URL
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_PRODUCT_URL;

const outputFile = path.join(__dirname, '../data/products.json');

if (!GOOGLE_SHEETS_URL) {
    console.warn('⚠️  Warning: GOOGLE_SHEETS_PRODUCT_URL is not set.');
    console.log('Ensure you set it in your environment variables.');

    // Create an empty file if it doesn't exist to prevent import errors
    if (!fs.existsSync(outputFile)) {
        fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
        console.log(`✅ Created dummy ${outputFile} to prevent build errors.`);
    }

    process.exit(0);
}

console.log('📡 Fetching products from Google Sheets...');

https.get(GOOGLE_SHEETS_URL, (res) => {
    let data = '';

    // Handle redirects (Google Apps Script Web Apps often redirect)
    if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (res2) => {
            res2.on('data', (chunk) => { data += chunk; });
            res2.on('end', () => {
                saveData(data);
            });
        });
    } else {
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            saveData(data);
        });
    }

}).on('error', (err) => {
    console.error(`❌ Error fetching products: ${err.message}`);
    process.exit(1);
});

function saveData(jsonString) {
    try {
        const products = JSON.parse(jsonString);
        if (!Array.isArray(products)) {
            throw new Error('Response is not an array of products');
        }

        fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
        console.log(`✅ Successfully updated ${products.length} products to ${outputFile}`);
    } catch (err) {
        console.error(`❌ Error parsing or saving product data: ${err.message}`);
        console.log('Ensure your Web App URL is correct and returning valid JSON.');
        process.exit(1);
    }
}
