// import React from 'react';
import { useMap } from 'react-leaflet';

function MapChangeView(props) {
  const map = useMap();
  map.invalidateSize();
  map.setView(props.center, props.zoom);
  console.log('Map Center and Zoom Reset');
  return null;
}

export default MapChangeView;