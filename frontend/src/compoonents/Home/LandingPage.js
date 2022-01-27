import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (<>
		<div className="top">
			<div className="logo">logo</div>
			<nav>This si Landing Page</nav>
			<Link to="/login">Login</Link>
			<Link to="/dashboard">dashboard</Link>
		</div>
	</>
	);
};

export default LandingPage;
