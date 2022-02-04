import React from 'react';
import "./AuthLayout.css"
import left from "../images/bee_left.png"
import middle from "../images/bee_middle.png"
import right from "../images/bee_right.png"
const AuthLayout = ({ children }) => {
	return (
		<div className="auth-layout">

			<section className="upper">

				<div className="logo-wrapper">
					<div className="images">
						<img src={left} className="left" alt="left" />
						<img src={middle} className="middle" alt="middle" />
						<img src={right} className="right" alt="right" />
					</div>

					<div className="logo-text">TripBee</div>

				</div>

				<div className="logo-subtext">You visit We reward</div>

			</section>

			{children}
		</div>
	)
};

export default AuthLayout;
