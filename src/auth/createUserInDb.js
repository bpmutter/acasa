

export default async function createUserInDb(user){
      const data = {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      };

      // Add a new document in collection "cities" with ID 'LA'
      const res = await db.collection("cities").doc("LA").set(data);
      // [END set_document]

      console.log("Set: ", res);
    }
}