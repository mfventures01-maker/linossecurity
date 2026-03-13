const fs = require('fs');
const path = require('path');

const functions = {
    ecommerce: [],
    authentication: [],
    cms: [],
    api: [],
    utilities: []
};

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Detect ecommerce functions
            if (content.match(/product|cart|checkout|price|buy|order/i)) {
                functions.ecommerce.push(fullPath);
            }

            // Detect API functions
            if (fullPath.includes('/api/')) {
                functions.api.push(fullPath);
            }

            // Detect utilities
            const matches = content.match(/export (function|const) (\w+)/g);
            if (matches) {
                functions.utilities.push(...matches.map(m => `${fullPath}: ${m}`));
            }
        }
    });
}

walkDir('./app');
walkDir('./components');
walkDir('./lib');

console.log('=== FUNCTION MAP ===');
console.log(JSON.stringify(functions, null, 2));

const departments = {
    'Customer Facing': ['app/page.tsx', 'app/shop/page.tsx', 'app/product/'],
    'Admin/Management': ['app/admin/'],
    'API Services': functions.api,
    'Data Layer': functions.utilities.filter(f => f.includes('data') || f.includes('api') || f.includes('lib')),
    'UI Components': functions.utilities.filter(f => f.includes('component') || f.includes('components'))
};

fs.writeFileSync('function_map.json', JSON.stringify(functions, null, 2));
fs.writeFileSync('department_map.json', JSON.stringify(departments, null, 2));
