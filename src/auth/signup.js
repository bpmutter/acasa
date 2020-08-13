import facebookSignup from './facebookSignup';
import googleSignup from './googleSignup';

export default async function createUserInDb(authResult){

      const authProvider = authResult.additionalUserInfo.providerId;
      switch(authProvider){
        case("facebook.com"):{
          return await facebookSignup(authResult);
        } default: {
          return await googleSignup(authResult);
        }
      }
     
}