import React from 'react';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"

import useGlobalContext from "./compoonents/utils/Globalcontext"
import Signup from "./compoonents/auth/Signup"
import Login from "./compoonents/auth/Login"
import Dashboard from "./compoonents/Dashboard/Dashboard.js"


import Home from "./compoonents/Home/Home"
const App = () => {
  const { isLoggedIn } = useGlobalContext()
  // if(!isLoggedIn){
  //   return
  // }
  return (<>
    <Router>
      <Routes>

        <Route path="/" element={<Home />}> </Route>
        <Route path="/signup" element={<Signup />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/dashboard" element={<Dashboard />}> </Route>

      </Routes>

    </Router>

  </>)
};

export default App;
