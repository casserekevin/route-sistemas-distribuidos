import React, { useState, useCallback, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api'

import Map from './components/Map'
import Searchies from './components/Searchies'

import './App.css';

import RouteService from './services/RouteService'

import { useDispatch, useSelector } from 'react-redux'
import { plusPoints, minusPoints } from './redux'



const libraries = ['places']
const App = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    })

    //redux
    const dispatch = useDispatch()

    
    
    const mapRef = useRef()
    const onLoad = useCallback((m) => {
        mapRef.current = m
        console.log('GoogleMap onLoad map: ', mapRef.current)
    
    }, [])
    const onUnmount = useCallback((m) => {
        mapRef.current.setMap(null)
        console.log('GoogleMap onUnmount map: ', mapRef.current)
    }, [])
    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({ lat, lng})
        mapRef.current.setZoom(11)
        console.log('panTo: ', mapRef.current)
    }, [])
    
    

    //botão calcular melhor rota
    const [buscarRota, setBuscarRota] = useState(false)
    const [bestRoute, setBestRoute] = useState(null)
    const handleGetBestRoute = async (e) => {
        let mapped_routes = points.map((element) => {
            let result = `${element.lat},${element.lng}`
            return result
        })
        let cities = {
            "cities": mapped_routes
        }

        await RouteService.getBestRoute(cities)
            .then((response) => {
            console.log(response)
            let path = response.data.individuo
            setBestRoute(path)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const points = useSelector((state) => state.route.points)

    const handlePlusPoints = () => dispatch(plusPoints())
    const handleMinusPoints = () => dispatch(minusPoints())

    // const [route, setRoute] = useState([
    //     {
    //         lat: undefined, 
    //         lng: undefined
    //     },
    //     {
    //         lat: undefined, 
    //         lng: undefined
    //     }
    // ])
    //select das pesquisas
    // const setRouteValue = (index, value) => {
    //     let new_route = [...route]
    //     new_route[index] = value
    //     setRoute(new_route)
    // }
    //botão mais
    // const handlePlusButton = (e) => {
    //     debugger
    //     const first = route[0]
    //     const last = route[route.length - 1]
    //     if((route.length < 24) && (first.lat !== undefined && first.lng !== undefined) && (last.lat !== undefined && last.lng !== undefined)){
    //         let new_route = [...route]
    //         new_route.push({lat: undefined, lng: undefined})
    //         setRoute(new_route)
    //     }
    // }
    //botão menos
    // const handleMinusButton = (e) => {
    //     debugger
    //     if(route.length > 2){
    //         let new_route = [...route]
    //         new_route.pop()
    //         setRoute(new_route)
    //     }
    // }

    if(loadError) return "Error loading maps"
    if(!isLoaded) return "Loading Maps"

    return (
            <div>
                <Searchies panTo={panTo}/>
                <button onClick={handlePlusPoints}>+</button>
                <button onClick={handleMinusPoints}>-</button>
                <button onClick={(e) => handleGetBestRoute(e)}>Calcular melhor rota</button>
                <Map
                    places={bestRoute}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    buscarRota={buscarRota}
                    setBuscarRota={setBuscarRota}
                />
            </div>

    );
}

export default App;