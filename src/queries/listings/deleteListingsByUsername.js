import db from "../../config/firestoreDb";
import firebase from "firebase";
import getListingsByUsername from './getListingsByHostUsername';
import deleteListing from './deleteListing';

const { forEach } = require("p-iteration");

export default async function deleteListingsByUsername(username) {
  try{
    await firebase.auth();
    const userListings = await getListingsByUsername(username);
    await forEach(userListings, listing => deleteListing(listing.id))


    return {message: {type: "success", content: "The listings have successfully been deleted."}}

  } catch(err){
      return {message: {type: "error", content: "there was a problem deleting your listings."}}
  }
  
};

// export default async function deleteCollection(username) {
//   const userListingsSnapshot = await await db
//     .collection("listings")
//     .where("owner.username", "==", username)
//     .get();
  
//   return new Promise((resolve, reject) => {
//     deleteQueryBatch(db, userListingsSnapshot, resolve).catch(reject);
//   });
// }

// async function deleteQueryBatch(db, snapshot, resolve) {
  
//   const batchSize = snapshot.size;
//   if (batchSize === 0) {
//     // When there are no documents left, we are done
//     resolve();
//     return;
//   }

//   // Delete documents in a batch
//   const batch = db.batch();
//   snapshot.docs.forEach((doc) => {
//     batch.delete(doc.ref);
//   });
//   await batch.commit();

//   // Recurse on the next process tick, to avoid
//   // exploding the stack.
//   process.nextTick(() => {
//     deleteQueryBatch(db, snapshot, resolve);
//   });
// }
