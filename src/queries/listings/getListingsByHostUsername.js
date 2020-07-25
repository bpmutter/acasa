import db from "../../config/firestoreDb";

export default async function getUserByUserName(username){ 
    const res = await db.collection('listings').where('owner.username', '==', username).get();
    
    if (res.empty) return null;
    
    const listings = []
    res.forEach((doc) => {
      listings.push(doc.data());
    });
    return listings;

}