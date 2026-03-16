if (!process.env.GOOGLE_SHEETS_PRODUCT_URL) {
    console.warn('⚠️ WARNING: GOOGLE_SHEETS_PRODUCT_URL is not set');
    console.warn('Falling back to local data/products.json');
    process.exit(0);
}
console.log('✅ Environment variables verified');
