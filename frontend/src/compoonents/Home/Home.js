import React from 'react';
import { Link } from "react-router-dom"
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from "./LandingPage"
import URL from "../../baseurl"

const Home = () => {


	const { isLoggedIn, dispatch, access_token } = useGlobalContext()
	console.log("Home isLoggedIn", isLoggedIn);

	fetch(`${URL}/api/user/`, {
		headers: {
			"Authorization": `Beare ${access_token}`
		}
	})
		.then(res => res.json())
		.then(res => { console.log(res); })

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
