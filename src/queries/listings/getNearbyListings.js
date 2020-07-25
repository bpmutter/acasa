import geoListings from '../../config/geofirestore';
import firebase from 'firebase';
import dateStringToObj from '../../utils/dateStringToObj';
const { map } = require("p-iteration");

export default async function getNearbyListings(lat, lng, kmDistance, hometype, startDate){
    const query = geoListings.near({
      center: new firebase.firestore.GeoPoint(lat, lng),
      radius: kmDistance || 15,
    });

    const res = await query.get();
    const resDocs = res.docs;

    let results = await map(resDocs, doc => doc.data());
    if (hometype && hometype.toLowerCase() !== "everything") {
      results = results.filter(
        (result) => result.type === hometype.toLowerCase()
      );
    }

    return {results}
    

    
}