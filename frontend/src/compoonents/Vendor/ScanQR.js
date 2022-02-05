import React, { useState, useEffect } from 'react';
import useGlobalContext from '../utils/Globalcontext';
import { useNavigate, Link } from "react-router-dom"
import QrScan from 'react-qr-scanner';
import "./ScanQR.css"
import useFetch from '../utils/UseFetch';
function isMobile() {
	const toMatch = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
	return toMatch.some((toMatchItem) => {
		return navigator.userAgent.match(toMatchItem);
	});
}
const ScanQR = () => {
	const navigate = useNavigate()

	useEffect(() => {
		document.title = "TripBee | Scan QR"
	}, [])
	return (
		<div className="add-vendor">

			<h2 className="outline-heading">QR Scanner</h2>
			<QRscanner />
			< button className="action-button ">
				<Link to="/">	Cancel Scan</Link>
			</button>
		</div>
	)
};

function QRscanner() {
	const navigate = useNavigate()
	const { access_token } = useGlobalContext()
	const [qrscan, setQrscan] = useState('No result');
	const [error, setError] = useState(false);//state for camera allowed
	useEffect(async () => {
		try {
			const res = await navigator.permissions.query({ name: "camera" })
			if (res.state !== "denied") return;
			setError(true)

		} catch (error) {
			if (error.name === "NotAllowedError") {
				setError(true)
			}
		}
	}, [])
	const ar = window.outerWidth / window.outerHeight
	const handleScan = async (data) => {
		console.log("data  ", data);
		// data = "7763a6b6-58a4-4ced-90f2-32443f5702ec"/* temp */
		// data = "75662d04-1fbe-4cdb-bf92-56025776a278"
		// data = "9e1d2255-ee2e-4877-865e-f3381c1eeeab"
		// f02db21c-f3d9-4fb7-ac47-14e154ee0cd0  /*   Hotel Atithi and Satkaar */
		// data = "d72cc8e2-4b07-4a01-a95c-945c26e7256d" /*   Fun Forest Resort */
		// data = "9e1d2255-ee2e-4877-865e-f3381c1eeeab"   /* The ice restro and bar */
		// data = "7f94ecad-f701-4f62-a352-1769de728e38"  /*   Gen Z Bakery Cafe */
		// data = "75662d04-1fbe-4cdb-bf92-56025776a278"  /*   The Chitwan Lodge */
		// "74452850 - d71d - 4270 - 9832 - 9ecffac0a6f2"  /*   The Raven Cafe */
		// data = "2bf6fc55-ae19-47fc-a351-05f42d79d60a"  /*   Panipuri Nation */
		// data = "11488800-9a53-4d92-a002-8c6a9a64581a"  /*   Hotel Everest Inn */

		if (data) {
			setQrscan(data)
			const vendorid = data;
			//validate vendorid
			if (true/* validate qr scanned data */) {
				//then redirect
				navigate(`/scan/vendor?id=${vendorid}`)
			}

			//TODO:add vendor
		}
	}

	const handleError = err => {
		if (err.name == "NotAllowedError") {
			alert("You must give camera permissions to scan QR. ")
			setError(true)
		}
	}
	return (
		<div className="qr-wrapper">


			{!error ?
				<div>
					<div className="qr-scanner">
						<QrScan
							delay={300}
							// scans every 'delay' milliseconds/
							onError={handleError}
							onScan={handleScan}
							style={{ objectFit: "fill", aspectRatio: `${window.outerWidth}/${window.outerHeight}` }}
						/>
					</div>
					<div className='scanning'>{qrscan === "No result" ? " Scanning ... " : qrscan}</div>
				</div> :
				<div className="instructions">
					<div className="access-error" >
						<h3> Camera Access is denied .</h3>
						<p>Please Provide Camera Camera Access and Try Again</p>
						<div>To give access, follow the following steps:</div>
					</div>
					{isMobile() ?
						<ol className='instructons' style={{ padding: "1rem" }}>
							<li data-outlined="false" className="">To the right of the address bar, tap More<strong>&nbsp;</strong>
								<strong>&#8942;  &gt;  Settings</strong>.</li>
							<li data-outlined="false" className="">Tap <strong>Site Settings</strong>.</li>
							<li data-outlined="false" className="">Tap <strong>Camera</strong>.</li>
							<li data-outlined="false" className="">Tap to turn the camera on or off.
								<ul>
									<li data-outlined="false" className="">If you see the site you want to use under <strong>Blocked</strong>, tap the site
										&nbsp;<strong>&gt;Access your Camera</strong>
										<strong>&gt;&nbsp;Allow</strong>.</li>
								</ul>
							</li>
						</ol> :
						<ol className='instructons' style={{ padding: "1rem" }}>
							<li>At the top right, click More
								<strong>&#8942;  &gt;   Settings</strong>.</li>
							<li>Click <strong>Privacy and security&nbsp;</strong>
								&gt;	&nbsp;<strong>Site settings</strong>&nbsp;
								&gt;
								&nbsp;<strong>Camera</strong> or <strong>Microphone</strong>.</li>
							<li>Select the option you want as your default setting.
								<ul>
									<li>Review your blocked and allowed sites.</li>
									<li><strong>To remove an existing exception or permission:</strong> To the right of the site, click Delete
										&gt;
										.</li>
									<li><strong>To allow a site that you already blocked: </strong>Under "Not allowed," select the site's name and change the camera or microphone permission to "Allow."</li>
								</ul>
							</li>
						</ol>
					}
				</div>}
		</div>
	);
}
isMobile()
export default ScanQR;
