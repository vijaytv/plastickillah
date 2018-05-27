import PropTypes from 'prop-types'
import React from 'react'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
  FeatureGroup,
  LayerGroup,
  Rectangle,
  PropTypes
  as MapPropTypes } from 'react-leaflet' ;
import  Leaflet   from 'leaflet';
import firebase from './firebase.js';

const LeafIcon = Leaflet.Icon.extend({
  options: {
    iconSize: [20, 35 ]
  }
});

const boatIcon = new LeafIcon({iconUrl: 'ship.svg'});

//const vortexIcon = new LeafIcon({iconUrl: 'vortex.png', iconSize: [60,60]});

const MyPopupMarker = ({ position, icon, description }) => (
    <Marker position={position} icon={icon}>
      <Popup><span>{description}</span></Popup>
    </Marker>
  );
const CircleMarker = ({position}) => (
  <Circle center={position} color="#f00" fillColor="#00f" radius={100000} />
);

const rectangle = [[51.49, -0.08], [51.5, -0.06]]
const RectangleMarker = ({rectangle, description}) => (
  <FeatureGroup color="purple">
    <Popup>
      <span>{description}</span>
    </Popup>
    <Rectangle bounds={rectangle} color="#0f0" fillColor="red"/>
  </FeatureGroup>
);


  const MyMarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => {
      if (props.type === 'boat'){
        return <MyPopupMarker key={key} {...props} />
      }
      return <RectangleMarker key={key} {...props} />
     })
    return <div style={{ display: 'none' }}>{items}</div>
  }
  MyMarkersList.propTypes = {
    markers: PropTypes.array.isRequired,
  }

class MyMap extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        position: [-8.5863775, -124.6636522],
        zoom: 3,
        markers: []
      }
    }
    updateMap = (props) => {
      let markers = [];
      firebase.database().ref(`checkins/${props.vortex}`).once('value')
          .then( (snapshot) =>  {
              const boats = snapshot.val();
              const boatMarkers = Object.keys(boats)
                  .map(key => {
                      return ({
                          key,
                          position: [boats[key]['lat'],boats[key]['long']],
                          icon: boatIcon,
                          type: 'boat',
                          description: boats[key]['description'] || 'No Information on this ship'
                      });
          });
          markers.push(...boatMarkers);
          this.setState({markers});
      });

      firebase.database().ref(`vortices/${props.vortex}`).once('value')
          .then( (snapshot) =>  {
              const vortex = snapshot.val();
              const vortexMarkers = [{
                key: props.vortex,
                rectangle: [
                  [vortex['topleft']['lat'],vortex['topleft']['long']],
                  [vortex['bottomright']['lat'],vortex['bottomright']['long']]
                ],
                type: 'vortex',
                description: vortex['description'] || 'No Information on this vortex'
              }];
          this.setState({
            position: [vortex['topleft']['lat'], vortex['topleft']['long']]
          })
          markers.push(...vortexMarkers);
          this.setState({markers});
      });
    }
    componentDidMount() {
      this.updateMap(this.props)
    }
    componentWillReceiveProps(newProps) {
      this.updateMap(newProps);
    }
    shouldComponentUpdate() {
      return true;
    }
    render() {
      const center = this.state.position
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

