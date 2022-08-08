const express = require('express');
const router = express.Router();
const dataStoreService = require('../src/service/datastoreService');


router.get('/random-search', async (req, res, next) => {
    // First, build elasticsearch query
    const randomQuery = JSON.stringify(randomSearchQuery());

    // Then, send the query to elasticsearch
    const exoplanets = await dataStoreService.queryData(randomQuery)

    res.json({data: exoplanets});
});

/* GET an exoplanet data. */
router.get('/:planetName', async (req, res, next) => {
    // First, build elasticsearch query
    const planetNameQuery = JSON.stringify(buildQueryWithPlanetName(req.params.planetName));

    // Then, send the query to elasticsearch
    const exoplanets = await dataStoreService.queryData(planetNameQuery)

    res.json({data: exoplanets});
});

/* POST advanced search. */
router.post('/advanced-search', async (req, res, next) => {
    // on recupere le body => criteria
    const criteria = req.body;

    // Ensuite, avec ces criteres, on construit la requete
    const advancedQuery = JSON.stringify(buildAdvancedQuery(criteria));

    // executer la requete
    const exoplanets = await dataStoreService.queryData(advancedQuery);
    res.json({data: exoplanets});
});


function buildQueryWithPlanetName(id) {
    const decodedId = decodeURI(id);
    console.log(decodedId);
    return {
        "size": 50,
        "query": {
            "match": {
                "pl_name": {
                    "query": id,
                    "minimum_should_match": "100%"
                }
            }
        }
    };
}

function buildAdvancedQuery(criteria) {
    const keys = Object.keys(criteria);
    const conditions = keys.map((key) => {
                console.log("key: ", key, "value: ", criteria[key]);
                if (criteria[key].length > 1) {
                    return {
                        "range": {
                            [key]: {
                                "gte": parseInt(criteria[key][0]),
                                "lte": parseInt(criteria[key][1])
                            }
                        }
                    }
                } else {
                    return {
                        "match": {
                            [key]: {
                                "query": criteria[key].toString(),
                                "operator": "and"
                            }
                        }
                    }
                }
            }
        )
    ;
    console.log("conditions", conditions);

    return {
        "size": 50,
        "query": {
            "bool": {
                "must":
                conditions
            }
        }
    };
}


function randomSearchQuery() {
    return {
        "size": 4,
        "query": {
            "function_score": {
                "random_score": {}
            }
        }
    };
}

console.log(JSON.stringify(randomSearchQuery()));


module.exports = router;

