# aCasa 
*Created by <a href="https://ben.perlmutter.io" target="_blank">Ben Perlmutter</a> - **<a target="_blank" href="acasa-bd3af.web.app">Live Site</a>***

#### Table of Contents
* [Non-Technical Overview](#non-technical-overview)
* [Technical Overview](#technical-overview)
* [Frontend](#frontend)
* [Backend](#backend)
* [Conclusion](#conclusion)

## Non-Technical Overview
aCasa is a platform for medium term furnished rentals. It's designed for when you're staying somewhere than a month, but you're not ready (or able) to find a real lease. 

Listings contain relevant info for medium-term stays that'd be less relevant for a short stay like WiFi speed, if there are roommates, LGBTQ+ friendliness and more. 

And because you probably want to talk directly with the person renting the home if you're staying for an extended period, aCasa provides you with the renter's contact information. This contrasts with the managed booking process that other services like Airbnb provide.

#### Core Features: 
* Create, edit, and delete listings 
* Create, edit, and delete user account 
* Listing pages with listing information and host contact info
* User pages with personal info, user's listings and contact info
* Location-based listing search 

## Technical Overview
While aCasa is primarily a portfolio piece (the source code is <a target="_blank" href="https://github.com/bpmutter/acasa">freely available on Github</a> after all), my general technical approach to this project was tackling it like I was making the MVP of a startup. 

With this MVP mindset, I focused on the following considerations: 
1. Design elegant UX without having a designer by leveraging open source UI libraries
2. Create scalable backend that could carry the application in it's current form until it would get enough revenue to hire a backend engineering team 

In the end, I used a React frontend and <a target="_blank" href="http://firebase.google.com/">Firebase</a> serverless backend to accomplish these goals. I elaborate on how I addressed these concerns in the following [Frontend](#frontend) and [Backend](#backend) sections.

#### Technologies Used at a Glance: 
* **React**: Frontend built using React in a `create-react-app` application. 
* **Material UI**: UI frame used for app design and functional components.
* **Firebase**: Firebase serverless backend with Firestore DB (noSQL), Firestore media hosting, Authorization, and Hosting.  
* **Google Maps Platform**: aCasa uses the Places, Autocomplete and Geolocation APIs of the Google Maps Platform to allow location-based querying and 
* **OAuth**: aCasa uses Firebase's built-in auth capabilities to integrate with OAuth providers Google and Facebook, with more to come. 
* A variety of other npm modules were used throughout the project. To name a few: `date-fns`, `p-iteration`, `lodash`, `uuid`, `query-string`, `react-helmet`, and more.

### Frontend 
To address the first point of creating an elegant design at low cost (time-wise and financially), I utilized the <a target="_blank" href="https://material-ui.com">Material UI</a> React component library. I also featured <a target="_blank" href="https://undraw.co/">unDraw</a> vector art throughout the site to give it a consistent visual language. 

The frontend is a fairly straightforward React application made using `create-react-app`. I leveraged the Material UI library as much as possible to streamline the development, so I could focus more on the functionality and less on how it looks—while also keeping it quite good looking. 

###### The homepage encapsulates the Material UI/unDraw UX of of aCasa
![aCasa homepage](/readme-assets/homepage.png)

#### Styling
For styling, I made extensive use of the the Material UI `makeStyles` function and it's built in `theme` object to create all the styles. This provides some pretty interesting functionality, like the ability to change the theme colors for the entire site with one line of code in the config file and dynamic resizing of elements based on screen size. 

###### Example usage of makeStyles and theme to dynamically render theming
```js
//located in /src/components/ProfileSettings.jsx
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
```
#### Forms 
Creating forms was by far the most time intensive part of this project. The forms are both particularly complicated, with a variety of different input types and quite long. The create/update listing forms have over 20 different fields! Material UI provides some awesome components from a standard input, to select-multi and autocomplete. But still wiring all of these up to the application in a modular manner took a significant amount of the project time. 

I'd estimate that creating the 'create listing' and all it's component inputs (which were then recycled throughout the site) took approximately 24 hours of coding time. 

###### Just a few of the many form fields on the add listing page
![add listing form feilds](/readme-assets/add-listing-form.png)

By their nature, creating big forms takes time, but I think the process could have been streamlined by using some 3rd-party React form library like `react-form`. In my next project I plan to implement a library like this from the get go. 

#### Firebase Integration 
As this is a serverless application, all the code lives within the client. To keep the application maintainable and testable, I made sure to separate that logic as much as I was able to, keeping all Firebase related things in the `/src/config` and `/src/queries` folders. 

#### State Management 
aCasa uses React Context to manage state. There wasn't much application-level state to manage, primarily just if the user is logged in and who they are. This light-weight state  needs lent itself well to the simplicity of React Context as a state management tool.

###### In the application context, function to get user from Firebase auth, set user in application state, and store user in local storage for when they return to site. 
```jsx
// located in /src/components/AppWithContext.js
const logIn = async () => {
        const user  = await loginFirebase();
        setUser(user);
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
    }
```

### Backend
To create a scalable backend for the application, I chose to use the Firebase serverless platform. 

#### Why Firebase? 
I would just like to disclaim that when I say Firebase is 'scalable', I know that its scalability has limits. But based on research, an application running Firebase is performant up to about 100,000 concurrent users makes DB requests. While this makes Firebase not an appropriate solution for enterprise applications, it's a good starting point for a startup. And as mentioned above, I went into this project with the mindset of creating a startup MVP. 

I also used Firebase with the idea that it'd be quicker than setting up a backend, allowing me to focus more on making an awesome frontend. On this count, I was a little overly optimistic about Firebase's ease of use. The documentation is really amazing for getting started, but falls off in detail fairly quickly, making certain fairly straight-forward operations, like bulk uploading images or setting up database rules, harder to figure out than they quite frankly should be. With that being said, at the end of the day, I don't think using Firebase took any longer than making y own backend would have taken. 

Given Firebase's scalability benefits, I think it was the appropriate design decision, even if there was a greater learning curve than I had anticipated. It also has some nice built in analytics and testing infrastructure that would facilitate the app continued development. Plus, I love to learn new technologies, and learning how to create a serverless application was really interesting. 

#### Firebase Authentication 
Firebase has a really powerful authentication system. I primarily utilized OAuth for users to log in, with Facebook and Google currently accepted providers. There is also the email/password login set up for the demo user. In a future release, I would like to further integrate more OAuth providers and email/password sign up/login. 

#### Firestore DB 
aCasa uses the Firebase Firestore DB. It's a fairly straightforward noSQL database. 

I also used the `geofirestore` npm package for querying listings based on location. Firestore doesn't support querying based on latitude and longitude (although it does support the Geopoint data type, just not any special querying based on it...maybe a feature for a future release). I needed to bring in `geofirestore` to act as a wrapper around my listings collection to make it easily queryable. 

There is also a users collection which is linked to the auth system via a `uid`, a unique identifier that the auth makes for all users. 

To protect user data, I added database rules to only let certain users perform certain actions. For instance, only a certain user (identified by the auth system) can edit their own listings or profile. In the near future, I'd like to add additional rules to ensure that users are only added the correct data types, because as it stands now a user can corrupt their own data, even if not other users'.

###### Example rules that block user from deleting or updating account that isn't their own
```js
 match /users/{userId} {
      allow read: if true;
      allow create: if request.auth != null;
      // only user can update their own information
      allow update, delete: if request.auth != null && request.auth.uid == userId;

    }
```

#### Firestore Media Storage
Site media, like user profile pictures and listing images are stored in Firebase's Firestore. It's a fairly straightforward media bucket system, similar to AWS S3 containers. 

## Conclusion
aCasa was a lot of fun to make. It's a product that I genuinely care about and want to exist in the world. 

As I've lived abroad for the past 4 years, I know how challenging it can be to find medium-term housing. As of now, you're basically stuck with either Airbnb, which is great but really more appropriate for short-term stays (less than 1 month) or scrolling through Facebook groups hoping you find something you like. I wanted to create a solution that would address this market gap, and I believe I've done a pretty decent job with aCasa. 

With that being said, I do not view aCasa as a finished product. Here are a couple of additional features I'd like to implement: 
* **Stripe Billing API**: It's not a real company unless you can charge people money for it. PAyment would be based on either a monthly fee or # of active listings 
* **Email notifications**: Integrate with a 3rd-party email provider service like Sendgrid to send users programmatic and marketing emails. 
* **Optimize Location-based search**: Right now much of the logic for location-based search occurs in the client. I would like to move that to a Firebase Cloud Function to make the solution more scalable as the application grows, and the number of responses per query increases. (In other words, the current solution works when there are 50 listings in NYC, but would break pretty quick if there are 50,000).
* **More Database rules**: Right now the database is secured such that a user cannot corrupt another user's data. They can however create some real chaos for their own account. This isn't a real problem now, when there is no billing and the application is a prototype, but more rules need to be added to make this a marketable product. 

Like any tech product, there is of course much, much more that I could add, but these are the main elements that I'd like to start with. 

