import { PLUS_POINTS, MINUS_POINTS, SET_POINT } from './routeTypes'


const initialState = {
    points: [
        {
            lat: undefined,
            lng: undefined
        },
        {
            lat: undefined,
            lng: undefined
        }
    ]
}


const routeReducer = (state = initialState, action) => {
    console.log(state)

    switch (action.type) {
        case PLUS_POINTS:
            debugger
            let first_point = state.points[0]
            let last_point = state.points[state.points.length - 1]
            if((state.points.length < 24) && (first_point.lat !== undefined && first_point.lng !== undefined) && (last_point.lat !== undefined && last_point.lng !== undefined)){
                let new_points = [...state.points]
                new_points.push({ lat: undefined, lng: undefined })
                return {
                    ...state,
                    points: new_points
                }
            }

            return state
            
        case MINUS_POINTS:
            debugger
            if((state.points.length > 2)){
                let new_points = [...state.points]
                new_points.pop()
                return {
                    ...state,
                    points: new_points
                }
            }

            return state

        case SET_POINT:
            debugger
            let new_points = [...state.points]
            new_points[action.payload.index] = action.payload.value
            return {
                ...state,
                points: new_points
            }

        default:
            return state
    }


}

export default routeReducer