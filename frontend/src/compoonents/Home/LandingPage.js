import React from 'react';
import { Link } from 'react-router-dom';
const LandingPage = () => {
	return (<>

		<div>Welcome to Landing Page</div>

		<div>Lets Rock</div>
		<Link to="/login">Login</Link>

	</>
	);
};

export default LandingPage;
