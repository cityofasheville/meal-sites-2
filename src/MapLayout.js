import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MapChangeView from './MapChangeView';
import LocationCard from './LocationCard';
import config from './config'; 

// function MapChangeView(props) {
//   const map = useMap();
//   map.setView(props.center, props.zoom);
//   return null;
// }

function MapLayout(props) {

  let mapCenter = [];
  if (props.filteredAreas.length === 1) {
    mapCenter = config.mapCenterRegions.filter( (region) => {
      return (region.name === props.filteredAreas[0]);
    });
    console.log('got ONE area filter');
    console.log(props.filteredAreas);
  } else {
    mapCenter = config.mapCenterRegions.filter( (region) => {
      return (region.name === 'area-default');
    });
    console.log('not a single area filter');
    console.log(props.filteredAreas);
  }

  console.log('CENTER WE GOT');
  console.log(mapCenter[0].centerPosition);

  let locationMarkers = props.filteredLocations.map( (location, i) => {
    let thisPosition = [location.wgs_y, location.wgs_x];
    let thisKey = `marker${i}`;

    // Custom marker trickery to use FA icons:
    // https://stackoverflow.com/a/52131216

    const iconMarkup = renderToStaticMarkup(<i className={location.serviceIcon} />);
    const customMarkerIcon = divIcon({
      html: iconMarkup,
    });

    // let addressQuery = encodeURIComponent(location.address);

    return(
      <Marker 
        key={thisKey} 
        center={thisPosition}
        position={thisPosition} 
        icon={customMarkerIcon}>
        <Popup minWidth='275' maxWidth='300'>
          <LocationCard location={location} context='map' />

          {/* <div className="card">
            <div className="card-body">
              <h5 className="card-header">{location.name}</h5>
              <div className="card-text">
                <p className={`m-0 p-0 ${location.serviceIcon.split(' ').pop()}`}>
                  {location.type}
                </p>
                <p>Dates: {location.daysOpen}
                  <br />Hours: {location.hoursOpen}
                  <br />Address:&nbsp;
                  <a 
                    className="map-link text-dark" 
                    href={`https://www.google.com/maps/search/${addressQuery}`} 
                    title={`View location of ${location.name} on a Google Map`} 
                    target="_blank" 
                    rel="noopener noreferrer">{location.address}</a>
                  
                </p>
              </div>
            </div>
          </div> */}

        </Popup>
      </Marker>
    );
  });

  // Use the below to set unique key for MarkerCluster
  // Reason: want clusters to clear and re-update when user-selected filters change
  // https://stackoverflow.com/a/67712170
  let dummyDate = new Date();
  let millisecondsNow = dummyDate.getMilliseconds();

  return(
    <MapContainer center={mapCenter[0].centerPosition} zoom={13} scrollWheelZoom={true}>
      <MapChangeView center={mapCenter[0].centerPosition} zoom={mapCenter[0].zoom} /> 
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup key={millisecondsNow}>
        {locationMarkers}
      </MarkerClusterGroup>;
    </MapContainer> 
  );
}

export default MapLayout;