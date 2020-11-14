import { PLUS_POINTS, MINUS_POINTS, SET_POINT } from './pointTypes'

export const plusPoints = () => {
    return {
        type: PLUS_POINTS
    }
}

export const minusPoints = () => {
    return {
        type: MINUS_POINTS
    }
}

export const setPoint = (index, value) => {
    return {
        type: SET_POINT,
        payload: {
            index: index,
            value: value
        }
    }
}