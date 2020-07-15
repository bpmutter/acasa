import React from 'react';
import MainContentWrapper from './MainContentWrapper';
import UserProfileInfo from './UserProfileInfo';
import UserListings from './UserListings';
import data from '../testData';

const ben = data.ben;
const listings = data.listings;

export default function UserPage(){
    //do stuff

    return(
        <MainContentWrapper>
            <UserProfileInfo
                user={ben}
            />
            <UserListings user={ben} listings={listings}/>

        </MainContentWrapper>
    )
}