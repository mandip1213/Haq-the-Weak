import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const VendorMap = (props) => {
	const { state } = useLocation()
	console.log(useLocation())
	console.log(useParams(), " params")
	const [searchParams] = useSearchParams()
	const lat = searchParams.get("lat")
	const long = searchParams.get("long")
	const curr_lat = searchParams.get("curr_lat")
	const curr_long = searchParams.get("curr_long")
	console.log(curr_lat, curr_long)
	console.log(lat, long)
	return (
		<div>
			<div>Lorem ipsum dolor sit amet cotnsectetur adipisicing elit. Porro, natus.</div>

			<iframe width="600" height="450" loading="lazy" allowFullScreen
				src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDMvYPiNrMzPVK1PtKJzMyfTUzWdWnZccU&origin=${curr_lat},${curr_long}&destination=${lat},${long}`} />

		</div>
	)
};

export default VendorMap;


