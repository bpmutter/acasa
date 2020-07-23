// import geofirestore from 'geofirestore';
import * as geofirestore from "geofirestore";

import firestore from './firestoreDb';

const GeoFirestore = geofirestore.initializeApp(firestore);

// Create a GeoCollection reference
const geoListings = GeoFirestore.collection("listings");

export default geoListings