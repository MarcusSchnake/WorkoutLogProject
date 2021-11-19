import React, { useState, useEffect } from 'react';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';


function App() {

  const [sessionToken, setSessionToken] = useState('');// setting up token so it can be used by child components this and useEffect

  useEffect(() => {// useEffect is a hook that runs after the first render
    if(localStorage.getItem('token')){// if token is in local storage
      setSessionToken(localStorage.getItem('token'));// set session token to token in local storage
    }
  }, []);

  const updateToken = (newToken) => {// allows child components to update the token
    localStorage.setItem('token', newToken);// set token in local storage to new token
    setSessionToken(newToken);// set session token to new token
    console.log(sessionToken);// log session token
  }

  const clearToken = () => {// allows child components to clear the token
    localStorage.clear();// clear token in local storage
    setSessionToken('');// set session token to empty string
  }

  const protectedViews = () => {// protected views
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/>// if session token is equal to token in local storage, return workout index
    : <Auth updateToken={updateToken} />) // else return auth
  }

  return (
    <div>
      <SiteBar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
