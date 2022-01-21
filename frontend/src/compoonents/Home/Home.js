import React from 'react';
import { Link } from "react-router-dom"
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from "./LandingPage"


const Home = () => {


	const { isLoggedIn } = useGlobalContext()
	console.log(isLoggedIn);
	if (!isLoggedIn) {
		return (
			<LandingPage />
		)
	}
	return <div>this is home page and you are seeing this because you are logged in</div>;
};

export default Home;
