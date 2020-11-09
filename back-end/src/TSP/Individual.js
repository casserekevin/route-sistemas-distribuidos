const _ = require('lodash')
const mathjs = require('mathjs')

module.exports = function Individual(individual, distance=null) {
    
    //Usa os pontos de um Array
    if(Array.isArray(individual)){
        this.points = individual
        this.size = individual.length
        if(individual.length > 0){
            this.initial_point = individual[0]
        }
    }
    else if(individual instanceof Individual){
        let new_individual = _.cloneDeep(individual)
        
        this.initial_point = new_individual.get_initial_point()
        this.points = new_individual.points

        this.points.shift()

        this.points = _.shuffle(this.points)

        this.points.unshift(this.initial_point)
        this.size = new_individual.get_size()
    }

    this.distance = distance

    this.fitness = Number.POSITIVE_INFINITY

    this.calculate_fitness = () => {
        let soma_distancias = 0
        for(let index_point_1 = 0; index_point_1 < this.size; index_point_1++){
            let index_point_2 = (index_point_1 + 1) % this.size

            let point_1 = this.points[index_point_1]
            let point_2 = this.points[index_point_2]

            console.log()
            soma_distancias += this.distance[point_1.get_name()][point_2.get_name()]
        }

        this.fitness = mathjs.round(soma_distancias, 4)
    }

    this.recombine = (other) => {
        let child_p1 = []
        let child_p2 = []

        let gene_a = _.random(1, this.size)
        let gene_b = _.random(1, this.size)

        let start_gene = Math.min(gene_a, gene_b)
        let end_gene = Math.max(gene_a, gene_b)

        child_p1.push(this.initial_point)
        for(let i = start_gene; i < end_gene; i++){
            child_p1.push(this.points[i])
        }
        child_p1 = new Individual(individual=child_p1, distance=null)


        for(let j = 0; j < other.get_size(); j++){
            let item = other.get_points()[j]
            if(!child_p1.exist_duplicated_point(item)){
                child_p2.push(item)
            }
        }
        child_p2 = new Individual(individual=child_p2, distance=null)

        let new_child = child_p1.add(child_p2)
        new_child.set_distance(this.distance)

        return new_child
    }

    this.exist_duplicated_point = (point) => {
        for(let i = 0; i < this.size; i++){
            if(this.points[i].equal(point)){
                return true
            }
        }

        return false
    }

    this.add = (other) => {
        let union = []
        for(let i = 0; i < this.size; i++){
            let point = this.points[i]
            union.push(point)
        }

        for(let i = 0; i < other.get_size(); i++){
            let point = other.get_points()[i]
            union.push(point)
        }

        let new_individual = new Individual(individual=union, distance=null)
        return new_individual
    }

    this.mutate = (mutate_rate=0.05) => {
        let random_number = _.random(0, 1, true)

        if(random_number <= mutate_rate){
            let gene_a = _.random(1, this.size - 1)
            let gene_b = _.random(1, this.size - 1)

            let point_aux = this.points[gene_a]
            this.points[gene_a] = this.points[gene_b]
            this.points[gene_b] = point_aux
        }

        return this
    }

    this.get_points = () => {
        return this.points
    }

    this.get_point_by_index = (index) => {
        return this.points[index]
    }

    this.get_size = () => {
        return this.size
    }
    
    this.get_initial_point = () => {
        return this.initial_point
    }

    this.get_fitness = () => {
        return this.fitness
    }

    this.set_distance = (distance) => {
        this.distance = distance
    }

    this.to_string = () => { 
        let string = '['
        for(let i = 0; i < this.size; i++){
            string += this.points[i].to_string()
            
            if (i < this.size - 1){
                string += ', '
            }
        }
        string += ']'
        return string
    }

    this.to_array = () => {
        let initial_point = undefined
        let array = []
        for(let i = 0; i < this.size; i++){
            initial_point = this.points[0].to_obj()
            array.push(this.points[i].to_obj())
        }
        array.push(initial_point)

        return array
    }
}