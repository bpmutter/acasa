import geoListings from '../../config/geofirestore';
import firebase from 'firebase';
import dateStringToObj from '../../utils/dateStringToObj';
const { map } = require("p-iteration");

export default async function getNearbyListings(lat, lng, kmDistance, hometype, startDate){
    console.log('additional params:: ',hometype, startDate)
    const query = geoListings.near({
      center: new firebase.firestore.GeoPoint(lat, lng),
      radius: kmDistance || 15,
    });

    const res = await query.get();
    const resDocs = res.docs;
    console.log('res docs', resDocs)

    let results = await map(resDocs, doc => doc.data());
    if (hometype && hometype.toLowerCase() !== "everything") {
      results = results.filter(
        (result) => result.type === hometype.toLowerCase()
      );
    }
    // if(startDate){
    //   let queryStart = dateStringToObj(startDate).getTime();
    //   results = results.filter((result) => result.start_date.toMillis() <= queryStart);
    // }
    console.log('RESULTS::', results)

    return {results}
    

    
}