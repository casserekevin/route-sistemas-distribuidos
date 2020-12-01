import React, { useCallback, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api'

import Map from './components/Map'
import Searchies from './components/Searchies'

import './App.css';

import { useDispatch, useSelector } from 'react-redux'
import { plusPoints, minusPoints, fetchBestRoute } from './redux'

import functionsTime from './utils/time'



const libraries = ['places']
const App = (props) => {
    //redux
    const dispatch = useDispatch()

    //load google api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    })


    
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
    


    const points = useSelector((state) => state.point.points)

    const handlePlusPoints = () => functionsTime(() => dispatch(plusPoints())) 
    const handleMinusPoints = () => functionsTime(() => dispatch(minusPoints())) 

    

    const handlefetchBestRoute = (points) => functionsTime(() => dispatch(fetchBestRoute(points))) 



    if(loadError) return "Error loading maps"
    if(!isLoaded) return "Loading Maps"

    return (
            <div>
                <div className="title_container">
                    <h1>Gerador de rotas</h1>
                </div>
                <Searchies panTo={panTo}/>
                <div className="buttons_container">
                    <div>
                        <button onClick={handlePlusPoints}>+</button>
                        <button onClick={handleMinusPoints}>-</button>
                        <button onClick={() => handlefetchBestRoute(points)}>Calcular melhor rota</button>
                    </div>
                </div>
                <Map
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                />
            </div>

    );
}

export default App;