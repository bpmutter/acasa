import React, {useEffect, useState} from 'react';
import MainContentWrapper from './MainContentWrapper';
import UserProfileInfo from './UserProfileInfo';
import UserListings from './UserListings';
import data from '../testData';
import getUser from '../queries/getUserByUserName';
import {useParams} from 'react-router-dom';
const ben = data.ben;
const listings = data.listings;

export default function UserPage(){
    //do stuff
    const [user, setUser] = useState({});
    const { username } = useParams();
    useEffect(()=>{
       (async()=> {
           const userFromUsername = await getUser(username);
           setUser(userFromUsername) 
        })();
    },[username])
    // const user = getUser(username);
    console.log('USER in state:',user);
    const userVal = user || ben;
    return(
        <MainContentWrapper>
            <UserProfileInfo
                user={userVal}
            />
            <UserListings user={ben} listings={listings}/>

        </MainContentWrapper>
    )
}