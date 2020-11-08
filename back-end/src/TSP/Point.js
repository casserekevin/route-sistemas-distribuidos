module.exports = function Point(name = null, x = null, y = null) {
    if(!(name === null)){
        this.name = name
        this.x = x;
        this.y = y;
    }

    this.get_name = () => {
        return this.name
    }

    this.get_x = () => {
        return this.x
    }

    this.get_y = () => {
        return this.y
    }

    this.equal = (other) => {
        if (!(other instanceof Point)){
            return false
        }

        return this.name === other.name
    }

    this.print = () => { 
        console.log(`Point ${this.name}: (${this.x}, ${this.y})`)
    }

    this.to_string = () => { 
        return `${this.name}`
    }
}