import db from "../../config/firestoreDb";

export default async function getUserByUid(uid){ 
    const res = await db.collection('users').doc(uid).get();
    
    if (res.empty) return null;

    return res;

}