import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../extras/Loading';
import useFetch from '../utils/UseFetch';
import { Stars } from "../Home/Home"
import "./ConfirmScan.css"
import PostRequest from '../utils/PostReq';
import useGlobalContext from '../utils/Globalcontext';

const ConfirmScan = () => {
	const [searchParams] = useSearchParams()
	const vendorid = searchParams.get("id")
	const { access_token } = useGlobalContext()
	const { isLoading, data, error } = useFetch(`/api/vendor/${vendorid}/`)
	const [scanInput, setScanInput] = useState({ rating: 3, privacy: "public" });
	const [_error, setError] = useState("");
	useEffect(() => {
		document.title = "Trip Bee | Confirm Scan"
	}, [])
	if (isLoading) return <Loading />
	if (error) return <div className='error'>{error}</div>;
	const { contact, id, image, latitude, location, longitude, name, rating, type_of_place } = data;
	const handleChange = ({ target: { name, value } }) => {
		setScanInput({ ...scanInput, [name]: value })
	}
	const confirmScan = async () => {

		const res = await PostRequest({
			endpoint: `/api/visit/`, access_token: access_token, options: {
				body: JSON.stringify({
					vendor: vendorid,
					rating: scanInput.rating,
					public: scanInput.rating === "public" ? true : false
				})
			}
		})
		if (res === 1) {
			//success
		} else {
			//failure
			setError("Sorry The Vendor QR couldnot be scanned.")
		}
	}
	return (<>
		<div className="confirm-scan">

			<div className="confirm-header">
				<div className="vendor__main">
					<div className="name">{name}</div>
					<div className="type_of_place">{type_of_place}</div>
				</div>
				<div className="rating"><Stars ratings={rating} /></div>
			</div>

			{contact && <div className="contact">{contact}</div>}
			<div>{/* TODO location icon */} {location}</div>

			<div className="form-type">
				<div className="privacy">
					<label htmlFor="privacy">Privacy</label>

					<select name="privacy" id="privacy"
						value={scanInput.rating}
						onChange={handleChange}
					>
						<option value="public">public</option>
						<option value="private">private</option>
					</select>
					<div className="input-type">
						<label htmlFor="rating">Ratings</label>
						<input type="number" min="1" max="5" name="rating" id="rating"
							value={scanInput.rating}
							onChange={handleChange}
						/>
					</div>
					<button onClick={confirmScan}> Confirm Scan</button>
				</div>
			</div>
		</div>
	</>

	)
};

export default ConfirmScan;
