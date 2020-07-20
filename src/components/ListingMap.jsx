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

export default function ListingMap({placeName, latLng, ...props}){
    const [coords, setCoords] = useState([]);

    const getCoords = useCallback(async () => {
        const {
          location: { lat, lng },
        } = await geocoder.geocodeFromAddress(placeName);
        console.log(lat, lng);
        setCoords([lat, lng])
    }, placeName);

    useEffect(()=>{
        if(latLng){
            setCoords(latLng);
        } else {
            getCoords(placeName);
        }
    }, [])
    //todo: 
    //   get coords from location ID 
    //   add personal google maps key
    //   add custom theme to map
    
    return (
      <>
        {!coords.length ?(
            <div style={{width: '100%', height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress size={100}/>
            </div>
        ):(
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSHvxwJqoYbeiJTby6ijIkR74Bia1bJ0s&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: 400 }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={coords[0]}
            lng={coords[1]}
            {...props}
          />
        )}{" "}
      </>
    );
}