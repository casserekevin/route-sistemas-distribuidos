import { FETCH_BEST_ROUTE_ERROR, FETCH_BEST_ROUTE_SUCCESS, SET_SEARCH_FOR_ROUTE } from './routeTypes'


const initialState = {
    search_for_route: false,
    mapOptions: null,
    error: '',
}


const routeReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_BEST_ROUTE_SUCCESS:
            return {
                mapOptions: action.payload.mapOptions,
                error: ''
            }
            
        case FETCH_BEST_ROUTE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        
        case SET_SEARCH_FOR_ROUTE:
        return {
            ...state,
            search_for_route: action.payload
        }

        default:
            return state
    }


}

export default routeReducer