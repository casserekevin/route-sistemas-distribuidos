
class PointsValidation {
    static isValid(points){
        let first_point = points[0]
        let last_point = points[points.length - 1]
        if((first_point.lat === undefined || first_point.lng === undefined) || (last_point.lat === undefined || last_point.lng === undefined)){
            return false
        }
        
        return true
    }
}

export default PointsValidation