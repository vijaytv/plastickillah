import PropTypes from 'prop-types'
import React from 'react'
import {Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet' ;
import  Leaflet   from 'leaflet';
import firebase from './firebase.js';

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
        markers: []
      }
    }
    componentDidMount() {
        let markers = this.state.markers;
        firebase.database().ref('checkins/atlantic').once('value')
            .then( (snapshot) =>  {
                const boats = snapshot.val();
                const boatMarkers = Object.keys(boats)
                    .map(key => {
                        return ({
                            key,
                            position: [boats[key]['lat'],boats[key]['long']],
                            icon: boatIcon
                        });
            });
            markers.push(...boatMarkers);
            this.setState({markers});
        });

        firebase.database().ref('vortices/atlantic').once('value')
            .then( (snapshot) =>  {
                const vortices = snapshot.val();
                const vortexMarkers = Object.keys(vortices)
                    .map(key => {
                        return ({
                            key,
                            position: [vortices[key]['lat'],vortices[key]['long']],
                            icon: vortexIcon
                        });
            });
            markers.push(...vortexMarkers);
            this.setState({markers});
        });
    }
    render() {
    const center = [this.state.lat, this.state.lng]

      const position = [this.state.lat, this.state.lng];
      return (
        <Map center={center} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList markers={this.state.markers} />
      </Map>
      );
    }
  }

  export default MyMap;

