import geoListings from '../../config/geofirestore';
import firebase from 'firebase';

export default async function getNearbyListings(location, kmDistance=15){
    const {lat, lng} = location.geometry.location;
    const query = geoListings.near({
      center: new firebase.firestore.GeoPoint(lat, lng),
      radius: kmDistance,
    });

    const res = await query.get();
    return res;
}