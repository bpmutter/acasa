import db from "../../config/firestoreDb";

export default async function getUserByUserName(username){ 
    const res = await db.collection('users').where('username', '==', username).get();
    if (res.empty) return null;

    const users = []
    res.forEach((doc) => {
      users.push(doc.data());
    });
    return users[0];

}