import React from 'react';
import { Link } from 'react-router-dom';

const Four04 = () => {
	return (
		<div style={{ textAlign: "center", margin: "auto" }}>
			<div>
				<h1 style={{ letterSpacing: " 1rem ", fontSize: "4rem" }}>404</h1>
				<h4 style={{ letterSpacing: " 0.7rem ", fontSize: "3rem" }}>Page Not Found</h4>
			</div>
			<Link to="/" style={{ fontSize: "2rem", marginTop: "1rem" }}>Go Home</Link>


		</div>
	)
};

export default Four04;
