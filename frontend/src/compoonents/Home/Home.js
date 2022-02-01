import React from 'react';
import { Link } from "react-router-dom"
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from "./LandingPage"
import URL from "../../baseurl"
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import MainContainer from '../MainContainer/MainContainer';

const Home = () => {
	const { isLoggedIn, dispatch, access_token } = useGlobalContext()
	if (!isLoggedIn) {
		return (
			<LandingPage />
		)
	}
	return (
		<>

			<MainContainer />


		</>
	)
};


export default Home;
