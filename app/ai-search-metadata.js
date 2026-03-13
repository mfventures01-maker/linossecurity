export const aiSearchMetadata = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://linosessecurity.com/#organization",
            "name": "Linos E' Security Ltd",
            "url": "https://linosessecurity.com",
            "logo": "https://linosessecurity.com/logo.png",
            "description": "Premier security and solar solutions provider in Nigeria",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-806-942-3078",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hausa", "Yoruba", "Igbo"]
            }
        },
        {
            "@type": "WebSite",
            "@id": "https://linosessecurity.com/#website",
            "url": "https://linosessecurity.com",
            "name": "Linos E' Security",
            "description": "Security Systems, Solar Power, CCTV, Access Control in Nigeria",
            "publisher": {
                "@id": "https://linosessecurity.com/#organization"
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://linosessecurity.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        }
    ]
};
