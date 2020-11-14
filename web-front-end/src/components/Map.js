import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';



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

const generate_options = (origin, destination, waypoints) => {
  return {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: 'DRIVING'
  }
}

const Map = (props) => {
  const [ origin, setOrigin ] = useState(null)
  const [ destination, setDestination ] = useState(null)
  const [ waypoints, setwaypoints ] = useState(null)
  const options_memo = useMemo(() => {
    return generate_options(origin, destination, waypoints)
  }, [origin, destination, waypoints])

  const [ directions, setDirections ] = useState(null)
  const [ error, setError ] = useState(null)

  

  //                        (bestRoute)
  // toda vez que atualizar props.places -> (origin, destination, waypoints) -> rerender <DirectionsService/> -> directionsServiceCallback -> (directions) -> rerender <DirectionsRenderer/>
  useEffect(() => {
    debugger
    if(props.places !== null){
      const { places } = props;
        
      let waypoints_mapped = places.map(p =>({
        location: {lat: p.lat, lng: p.lng},
        stopover: true
      }))
  
      setOrigin(waypoints_mapped.shift().location)
      setDestination(waypoints_mapped.pop().location)
      setwaypoints(waypoints_mapped)
  
      props.setBuscarRota(true)
    }
  },[props.places])


  const directionsServiceCallback = useCallback((response) => {
      console.log(response)
  
      if (response !== null) {
        if (response.status === 'OK') {
          setDirections(response)
          props.setBuscarRota(false)
        } 
        else {
          setError({ error: response });
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
        (props.buscarRota) && ( 
          <DirectionsService
            // required
            options={options_memo}
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