
export default async function getGeographicPosition(setter){

    try {
        const { coords } = await getCurrentPosition();
        return coords;

        // Handle coordinates
    } catch (error) {
        // Handle error
        console.error(error);
        alert("You need to give aCasa access to your location to use this feature. If you'd prefer, you can also just search for your location in the search bar.")
    }  
    
}

function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

