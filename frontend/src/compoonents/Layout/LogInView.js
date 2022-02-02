import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from '../Home/LandingPage';
import { Outlet, useLocation, Navigate } from "react-router-dom"
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const LogInView = () => {
	const { isLoggedIn } = useGlobalContext()
	const { pathname } = useLocation()
	// console.log(window.geolocation.getCurrentPosition());

	if (!isLoggedIn && pathname !== "/") {
		return (
			<Navigate to="/" />)
	}

	if (!isLoggedIn && pathname === "/") {
		return (<LandingPage />)
	}

	return (
		<div className="container">
			<Sidebar />
			<div className="wrapper overflow-auto">
				<Header />
				<div className="outlet" style={{ flex: 1 }}>
					<Outlet />
				</div>
			</div>
		</div>
	)
};

export default LogInView;
