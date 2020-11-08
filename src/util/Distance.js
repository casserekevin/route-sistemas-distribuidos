const mathjs = require('mathjs')

module.exports = function Distance() {
    
    this.generateDistanceDictionary = (individual_base, data_cities) => {

        let distances = {}

        for(let i = 0; i < data_cities.length; i++){
            let item = data_cities[i]

            distances = {...distances, [item.origin]: {}}
        }

        for(let i = 0; i < data_cities.length; i++){
            let item = data_cities[i]

            distances[item.origin] = { ...distances[item.origin], [item.destination]:  item.distanceValue}
        }

        return distances
    }
}