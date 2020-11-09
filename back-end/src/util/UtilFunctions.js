const Point = require('../TSP/Point.js')

const mathjs = require('mathjs')

module.exports = function UtilFunctions() {
    
    this.generate_roulette = (population_size, porcentagem_elitismo, forca_elitismo) => {
        let roulette = []
        
        let quociente = mathjs.round(100 / porcentagem_elitismo, 0) 
        let k = population_size / quociente

        for(let i = 0; i < population_size; i++){
            if(i < k){
                for(let j = 0; j < mathjs.round((population_size - i) * forca_elitismo, 0); j++){
                    roulette.push(i)
                }
            }
            else{
                for(let j = 0; j < population_size - i; j++){
                    roulette.push(i)
                }
            }
        }

        return roulette
    }

    this.get_best_individual = (list_individuos) => {
        let melhor_individuo = list_individuos[0]
        for( let i = 1; i < list_individuos.length; i++){
            if(list_individuos[i].get_fitness() < melhor_individuo.get_fitness()){
                melhor_individuo = list_individuos[i]
            }
        }
    
        return melhor_individuo
    }

    this.map_cities = (cities, data_cities) => {
        let reduced = []

        data_cities.forEach((item) => {
            let duplicated = reduced.findIndex((redItem) => {
                return item.origin.localeCompare(redItem.origin) == 0
            }) > -1
            
            if(!duplicated){
                reduced.push(item)
            }
        })

        let mapped_cities = reduced.map((element, index) => {
            let latLng = cities[index]
            let latLng_splitted = latLng.split(',', 2)
            let lat = latLng_splitted[0]
            let lng = latLng_splitted[1]
            return new Point(element.origin, lat, lng)
        })

        return mapped_cities
    }
}