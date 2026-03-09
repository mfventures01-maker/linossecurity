export const BUSINESS_DETAILS = {
    name: 'LINOS E Security Services',
    legalName: 'LINOS E Security Ltd',
    address: '21 Blantyre Crescent, Off Ademola Adetokumbo Way, Wuse 2, Abuja, Nigeria',
    city: 'Abuja',
    state: 'FCT',
    zip: '900288',
    country: 'Nigeria',
    phone: '+234 806 942 3078',
    whatsapp: '2348069423078',
    email: 'info@linossecurity.com',
    website: 'https://linossecurity.com',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.822365451241!2d7.4727!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0af660946d47%3A0xe545c8501239ebf7!2s21%20Blantyre%20Crescent%2C%20Wuse%202%2C%20Abuja!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng',
    foundingYear: 2015,
    categories: [
        'Security System Supplier',
        'Security Equipment Installation',
        'CCTV Installer',
        'Access Control Installer',
        'Solar Power Installer',
        'Gate Automation Installer'
    ],
    socials: {
        facebook: 'https://facebook.com/linossecurity',
        instagram: 'https://instagram.com/linossecurity',
        linkedin: 'https://linkedin.com/company/linossecurity'
    }
};

export const WHATSAPP_LINKS = {
    general: `https://wa.me/${BUSINESS_DETAILS.whatsapp}`,
    orderMessage: (productName: string) =>
        `https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hello%20Linos%20Security%2C%0AI%20want%20to%20order%20or%20install%20the%20following%20product%3A%20${encodeURIComponent(productName)}`,
    serviceMessage: (serviceName: string) =>
        `https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hello%20Linos%20Security%2C%0AI%20want%20an%20estimate%20for%20the%20following%20service%3A%20${encodeURIComponent(serviceName)}`,
    locationMessage: (cityName: string) =>
        `https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hello%20Linos%20Security%2C%0AI%20am%20interested%20in%20security%20installation%20services%20in%20${encodeURIComponent(cityName)}`
};
