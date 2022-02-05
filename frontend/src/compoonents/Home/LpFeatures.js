import React from 'react';
import scanning from "./images/scanning.png"
import explore from "./images/explore.png"
import share from "./images/share-01.png"
import gifts from "./images/gifts-01.png"
import "./css/LpFeature.css"


const LpFeatures = () => {
	return (<section className="lp-features" id="features">
		<div className="lp-features-items">
			<div className='lp-upper'>
				<div className="lp-single-feature">

					<img src={scanning} alt="icon-access-anywhere" className="lp-feature-img" height="200" />
					<h2>Scan, Get Rewarded</h2>
					{/* <p>
						2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.
					</p> */}
				</div>

				<div className="lp-single-feature">
					<img src={explore} alt="icon-access-anywhere" className="lp-feature-img" width="200" />
					<h2>Explore New Locations</h2>
					{/* <p>
						2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.
					</p> */}
				</div>
			</div>
			<div className="lp-lower">

				<div className="lp-single-feature">
					<img src={share} alt="icon-access-anywhere" className="lp-feature-img" height="250" />
					<h2>Share your Travel </h2>
					{/* <p>
						Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.
					</p> */}
				</div>

				<div className="lp-single-feature">
					<img src={gifts} alt="icon-access-anywhere" className="lp-feature-img" height="250" />
					<h2>Offers and Gift Vouchers</h2>
					{/* <p>
						Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all file types to be securely stored and shared.
					</p> */}
				</div>
			</div>
		</div>
	</section>)
}

export default LpFeatures;
