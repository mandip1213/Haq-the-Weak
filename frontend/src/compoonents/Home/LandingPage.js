import React, { useEffect } from 'react';
import LpHeader from "./LpHeader"
import LpFooter from "./LpFooter"
import LpCounter from "./LpCounter"
import LpFeatures from "./LpFeatures"
import "./css/style.css"
const LandingPage = () => {
	useEffect(() => {
		document.title = "TripBee | You Visit We Reward"
	}, [])
	return (<>
		<div className="lp">
			<LpHeader />
			<main>
				<LpFeatures />
				<LpCounter />
				<LpFooter />
			</main>

		</div>
	</>
	);
};

export default LandingPage;
