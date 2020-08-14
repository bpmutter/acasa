import React, {useEffect, useState, useContext} from 'react';
import MainContentWrapper from './MainContentWrapper';
import UserProfileInfo from './UserProfileInfo';
import UserListings from './UserListings';
import data from '../testData';
import getUser from '../queries/users/getUserByUserName';
import {useParams, Redirect} from 'react-router-dom';
import dateFormatter from '../utils/dateFormatter';
import context from './Context';
import Head from './Head';

export default function UserPage(){
    //do stuff
    const {user: { username: usernameContext}} = useContext(context);
    
    const [user, setUser] = useState({
      first_name: "",
      languages: [],
      contact: {},
      uid: ''
    });
    const { username } = useParams();
    useEffect(() => {
      (async () => {
        const userFromUsername = await getUser(username);
        if (userFromUsername) {
          userFromUsername.joined = dateFormatter(userFromUsername.date_added);
        }
        setUser(userFromUsername);
      })();
    }, [username]);

    if(username === usernameContext){
        return(
            <div>
                <Redirect to="/profile"/>
            </div>
        )
    }

    if(user === null){ 
        return(<div>
            <Redirect to="/404"/>
        </div>)
    }
    

    return (
      <MainContentWrapper>
        {!!user.first_name && <Head 
            title={`${user.first_name} ${user.last_name}`}
            img={user.profile_picture}
            description={user.bio || ""}
        />}
        <UserProfileInfo user={user} username={username} />
        <UserListings user={user} />
      </MainContentWrapper>
    );
}