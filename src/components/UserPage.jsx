import React from 'react';
import MainContentWrapper from './MainContentWrapper';
import UserProfileInfo from './UserProfileInfo';

const ben = { 
    first_name: 'Ben',
    last_name: 'Perlmutter',
    date_added: new Date(),
    profile_picture: 'https://avatars0.githubusercontent.com/u/57849986?s=400&u=8897665d835d70b9b506b44e525eebcf0de3053e&v=4',
    location: {
        city: 'Medellin',
        country: 'Colombia',
    },
    contact: { 
        email:"ben@perlmutter.io",
        phone:"+1 (914) 589-5304",
        website: "https://ben.perlmutter.io",
        whatsapp:"+1 (914) 589-5304",
    },
    bio: `I’m a passionate software developer with an entrepreneurial and product-oriented mindset. I have experience building web applications with the MERN stack, Flask, Postgres and more. I love transforming an idea into a plan, and that plan into an application. Software development isn't just a job for me, but a vocation—it's my creative outlet and a way to add value to the world. I like to write words in addition to code. Check out my recent writings here: https://ben.perlmutter.io/blog`,
    languages: ['english', 'spanish'],
    listings: [],
}

export default function UserPage(){
    //do stuff

    return(
        <MainContentWrapper>
            <UserProfileInfo
                user={ben}
            />
        </MainContentWrapper>
    )
}