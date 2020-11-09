import api from './api'

class RouteService {
    static getBestRoute(cities){
        return api.post('route/best', cities)
    }
}

export default RouteService