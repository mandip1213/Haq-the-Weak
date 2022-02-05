import React from 'react';
import { Link } from "react-router-dom"
import placing from "./images/placing.svg"
import "./css/LpCounter.css"

const LpCounter = () => {
	return (<>
		<section className="lp-vendor">

			<div className="lp-container-vendor">

				<div className="lp-vendor-img">
					<img src={placing} alt="vendor" />
				</div>

				<div className="lp-vendor-content">
					<h1 className="lp-lg">Get Your Place a Wonderful Platform</h1>
					<p>
						Get connected with TripBee as a Partner and Join us in the Adventure to Digitalize the Nepalese Tourism!
					</p>

					<Link to="/vendor-signup">Sign Up as a Vendor <i className="fas fa-arrow-circle-right"></i
					></Link>
				</div>

			</div>

		</section>
		{/* <!-- Stay Productive Section Ends-- > */}
		<section className="lp-counter">
			{/* <!-- TODO counters --> */}
			<div className="counter-element">
				<div className="number" id="users-count">102</div>
				<div className="number-label">users</div>
			</div>

			<div className="counter-element">
				<div className="number" id="scans-count">1374</div>
				<div className="number-label">scans</div>
			</div>

			<div className="counter-element">
				<div className="number" id="vendors-count">77 </div>
				<div className="number-label">vendors</div>
			</div>


		</section></>)
};

export default LpCounter;
