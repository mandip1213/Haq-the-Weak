import React, { useState, useEffect } from 'react';
import useFetch from '../utils/UseFetch';
import Loading from "../extras/Loading"
import { Link } from "react-router-dom"

const Vendor = () => {
	const [vendors, setVendors] = useState({ isLoading: true, _vendors: [], error: false });
	const { isLoading, _vendors, error } = vendors
	console.log("rerender")
	const [currCoords, setCurrCoords] = useState([]);

	useEffect(() => {
		document.title = "Trip Bee | Vendors Near Me"
	}, [])

	useEffect(() => {
		const ac = new AbortController();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: long } }) => {
				setCurrCoords([lat, long])
				/* https://radar.com/documentation/api#:~:text=tags%20(string%2C%20optional,Defaults%20to%2010 */
				fetch(`https://api.radar.io/v1/search/geofences?near=${lat},${long}&radius=10000&limit=10`, {
					headers: {
						authorization: "prj_test_pk_a82bd4875128c70b94c610afdee4fe507389d1b3"//my key
						// authorization: "prj_test_pk_a093ec8265fa68c9aaf03d7056fc35a045dc13c8" //aavash key
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
						// NOTE externalId is vendor Id in database
						const { createdAt, description: name, enabled, externalId, geometry, geometryCenter: { coordinates }, geometryRadius, live, mode, tag, type, updatedAt, _id } = vendor;
						console.log(coordinates)
						return (
							<div key={_id} style={{ display: "flex", justifyContent: "space-between" }}>
								<div>
									<Link
										to={{
											pathname: `/vendor/${externalId}?lat=${coordinates[1]}&long=${coordinates[0]}&curr_lat=${currCoords[0]}&curr_long=${currCoords[1]}`,
										}} state="state">
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
function TempVendor() {
	const { isLoading, data, error } = useFetch("/api/vendor/")
	return (
		<div>
			vendors
		</div>
	)
}
// export default TempVendor;
export default Vendor;
