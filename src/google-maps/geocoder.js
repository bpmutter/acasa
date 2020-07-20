import Geocode from "react-geocode";
 
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBSHvxwJqoYbeiJTby6ijIkR74Bia1bJ0s");

// set response language. Defaults to english.
Geocode.setLanguage("en");

const geocodeFromLatLng = async (lat, lng) => { 
    
    try{ 
        const res = await Geocode.fromLatLng(lat, lng);
        const addressInfo = res.results[0];
        return addressInfo;
    } catch(err){
        console.error(err);
        return {error: err}
    } 
}

const geocodeFromAddress = async (addressStr) => {

    try{
        const res = await Geocode.fromAddress(addressStr);
        const geo = res.results[0].geometry;
        return geo;
    }catch(err){
        console.error(err);
        return {'error': err};
    }
}


export default {
  geocodeFromLatLng,
  geocodeFromAddress,
};