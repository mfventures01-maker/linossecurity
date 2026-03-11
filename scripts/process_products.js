const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = path.join(__dirname, '../data/products.csv');
const outputFile = path.join(__dirname, '../data/products.json');

const products = [];

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        // Map headers from the new user-provided CSV format (supports multiple naming conventions)
        const name = (row.Title || row.product || row.product_name || row.installation_capacity || '').replace(/^"|"$/g, '').trim();
        const slug = (row.Handle || row.product_slug || '').trim();

        if (!name) {
            console.warn(`⚠️ Warning: Skipping row with missing product name: ${JSON.stringify(row).substring(0, 100)}...`);
            return;
        }

        if (!slug) {
            console.warn(`⚠️ Warning: Product "${name}" has no slug. Generating from name...`);
            // generate fallback slug if missing and needed for Next.js build
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

        // Determine internal category name based on Google Category or Title keyword
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

        // Map internal category name to slug
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

        // Clean price string for comparison
        const priceStr = String(price).toLowerCase();
        const isQuote = priceStr.includes('quote') || priceStr === 'n/a' || priceStr === '' || priceStr === 'nan';

        // Standardized Product Object
        const product = {
            // Core fields (User's SEO Format)
            product: name,
            description: description.replace(/<[^>]*>?/gm, ''), // Stripped for short desc
            body_html: description, // Preserved for detail page
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

            // Legacy compatibility fields
            name: name,
            slug: slug,
            image: image === 'nan' ? '' : image,
            whatsapp: whatsapp === 'nan' ? '' : whatsapp,
            category_slug: categorySlug,
            seo: {
                meta_title: metaTitle,
                meta_description: metaDesc
            },

            // Computed fields for UI logic
            availability: isQuote ? 'call-for-quote' : 'in-stock',
            stock_status: isQuote ? 'Call for Quote' : 'In Stock',
            has_valid_price: !isQuote
        };

        // Clean price for numeric products
        if (product.has_valid_price) {
            const cleanPrice = String(price).replace(/[₦,]/g, '');
            const numPrice = parseFloat(cleanPrice);
            if (!isNaN(numPrice)) {
                product.price_numeric = numPrice;
            }
        }

        products.push(product);
    })
    .on('end', () => {
        fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
        console.log(`✅ Successfully processed ${products.length} products to ${outputFile}`);
    });
