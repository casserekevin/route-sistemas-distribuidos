import { FETCH_BEST_ROUTE_SUCCESS, FETCH_BEST_ROUTE_ERROR, SET_SEARCH_FOR_ROUTE } from './routeTypes'

import RouteService from '../../services/RouteService'
import PointsValidation from '../../validations/PointsValidation'

import functionsTime from '../../utils/time'

const fetchBestRouteSuccess = (data) => {
    return {
        type: FETCH_BEST_ROUTE_SUCCESS,
        payload: data
    }
}

export const fetchBestRouteError = (error) => {
    return {
        type: FETCH_BEST_ROUTE_ERROR,
        payload: error
    }
}

export const fetchBestRoute = (ummaped_cities) => {

    return (dispatch) => {
        
        if(!PointsValidation.isValid(ummaped_cities)){
            functionsTime(() => dispatch(fetchBestRouteError("Without first and last point"))) 
        }
        else {
            let mapped_cities = ummaped_cities.map((element) => {
                return `${element.lat},${element.lng}`
            })
            let cities = {
                "cities": mapped_cities
            }
            
            RouteService.getBestRoute(cities)
            .then((response) => {
                let best_route = response.data.individuo
    
                let waypoints_mapped = best_route.map(p =>({
                    location: {lat: p.lat, lng: p.lng},
                    stopover: true
                  }))
                
                let origin = waypoints_mapped.shift().location
                let destination = waypoints_mapped.pop().location
                let waypoints = waypoints_mapped
    
                let data = {
                    mapOptions: {
                        origin: origin,
                        destination: destination,
                        waypoints: waypoints,
                        travelMode: 'DRIVING'
                    }
                }
                functionsTime(() => dispatch(fetchBestRouteSuccess(data))) 
                functionsTime(() => dispatch(setSearchForRoute(true)))
            })
            .catch((error) => {
                let errorMsg = error.message
                functionsTime(() => dispatch(fetchBestRouteError(errorMsg))) 
            })
        }
    }
}

export const setSearchForRoute = (data) => {
    return {
        type: SET_SEARCH_FOR_ROUTE,
        payload: data
    }
}