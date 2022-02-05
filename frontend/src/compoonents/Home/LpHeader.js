import React from 'react';
import { Link } from "react-router-dom"
import intro from "./images/illustration-intro.png"

const LpHeader = () => {
	return (
		<header className="lp-header">

			<div className="lp-navbar-wrapper">
				<a href="#" className="lp-logo">TripBee</a>
				<ul className="lp-navbar">
					<li className='lp-large-screen-only'><a href="#features">Features</a></li>

					<li><Link to="/login">Login</Link></li>
				</ul>

			</div>
			<div className="lp-intro">

				<div className="lp-intro-content">
					{/* <h1 className="lp-text-light md">TripBee
					</h1> */}
					<p className='lp-subtitle'>
						You Visit We Reward
					</p>
					<p className='lp-subtext'>
						A step in Monetisation,  Digitalisation and Virtualisation of Nepali Tourism
					</p>
					<button className="lp-btn"><Link to="/signup"> Sign Up</Link></button>
				</div>
				<div className="lp-intro-img">
					<img src={intro} alt="intro image" className="lp-intro-img" />
				</div>
			</div>
		</header>
	)


};

export default LpHeader;
