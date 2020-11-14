import { combineReducers } from 'redux'
import routeReducer from './route/routeReducer'

const rootReducer = combineReducers({
    route: routeReducer
})

export default rootReducer