import firebase from 'firebase';

export default async function deleteUserAuth(){
    try{
        const user = await firebase.auth().currentUser;
        await user.delete()
    } catch (err){ return }
}
