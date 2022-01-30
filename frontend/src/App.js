import React from 'react';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"

import useGlobalContext from "./compoonents/utils/Globalcontext"
import Signup from "./compoonents/auth/Signup"
import Login from "./compoonents/auth/Login"
import Dashboard from "./compoonents/Dashboard/Dashboard.js"
import Home from "./compoonents/Home/Home"
import LogInView from './compoonents/Layout/LogInView';
import Vendor from './compoonents/Vendor/Vendor';
import Leaderboard from './compoonents/Leaderboard/Leaderboard';
import Profile from './compoonents/Profile/Profile';
import ScanQR from './compoonents/Vendor/ScanQR';


const App = () => {
  if (navigator.geolocation) {
    console.log("geoloactojn");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("latitude  ", position.coords.latitude)
      console.log("longitude  ", position.coords.longitude)
    });
  } else {

    console.log(" no geoloactojn");

  }
  const { isLoggedIn } = useGlobalContext()
  return (<>
    <Router>
      <Routes>

        <Route path="/signup" element={<Signup />}> </Route>
        <Route path="/login" element={<Login />}> </Route>

        <Route element={<LogInView />}>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/dashboard" element={<Dashboard />}> </Route>
          <Route path="/vendor" element={<Vendor />}> </Route>
          <Route path="/profile" element={<Profile />}> </Route>
          <Route path="/leaderbord" element={<Leaderboard />}> </Route>
          <Route path="/friends" element={<Temp />}> </Route>
          <Route path="/add" element={<ScanQR />}> </Route>
        </Route>


      </Routes>

    </Router>
  </>)
};

function Temp() {
  return (
    <div>Under construction</div>

  )
}
export default App;
