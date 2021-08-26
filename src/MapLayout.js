import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import config from './config'; 
import MapChangeView from './MapChangeView';
import LocationCard from './LocationCard';
import ToggleViewButton from './ToggleViewButton';


class MapLayout extends React.Component {

  constructor(props) {
    super(props);
    this.mapRef = null;
  }

  componentDidUpdate() {
    // Need the leaflet container to re-size itself when "show/hide list" toggle happens
    if (this.mapRef !== null) {
      this.mapRef.invalidateSize();
    }
  }

  render() {

    let mapCenter = [];
    // Use region-specific center unless more than one region is selected, then use default center
    if (this.props.filteredAreas.length === 1) {
      mapCenter = config.mapCenterRegions.filter( (region) => {
        return (region.name === this.props.filteredAreas[0]);
      });
    } else {
      mapCenter = config.mapCenterRegions.filter( (region) => {
        return (region.name === 'area-default');
      });
    }

    let locationMarkers = this.props.filteredLocations.map( (location, i) => {
      let thisPosition = [location.wgs_y, location.wgs_x];
      let thisKey = `marker-${location.OBJECTID}`;

      // Custom marker trickery to use FA icons:
      // https://stackoverflow.com/a/52131216

      const iconMarkup = renderToStaticMarkup(<i className={location.serviceIcon} />);
      const customMarkerIcon = divIcon({
        html: iconMarkup,
      });

      // Adding eventHandlers to markers below to address Safari issue:
      // https://github.com/Leaflet/Leaflet/issues/7331#issuecomment-862519242
      return(
        <Marker 
          key={thisKey} 
          // center={thisPosition}
          position={thisPosition} 
          icon={customMarkerIcon}
          eventHandlers={{ click: function(e) {this.openPopup();} }}
        >
          <Popup minWidth='275' maxWidth='300'>
            <LocationCard location={location} context='map' />
          </Popup>
        </Marker>
      );
    });

    // Use the below to set unique key for MarkerCluster
    // Reason: want clusters to clear and re-update when user-selected filters change
    // https://stackoverflow.com/a/67712170
    let dummyDate = new Date();
    let millisecondsNow = dummyDate.getMilliseconds();
    let toggleIcon = 'fas fa-angle-double-right me-1';
    let toggleText = 'Show List';

    if (this.props.showList) {
      toggleIcon = 'fas fa-angle-double-left me-1';
      toggleText = 'Hide List';
    }

    return(
      <MapContainer 
        center={mapCenter[0].centerPosition} 
        zoom={13} 
        scrollWheelZoom={true} 
        minZoom={11} 
        maxZoom={18} 
        zoomControl={false}
        whenCreated={map => {
          // https://sean-rennie.medium.com/migrating-react-leaflet-from-v2-to-v3-12d6088af191 (explains new ref-less map control options)
          // https://github.com/PaulLeCam/react-leaflet/issues/841#issuecomment-779048091 (example of using whenCreated prop of MapContainer)
          console.log('trying to invalidate')
          this.mapRef = map;
        }}
        >
        <MapChangeView center={mapCenter[0].centerPosition} zoom={mapCenter[0].zoom} /> 
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup key={millisecondsNow}>
          {locationMarkers}
        </MarkerClusterGroup>
        <ToggleViewButton
          toggleHandler={this.props.toggleHandler}
          title={toggleText}
          icon={toggleIcon}
          showList={this.props.showList}
        />
        <ZoomControl position="topright" />
      </MapContainer> 
    );
  }
}

export default MapLayout;