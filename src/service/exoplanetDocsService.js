// Constants for this service
const HOST = "localhost";
const PORT = "3001";
const BASE_URL = `http://${HOST}:${PORT}`;   // https does not work.
const PATH_URL = 'data/exoplanet'
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

async function fetchExoplanetDocs(url, options) {
    const exoplanetDocs = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));
    return exoplanetDocs['data'];
}

async function getExoplanetDocs(planetName) {
    const url = `${BASE_URL}/${PATH_URL}/${planetName}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };
    return await fetchExoplanetDocs(url, options);
}

async function getExoplanetDocsAdvancedSearch(criteria) {
    const url = `${BASE_URL}/${PATH_URL}/advanced-search/`;
    const options = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(criteria)
    };
    return await fetchExoplanetDocs(url, options);
}

async function getRandomExoplanetDocs() {
    const url = `${BASE_URL}/${PATH_URL}/random-search/`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };
    return await fetchExoplanetDocs(url, options);
}

export {
    getExoplanetDocs,
    getRandomExoplanetDocs,
    getExoplanetDocsAdvancedSearch,
}