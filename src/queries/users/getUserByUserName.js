import db from "../../config/firestoreDb";

export default async function getUserByUserName(username){ 
    const res = await db.collection('users').where('username', '==', username).get();
    if (res.empty) {
      console.log("No matching documents.");
      return null;
    }
    console.log('RES::', res)
    const users = []
    res.forEach((doc) => {
      console.log(doc.data());
      users.push(doc.data());
    });
    return users[0];

}