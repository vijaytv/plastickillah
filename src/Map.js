import PropTypes from 'prop-types'
import React from 'react'
import {Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet' ;
import{ L } from 'leaflet'

var boatIcon = L.icon({
    iconUrl: 'ship.png',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const MyPopupMarker = ({ children, position }) => (
    <Marker position={position}>
    </Marker>
  )

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
      super()
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
      { key: 'marker2', position: [-5.2,-123.53] , icon: boatIcon},
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

