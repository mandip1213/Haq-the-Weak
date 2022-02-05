import React, { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import useGlobalContext from '../utils/Globalcontext';
import "./VendorMap.css"
const VendorMap = (props) => {
	console.log(useParams(), " params")
	const { access_token } = useGlobalContext()
	const { vendorid } = useParams()
	const [searchParams] = useSearchParams()
	const lat = searchParams.get("lat")
	const long = searchParams.get("long")
	const curr_lat = searchParams.get("curr_lat")
	const curr_long = searchParams.get("curr_long")
	const name = searchParams.get("name")
	const tag = searchParams.get("tag")
	console.log(name, "  name")
	console.log(tag, "  tag")
	useEffect(() => {
		document.title = "TripBee | Vendor Near Me"
		/* TODO change title to vendor name */
	}, [])

	return (
		<div className="vendor-map">
			<div className="name" >{name}</div>
			<div className="type_of_place">{tag}</div>
			<div className="temp">
				{/* TODO this is temp */}

			</div>
			{/* TODO width of iframe */}
			<div className="iframe" >
				<iframe loading="lazy" allowFullScreen
					src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDMvYPiNrMzPVK1PtKJzMyfTUzWdWnZccU&origin=${curr_lat},${curr_long}&destination=${lat},${long}`} />

			</div>
		</div >
	)
};

export default VendorMap;


