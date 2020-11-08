const express = require('express');
const router = express.Router();

const TSP = require('../TSP/TSP.js')
const UtilFunctions = require('../util/UtilFunctions');

const distance = require('google-distance');
distance.apiKey = 'AIzaSyCfY0A5pNb_t2EhqSL5rVIZqiHGGPYbIvA';


router.get('/test', async (req, res) => {
    res.send("Testíng...")
})

router.post('/best', async (req, res) => {
    try{
        let cities = req.body.cities
        let dados = undefined

        distance.get(
            { 
                origins: cities,
                destinations: cities
            },
            function(err, data) {
                if (err) {
                    return res.status(404).send({ error: err });
                }
                else {
                    dados = data

                    //const initial_cities = [new Point('B', 66, 30), new Point('D', 50, 90), new Point('A', 33, 30), new Point('C', 82, 60), new Point('E', 17, 60)]
                    
                    const data_cities = dados.filter((element) => {
                        return (element.origin.localeCompare(element.destination) != 0)
                    })

                    let utilFunctions = new UtilFunctions()
                    let mapped_cities = utilFunctions.map_cities(cities, data_cities)

                    const tsp = new TSP(cities=mapped_cities, population_size=50, runs=500, mutation_rate=0.05, data_cities)

                    let result = tsp.run()
                    return res.status(200).send(result);
                }
            });
    }
    catch(err){
        return res.status(500).send({ error: 'Erro na requisição. Tente novamente mais tarde.' });
    }
})


module.exports = (app) => app.use('/route', router);