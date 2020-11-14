import { PLUS_POINTS, MINUS_POINTS, SET_POINT } from './pointTypes'


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


const pointReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLUS_POINTS:
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

export default pointReducer