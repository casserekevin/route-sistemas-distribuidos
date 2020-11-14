import { combineReducers } from 'redux'
import pointReducer from './point/pointReducer'
import routeReducer from './route/routeReducer'

const rootReducer = combineReducers({
    point: pointReducer,
    route: routeReducer
})

export default rootReducer