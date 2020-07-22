import db from "../../config/firestoreDb";

export default async function getListingById(id){ 
    const res = await db.collection('listings').doc(id).get();
    
    if (res.empty) {
      console.log("No matching documents.");
      return null;
    }
    console.log('RES DATA::', res.data());
    return res.data()

}