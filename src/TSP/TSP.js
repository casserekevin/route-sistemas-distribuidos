const Population = require('./Population.js')
const UtilFunctions = require('../util/UtilFunctions.js')

module.exports = function TSP(cities = null, population_size = 10, runs = 1000, mutate_rate = 5, data_cities=null) {
    if(cities === null){
        console.log('No cities...')
    }
    else {
        this.population = new Population(individual_base=cities, population_size, data_cities=data_cities)
    }

    this.population.calculate_fitness()

    this.runs = runs
    this.mutate_rate = mutate_rate

    this.run = () => { 
        console.log("Running...")

        let best_individuals_array = []
        let medium_fitness_array = []
        let runs_array = []

        let utilFunctions = new UtilFunctions()
        let roulette = utilFunctions.generate_roulette(this.population.get_size(), 20, 1)

        for(let i = 0; i < this.runs; i++){

            let new_population = []

            for(let x = 0; x < this.population.get_size(); x++){

                let parents = this.population.select(roulette, 2)
                let parent_1 = parents[0]
                let parent_2 = parents[1]

                let child = parent_1.recombine(parent_2)

                child = child.mutate(mutate_rate=this.mutate_rate)

                new_population.push(child)
            }

            this.population.set_population(new_population)
            this.population.calculate_fitness()

            best_individuals_array.push(this.population.get_best_individual())
            medium_fitness_array.push(this.population.get_medium_fitness())
        }

        let best_individual = utilFunctions.get_best_individual(best_individuals_array)
        console.log('Melhor indivíduo: ' + best_individual.to_string())
        console.log('Melhor indivíduo(fitness):', best_individual.get_fitness())
        
        console.log("End.")

        return {
            individuo: best_individual.to_array(),
            fitness: best_individual.get_fitness()
        }
    }
}