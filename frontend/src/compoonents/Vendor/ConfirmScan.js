import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../extras/Loading';
import useFetch from '../utils/UseFetch';
import { Stars } from "../Home/Home"
import "./ConfirmScan.css"
import PostRequest from '../utils/PostReq';
import useGlobalContext from '../utils/Globalcontext';

const ConfirmScan = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const vendorid = searchParams.get("id")
	const { access_token } = useGlobalContext()
	const { isLoading, data, error } = useFetch(`/api/vendor/${vendorid}/`)
	const [scanInput, setScanInput] = useState({ rating: 3, privacy: "public" });
	const [_error, setError] = useState("");
	useEffect(() => {
		document.title = "TripBee | Confirm Scan"
	}, [])
	const handleChange = ({ target: { name, value } }) => {
		setScanInput({ ...scanInput, [name]: value })
	}
	const confirmScan = async () => {

		const res = await PostRequest({
			endpoint: `/api/visit/`, access_token: access_token, options: {
				body: JSON.stringify({
					vendor: vendorid,
					rating: scanInput.rating,
					public: true
				})
			}
		})
		console.log("addded res", res)
		navigate("/dashboard")
		if (res === 1) {
			//success
			console.log("succerss")
		} else {
			//failure
			console.log("faiolue")
			setError("Sorry The Vendor QR couldnot be scanned.")
		}
	}

	if (isLoading) return (<div className="confirm-scan--">
		<h2 className="outline-heading">Confirm Scan</h2><Loading />
	</div>)
	if (error) return (<div className="confirm-scan--">
		<h2 className="outline-heading">Confirm Scan</h2>
		<div className='loading-error'>{error}</div>
	</div>)
	const { contact, id, image, latitude, location, longitude, name, rating, type_of_place } = data;
	return (<>
		<div className="confirm-scan--">
			<h2 className="outline-heading">Confirm Scan</h2>
			<div className="mmmm confirm-header--">
				<div className="vendor__main">
					<div className="name">{name}</div>
					<div className="type_of_place">{type_of_place}</div>
				</div>
				<div className="rating"><Stars ratings={rating ? rating : Math.floor(Math.random() * 3) + 2} /></div>
			</div>

			<div className="mmmm location">
				{location}
				<svg
					className="location-icon"
					viewBox="0 0 395.71 395.71"
					fill="currentColor"
				>
					<path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
				</svg>
			</div>

			{contact && <div className="mmmm contact">{contact}</div>}


			<div className="form-type">
				<div className="mmmm privacy">
					<label htmlFor="privacy">Privacy</label>

					<select name="privacy" id="privacy"
						value={scanInput.rating}
						onChange={handleChange}
					>
						<option value="public">public</option>
						<option value="private">private</option>
					</select>
				</div>
				<div className="mmmm input-type">
					<label htmlFor="rating">Ratings</label>
					<input type="number" min="1" max="5" name="rating" id="rating"
						value={scanInput.rating}
						onChange={handleChange}
					/>
				</div>
				<button className='action-button' onClick={confirmScan}> Confirm Scan</button>
			</div>
		</div>
	</>

	)
};

export default ConfirmScan;
