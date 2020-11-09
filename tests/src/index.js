import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './Map'
import reportWebVitals from './reportWebVitals';

const googleMapsApiKey = "AIzaSyCfY0A5pNb_t2EhqSL5rVIZqiHGGPYbIvA"

const App = (props) => {
  const {places} = props;

  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom
  } = props;

  return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={places}
      loadingElement={loadingElement || <div style={{height: `100%`}}/>}
      containerElement={containerElement || <div style={{height: "80vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
      defaultZoom={defaultZoom || 11}
    />
  );
};

const places = [
  {latitude: 25.8103146,longitude: -80.1751609},
  {latitude: 27.9947147,longitude: -82.5943645},
  {latitude: 28.4813018,longitude: -81.4387899}
]

ReactDOM.render(
  <React.StrictMode>
    <App defaultZoom={7} places={places}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
