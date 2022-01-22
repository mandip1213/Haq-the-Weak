import React from 'react';
import { Link } from "react-router-dom"
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from "./LandingPage"


const Home = () => {


	const { isLoggedIn, dispatch } = useGlobalContext()
	console.log("Home isLoggedIn", isLoggedIn);

	if (!isLoggedIn) {
		return (
			<LandingPage />
		)
	}
	return (
		<>

			<div>this is home page <br /> and <br /> you are seeing this because you are logged in</div>
			<button onClick={() => { dispatch({ type: "LOGOUT" }) }}>Logout</button>
		</>
	)
};


export default Home;
