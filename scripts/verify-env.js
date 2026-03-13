if (!process.env.GOOGLE_SHEETS_PRODUCT_URL) {
    console.error('❌ ERROR: GOOGLE_SHEETS_PRODUCT_URL is not set');
    console.error('Please set this environment variable in Netlify');
    process.exit(1);
}
console.log('✅ Environment variables verified');
