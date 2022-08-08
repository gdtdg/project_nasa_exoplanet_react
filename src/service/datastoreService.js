const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');

// Constants for this service
const HOST = "localhost";
const PORT = "9200";
const INDEX = "exoplanet_csv";
const BASE_URL = `https://${HOST}:${PORT}`;
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ZWxhc3RpYzo1anpSUUpwN05lbEV2d2VjdGtIbQ=='
};

async function queryData(query) {
    const url = `${BASE_URL}/${INDEX}/_search`;
    const httpsAgent = new https.Agent({rejectUnauthorized: false});
    const options = {
        method: 'POST',
        body: query,
        headers: HEADERS,
        agent: httpsAgent
    };
    const answerFromElasticsearch = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));

    const exoplanets = answerFromElasticsearch['hits']['hits'].map((obj) => obj._source);

    return exoplanets;
}

module.exports.queryData = queryData;

