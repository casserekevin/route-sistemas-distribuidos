import React, { useState } from 'react';
import {formatRelative} from 'date-fns'

import Map from './components/Map'

import './App.css';

import RouteService from './services/RouteService'




const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const cities = {
  "cities": ["-29.6606604,-50.9914447", "-28.259575,-52.4076388", "-28.2929266,-52.7907172", "-28.9362514,-51.5483097", "-28.846939,-51.894133", "-28.783507,-51.607717", "-28.444642,-52.202480", "-28.208946,-51.523966", "-27.888605,-52.227648", "-27.635588,-52.269768"]
}


const App = (props) => {
  const [bestRoute, setBestRoute] = useState(null)

  const handleGetBestRoute = async (e) => {
    await RouteService.getBestRoute(cities)
        .then((response) => {
          console.log(response)
          let path = response.data.individuo
          debugger
          setBestRoute(path)
        })
        .catch((error) => {
          debugger
            console.log(error)
        })
  }

  return (
        <div>
            <button onClick={(e) => handleGetBestRoute(e)}>Calcular melhor rota</button>
            <Map
                googleMapURL={'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey + '&libraries=geometry,drawing,places'}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{width: "50vw", height: "50vh", marginLeft:"auto", marginRight:"auto"}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                places={bestRoute}
            />
        </div>

  );
}

export default App;