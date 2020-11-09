/* global google */
import React from 'react';
const { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } = require("react-google-maps")




class MapDirectionsRenderer extends React.Component {
    state = {
      directions: null,
      error: null
    };
  
    componentDidMount() {
      const { places, travelMode } = this.props;
      
      const waypoints = places.map(p =>({
          location: {lat: p.lat, lng: p.lng},
          stopover: true
      }))
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
      
      
  
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            this.setState({ error: result });
          }
        }
      );
    }
  
    render() {
      if (this.state.error) {
        return <h1>{this.state.error}</h1>;
      }
      return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
    }
}


const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultCenter={{ lat:-29.7926, lng:-51.156879 }}
        defaultZoom={7}
        defaultOptions={{ disableDefaultUI: true, zoomControl: true }}
    >
        {
          // !!props.places && ( 
          //   props.places.map((places, index) => {
          //     const position = { lat: places.lat, lng: places.lng };
          //     return <Marker key={index} position={position} />;
          //   })
          // )
        }

        {
        !!props.places && (
          <MapDirectionsRenderer
              places={props.places}
              travelMode={google.maps.TravelMode.DRIVING}
          />)
        }
    </GoogleMap>
  ))
)

export default Map