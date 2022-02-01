import React, { useState, useEffect } from 'react';
import useFetch from '../utils/UseFetch';
import Loading from "../extras/Loading"
import { Link } from "react-router-dom"

const Vendor = () => {
	const [vendors, setVendors] = useState({ isLoading: true, _vendors: [], error: false });
	const { isLoading, _vendors, error } = vendors
	console.log("rerender")

	useEffect(() => {
		console.log("useeffect")
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: long } }) => {
				lat = 26.555720; long = 87.29474;
				/* https://radar.com/documentation/api#:~:text=tags%20(string%2C%20optional,Defaults%20to%2010 */
				fetch(`https://api.radar.io/v1/search/geofences?near=${lat},${long}&radius=10000&limit=10`, {
					headers: {
						authorization: "prj_test_pk_a82bd4875128c70b94c610afdee4fe507389d1b3"//my key
						// authorization: "prj_test_pk_a093ec8265fa68c9aaf03d7056fc35a045dc13c8" //aavash key
					}
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
				console.log("geolocation  error ", error)
			});
		} else {
			console.log(" no geolocation");
			// setVendors({ ..._vendors, isLoading: false, error: true })
		}
	}, [])
	//TODO remove cant updat statee after component is unmounnted
	if (isLoading) {
		return <Loading />
	}
	if (error) {
		return <div>Error</div>
	}
	return (
		<div>
			{
				// vendors.map(({ contact, id, image, is_spponsor, location, name, type_of_place }) => (
				_vendors.length === 0 ? <div>NO Vendors Fouund Near your Location</div> :
					_vendors.map((vendor) => {

						const { createdAt, description: name, enabled, externalId, geometry, geometryCenter: { coordinates }, geometryRadius, live, mode, tag, type, updatedAt, _id } = vendor;
						console.log(coordinates)
						return (
							<div key={_id} style={{ display: "flex", justifyContent: "space-between" }}>
								<div>
									<Link to={{ pathname: `/vendor/${_id}?lat=${coordinates[0]}&long=${coordinates[1]}&curr_lat=26.555720&curr_long=87.29474`, state: { coordinates } }} state="state">
										{name}
									</Link>
								</div>
								<div>{tag}</div>
							</div>

						)
					})
			}

		</div >
	)
};

export default Vendor;
