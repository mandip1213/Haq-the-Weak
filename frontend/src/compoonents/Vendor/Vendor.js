import React, { useState, useEffect } from 'react';
import "./Vendor.css"
import Loading from "../extras/Loading"
import { Link } from "react-router-dom"
import { Stars } from "../Home/Home"
import useFetch from '../utils/UseFetch';

const Vendor = () => {
	const [vendors, setVendors] = useState({ isLoading: true, _vendors: [], error: false });
	const { isLoading, _vendors, error } = vendors
	console.log("rerender")
	const [currCoords, setCurrCoords] = useState([]);
	// useFetch("/api/vendor/")
	useEffect(() => {
		document.title = "TripBee | Vendors Near Me"
	}, [])

	useEffect(() => {
		const ac = new AbortController();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: long } }) => {
				setCurrCoords([lat, long])
				/* https://radar.com/documentation/api#:~:text=tags%20(string%2C%20optional,Defaults%20to%2010 */
				fetch(`https://api.radar.io/v1/search/geofences?near=${27.68674},${84.4380}&radius=10000&limit=10`, {
					headers: {
						// authorization: "prj_test_pk_a82bd4875128c70b94c610afdee4fe507389d1b3"//my key
						// authorization: "prj_test_pk_a093ec8265fa68c9aaf03d7056fc35a045dc13c8" //aavash key
						authorization: "prj_live_pk_4a2f19143711bc1855d0aa7c9bbd53a4fd90e1c7"//live  key
					},
					signal: ac.signal
				}).then(res => res.json())
					.then(res => {
						console.log(isLoading, "  isLoading")
						setVendors({ ...vendors, isLoading: false, _vendors: res.geofences })
						console.log("res geofoence ", res)
					})
					.catch(error => {
						console.log(error, "error geofence req")
						setVendors({ ...vendors, isLoading: false, error: "An unknown Error occured" })
					})
			}, (error) => {
				setVendors({ ...vendors, isLoading: false, error: "Please Provide map access" })
				console.log("geolocation  error ", error)
			});
		} else {
			console.log(" no geolocation");
			// setVendors({ ..._vendors, isLoading: false, error: true })
		}
		return () => {
			ac.abort()//https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp#:~:text=43-,Sharing,-the%20AbortController%20between
			console.log("aborted")
		}
	}, [])
	if (isLoading) return (
		<div className='vendors-near-me'>
			<h2 className="heading outline-heading">Vendors near me</h2>
			<Loading />
		</div>)

	if (error) {
		return (
			<div className='vendors-near-me'>
				<h2 className="heading">Vendors near me</h2>
				<div className='loading-error'>{error} </div>
			</div>)
	}
	return (
		<div className='vendors-near-me'>
			<h2 className="heading outline-heading">Vendors Near Me</h2>
			{
				// vendors.map(({ contact, id, image, is_spponsor, location, name, type_of_place }) => (
				_vendors.length === 0 ? <div>NO Vendors Fouund Near Your Location</div> :
					_vendors.map((vendor) => {
						// NOTE externalId is vendor Id in database
						const { metatag, createdAt, description: name, enabled, externalId, geometry, geometryCenter: { coordinates }, geometryRadius, live, mode, tag, type, updatedAt, _id } = vendor;
						console.log(coordinates)
						return (<>

							<div className="vendor-near-me">
								<div className="confirm-header">
									<div className="vendor__main">
										<div className="name">{name}</div>
										<div className="type_of_place">{tag}</div>
									</div>
									<div className="rating"><Stars ratings={Math.ceil(Math.random() * 3) + 2} /></div>
								</div>
								{/* <div className="location">
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
							</div> */}

								{/* {contact && <div className="contact">{contact ? contact : "9823741782"}</div>} */}

								<div key={_id} style={{ display: "flex", justifyContent: "space-between" }}>
									<div>
										<Link
											className='show-direction'
											to={{
												pathname: `/vendor/${externalId}?lat=${coordinates[1]}&long=${coordinates[0]}&curr_lat=${currCoords[0]}&curr_long=${currCoords[1]}&name=${name}&tag=${tag}`,
											}} state="state">
											Show Directions
										</Link>
									</div>
								</div>
							</div>
						</>

						)
					})
			}

		</div >
	)
};
export default Vendor;
