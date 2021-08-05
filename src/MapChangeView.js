// import React from 'react';
import { useMap } from 'react-leaflet';

function MapChangeView(props) {
  const map = useMap();
  map.setView(props.center, props.zoom);
  return null;
}

export default MapChangeView;