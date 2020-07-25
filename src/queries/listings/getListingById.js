import db from "../../config/firestoreDb";
import geoListings from '../../config/geofirestore';
export default async function getListingById(id){ 
    const res = await geoListings.doc(id).get();
    if (res.empty) return null;
    return res.data();
}