// Fix duplicate baseUrl assignment and add proper fallback chain
const getBaseUrl = () => {
    return import.meta.env.VITE_BASE_URL || 
           'https://www.peridev.org' || 
           'https://afful-portfolio.deno.dev' || 
           'http://localhost';
};

export default getBaseUrl;