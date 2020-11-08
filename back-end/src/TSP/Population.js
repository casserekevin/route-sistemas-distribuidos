const _ = require('lodash')
const mathjs = require('mathjs')

const Individual = require('./Individual.js')

const Distance = require('../util/Distance.js')

module.exports = function Population(individual_base, population_size, data_cities) {

    //Criar Individuo base
    this.individual_base = new Individual(individual=individual_base, distances=null)
    
    console.log(`Pontos Iniciais: ${this.individual_base.to_string()}`)

    //Criar dicionário de distâncias
    const distanceObj = new Distance()
    this.distanceDictionary = distanceObj.generateDistanceDictionary(this.individual_base, data_cities)

    //Criar População de Individuos
    this.population_size = population_size
    this.individuals = []
    for(let i = 0; i < this.population_size; i++){
        let new_individual = new Individual(this.individual_base, this.distanceDictionary)
        this.individuals.push(new_individual)
    }

    this.calculate_fitness = () => {
        for(let i = 0; i < this.individuals.length; i++){
            this.individuals[i].calculate_fitness()
        }
        this.individuals = _.sortBy(this.individuals, [(obj) => { return obj.get_fitness()}])
    }

    this.select = (roulette, num_parents) => {
        let selected_parents = []
        for(let i = 0; i < num_parents; i++){
            let number = _.sample(roulette)
            selected_parents.push(this.individuals[number])
        }

        return selected_parents
    }

    this.get_size = () => {
        return this.population_size
    }

    this.get_best_individual = () => {
        return this.individuals[0]
    }

    this.get_medium_fitness = () => {
        let soma = 0
        for(let i = 0; i < this.population_size; i++) {
            soma += this.individuals[i].get_fitness()
        }

        return mathjs.round(soma / this.population_size, 4)
    }

    this.set_population = (new_population) => {
        this.individuals = new_population
    }
}