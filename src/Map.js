import PropTypes from 'prop-types'
import React from 'react'
import {Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet' ;
import  Leaflet   from 'leaflet';


const LeafIcon = Leaflet.Icon.extend({
  options: {
    iconSize: [20, 35 ]
  }
});

const boatIcon = new LeafIcon({iconUrl: 'ship.svg'});

const vortexIcon = new LeafIcon({iconUrl: 'vortex.png', iconSize: [60,60]});

const MyPopupMarker = ({ children, position, icon }) => (
    <Marker position={position} icon={icon}>
    </Marker>
  );

  const MyMarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => (
      <MyPopupMarker key={key} {...props} />
    ))
    return <div style={{ display: 'none' }}>{items}</div>
  }
  MyMarkersList.propTypes = {
    markers: PropTypes.array.isRequired,
  }

class MyMap extends React.Component {
    constructor() {
      super();
      this.state = {
        lat: -8.5863775,
        lng: -124.6636522,
        zoom: 3,
      }
    }

    render() {
    const center = [this.state.lat, this.state.lng]

    const markers = [
      { key: 'marker1', position: [-18.9,-124.63], icon: boatIcon },
      { key: 'marker2', position: [-5.2,-123.53] , icon: vortexIcon},
      { key: 'marker3', position: [ -12.58,-123.43] , icon: boatIcon},
    ]
      const position = [this.state.lat, this.state.lng];
      return (
        <Map center={center} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList markers={markers} />
      </Map>
      );
    }
  }

  export default MyMap;

