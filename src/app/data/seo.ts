export let SEO = {
    home: {
        title: "Affordable, Accurate & Faster Pathology Laboratory Equipments | Livo",
        description: "Livo provides next-generation pathology laboratory equipment that delivers faster and accurate diagnosis. Harness the power of artificial intelligence in digital pathology.",
        keywords: "Pathology Laboratory Equipment",
        image: "https://livo.ai/assets/images/all-3.png",
        url: "https://livo.ai/",
        site_name: "Livo",
        type: "website",
        ld_json: `{
            "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "livo",
            "url": "https://livo.ai/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://livo.ai/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }`
    },
    a700: {
        title: "Boost Diagnostics with advanced Hematology analyzer | Livo",
        description: "Livo provides next-generation pathology laboratory equipment that delivers faster and accurate diagnosis. Harness the power of artificial intelligence in digital pathology.",
        keywords: "Hematology analyzer",
        image: "https://livo.ai/assets/images/wbc.jpg",
        url: "https://livo.ai/A700",
        site_name: "Livo",
        type: "website",
        ld_json: `{
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "A700",
            "image": "https://livo.ai/assets/images/A700.svg",
            "description": "Livo provides next-generation pathology laboratory equipment that delivers faster and accurate diagnosis. Harness the power of artificial intelligence in digital pathology.",
            "brand": "Livo"
          }`
    },
    rapid_stain: {
        title: "Simplify cell differentials with advanced Hematology stain | Livo",
        description: "Livo provides next-generation pathology laboratory equipment that delivers faster and accurate diagnosis. Harness the power of artificial intelligence in digital pathology.",
        keywords: "Hematology Stain",
        image: "https://livo.ai/assets/images/RapidStain.png",
        url: "https://livo.ai/rapid-stain",
        site_name: "Livo",
        type: "website",
        ld_json: `{
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Rapid Strain",
            "image": "https://livo.ai/assets/images/RapidStain.png",
            "description": "Livo provides next-generation pathology laboratory equipment that delivers faster and accurate diagnosis. Harness the power of artificial intelligence in digital pathology.",
            "brand": "Livo",
            "offers": {
              "@type": "AggregateOffer",
              "url": "",
              "priceCurrency": "INR",
              "lowPrice": "1620"
            }
          }
          `
    }
}