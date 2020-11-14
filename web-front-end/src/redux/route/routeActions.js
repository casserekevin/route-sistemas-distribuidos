import { PLUS_POINTS, MINUS_POINTS, SET_POINT } from './routeTypes'

export const plusPoints = () => {
    debugger
    return {
        type: PLUS_POINTS
    }
}

export const minusPoints = () => {
    debugger
    return {
        type: MINUS_POINTS
    }
}

export const setPoint = (index, value) => {
    debugger

    return {
        type: SET_POINT,
        payload: {
            index: index,
            value: value
        }
    }
}