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
import EditProfile from './compoonents/Profile/EditProfile';
import ScanQR from './compoonents/Vendor/ScanQR';
import ConfirmScan from './compoonents/Vendor/ConfirmScan.js';
import Four04 from './compoonents/extras/404';
// import QRscanner from './compoonents/Vendor/ScanQR';
import VendorMap from './compoonents/Vendor/VendorMap';
import VendorSignup from './compoonents/auth/VendorSignup';
import TempVendorSignup from './compoonents/auth/TempVendorSignup';
import useFetch from './compoonents/utils/UseFetch';
import VendorView from './compoonents/Layout/VendorView';
// import Loading from './compoonents/extras/Loading';
const App = () => {
  const { isVendor } = useGlobalContext()


  useFetch("/api/vendor/570c8161-d7fb-4c70-98f2-faa8c8898e07/")
  return (<>
    <Router>
      <Routes>
        <Route path="/vendor-signup" element={<TempVendorSignup />}> </Route>
        <Route path="/signup" element={<Signup />}> </Route>
        <Route path="/login" element={<Login />}> </Route>


        {isVendor === false ?
          <Route element={<LogInView />}>
            {/* user route */}
            <Route path="/" element={<Home />}> </Route>
            <Route path="/dashboard" element={<Dashboard />}> </Route>
            <Route path="/profile/:userid" element={<Profile />}> </Route>
            <Route path="/leaderbord" element={<Leaderboard />}> </Route>
            <Route path="/vendor/:vendorid" element={<VendorMap />}> </Route>
            <Route path="/scan" element={<ScanQR />}> </Route>
            <Route path="/scan/vendor" element={<ConfirmScan />}> </Route>
            <Route path="/profile/edit/:userid" element={<EditProfile />}> </Route>
            <Route path="/vendor" element={<Vendor />}> </Route>
          </Route>
          : <>
            {/* vendor route */}
            <Route path="/" element={<VendorView />}></Route>
          </>
        }

        <Route path="*" element={<Four04 />} ></Route>

      </Routes>

    </Router >
  </>)
};
function Temp() {

  const { uuid } = useGlobalContext()
  // const { isLoading, data, error } = useFetch(`/api/dashboard/`)
  // const { isLoading, data, error } = useFetch(`/api/vendor/${uuid}/`)
  // const { isLoading, data, error } = useFetch(`/api/vendor/${"7763a6b6-58a4-4ced-90f2-32443f5702ec"}/`)
  // const { isLoading, data, error } = useFetch(`/api/vendor/${uuid}/`)
  // console.log(data)
  return (<>
    <div>Under construction</div>

  </>


  )
}
export default App;
