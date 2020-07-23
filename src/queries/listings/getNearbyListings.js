import geoListings from '../../config/geofirestore';
import firebase from 'firebase';
const { map } = require("p-iteration");

export default async function getNearbyListings(lat, lng, kmDistance=15){

    const query = geoListings.near({
      center: new firebase.firestore.GeoPoint(lat, lng),
      radius: kmDistance,
    });

    const res = await query.get();
    const resDocs = res.docs;
    console.log('res docs', resDocs)

    const results = await map(resDocs, doc => doc.data());
    console.log('RESULTS::', results)

    return {resDocs, results}
    

    
}