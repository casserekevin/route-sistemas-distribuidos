module.exports = function Point(name = null, lat = null, lng = null) {
    if(!(name === null) && !(lat === null) && !(lng === null)){
        this.name = name
        this.lat = lat;
        this.lng = lng;
    }

    this.get_name = () => {
        return this.name
    }

    this.get_lat = () => {
        return this.lat
    }

    this.get_lng = () => {
        return this.lng
    }

    this.equal = (other) => {
        if (!(other instanceof Point)){
            return false
        }

        return this.name === other.name
    }

    this.print = () => { 
        console.log(`Point ${this.name}: (${this.lat}, ${this.lng})`)
    }

    this.to_string = () => { 
        return `${this.name}`
    }

    this.to_obj = () => {
        return {
            lat: +this.lat,
            lng: +this.lng
        }
    }
}