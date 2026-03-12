const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = path.join(__dirname, '../data/products.csv');
const outputFile = path.join(__dirname, '../data/products.json');

const products = [];

if (!fs.existsSync(inputFile)) {
    console.error(`❌ Error: Input file not found at ${inputFile}`);
    process.exit(1);
}

const stream = fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        try {
            // Map headers from the new user-provided CSV format (supports multiple naming conventions)
            const name = (row.Title || row.product || row.product_name || row.installation_capacity || '').replace(/^"|"$/g, '').trim();
            const slug = (row.Handle || row.product_slug || '').trim();

            if (!name) return;

            if (!slug) {
                const fallbackSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                row.product_slug = fallbackSlug;
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
                product_slug: slug || row.product_slug,
                google_product_category: googleCategory,
                condition: 'new',
                name: name,
                slug: slug || row.product_slug,
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

            products.push(product);
        } catch (err) {
            console.error(`❌ Error processing row: ${err.message}`);
        }
    })
    .on('error', (err) => {
        console.error(`❌ Stream Error: ${err.message}`);
        process.exit(1);
    })
    .on('end', () => {
        try {
            if (products.length === 0) {
                console.error('❌ Error: No products were processed. Check CSV format.');
                process.exit(1);
            }
            fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
            console.log(`✅ Successfully processed ${products.length} products to ${outputFile}`);
        } catch (err) {
            console.error(`❌ Error writing output file: ${err.message}`);
            process.exit(1);
        }
    });
