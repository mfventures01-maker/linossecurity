const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFile = path.join(__dirname, '../data/products.csv');
const outputFile = path.join(__dirname, '../data/products.json');

const products = [];

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        // Map headers from the new user-provided CSV format
        const name = row.Title || row.product || '';
        const slug = row.Handle || row.product_slug || '';
        const description = row['Body (HTML)'] || row.description || '';
        const price = row['Variant Price'] || row.price || 'Get Quote';
        const image = row['Image Src'] || row.photo_url || '';
        const googleCategory = row['Google Shopping / Google Product Category'] || '';
        const whatsapp = row.whatsapp_cta_link || '';
        const metaTitle = row['SEO Title'] || '';
        const metaDesc = row['SEO Description'] || '';

        // Determine internal category name based on Google Category or Title keyword
        let categoryName = 'General';
        if (googleCategory.includes('Power Supplies')) categoryName = 'Solar Power';
        else if (googleCategory.includes('CCTV')) categoryName = 'CCTV';
        else if (googleCategory.includes('Access Control')) categoryName = 'Access Control';
        else if (googleCategory.includes('Doors & Gates')) {
            if (name.toLowerCase().includes('gate')) categoryName = 'Gate Automation';
            else if (name.toLowerCase().includes('lock')) categoryName = 'Smart Door Locks';
            else categoryName = 'Access Control';
        }
        else if (googleCategory.includes('Emergency Road Flares')) categoryName = 'Security Vehicle Equipment';
        else if (googleCategory.includes('Security & Surveillance')) categoryName = 'Integrated Security';

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
        const isQuote = priceStr.includes('quote') || priceStr === 'n/a' || priceStr === '';

        // Standardized Product Object
        const product = {
            // Core fields (User's SEO Format)
            product: name,
            description: description.replace(/<[^>]*>?/gm, ''), // Stripped for short desc
            body_html: description, // Preserved for detail page
            price: price,
            photo_url: image,
            category: categoryName,
            seo_description: metaDesc,
            meta_title: metaTitle,
            meta_description: metaDesc,
            whatsapp_cta_link: whatsapp,
            product_slug: slug,
            google_product_category: googleCategory,

            // Legacy compatibility fields
            name: name,
            slug: slug,
            image: image,
            whatsapp: whatsapp,
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
