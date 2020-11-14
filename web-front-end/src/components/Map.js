import React, { useState, useCallback } from 'react';

import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import { useSelector, useDispatch } from 'react-redux'
import { setSearchForRoute, fetchBestRouteError } from '../redux'



const containerStyle = {
  width: "50vw", 
  height: "50vh", 
  marginLeft:"auto", 
  marginRight:"auto"
};

const center = {
  lat:-29.7926, 
  lng:-51.156879
}

const options_gm = { 
  disableDefaultUI: true, 
  zoomControl: true 
}

const Map = (props) => {
  //redux
  const dispatch = useDispatch()

  const mapOptions = useSelector((state) => state.route.mapOptions)
  const search_for_route = useSelector((state) => state.route.search_for_route)

  const handleSetSearchForRoute = (data) => dispatch(setSearchForRoute(data))
  const handleFetchBestRouteError = (error) => dispatch(fetchBestRouteError(error))



  const [ directions, setDirections ] = useState(null)



  const directionsServiceCallback = useCallback((response) => {
      console.log(response)
  
      if (response !== null) {
        if (response.status === 'OK') {
          debugger
          setDirections(response)
          handleSetSearchForRoute(false)
        } 
        else {
          debugger
          handleFetchBestRouteError(response)
        }
      }
    }, [])


  return (
  <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      options={options_gm}
      onLoad={props.onLoad}
      onUnmount={props.onUnmount}
  >
      { 
        (search_for_route) && ( 
          <DirectionsService
            // required
            options={mapOptions}
            // required
            callback={directionsServiceCallback}
            // optional
            onLoad={directionsService => {
              console.log('DirectionsService onLoad directionsService: ', directionsService)
            }}
            // optional
            onUnmount={directionsService => {
              console.log('DirectionsService onUnmount directionsService: ', directionsService)
            }}
          />
        )
      }

      {
        directions && (
          <DirectionsRenderer
            // required
            options={{ 
              directions: directions
            }}
            // optional
            onLoad={directionsRenderer => {
              console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
            }}
            // optional
            onUnmount={directionsRenderer => {
              console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
            }}
          />
        )
      }
  </GoogleMap>
  )
}


export default Map