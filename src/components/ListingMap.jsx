import React, { useCallback, useState, useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import geocoder from '../google-maps/geocoder';
import mapTheme from '../map-styling.json'
import { CircularProgress } from '@material-ui/core';

const MapWithAMarker = withScriptjs(
  withGoogleMap(({ lat, lng }) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: lat, lng: lng }}
      defaultOptions={{ styles: mapTheme }}
    >
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  ))
);

export default function ListingMap({placeName, lat, lng, ...props}){
    return (
      <>
        {!lat || !lng ?(
            <div style={{width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress size={100}/>
            </div>
        ):(
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSHvxwJqoYbeiJTby6ijIkR74Bia1bJ0s&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: 400 }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={lat}
            lng={lng}
            {...props}
          />
        )}{" "}
      </>
    );
}