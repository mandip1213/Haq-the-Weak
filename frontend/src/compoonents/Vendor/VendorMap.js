import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import useGlobalContext from '../utils/Globalcontext';
import PostRequest from '../utils/PostReq';

const VendorMap = (props) => {
	console.log(useParams(), " params")
	const { access_token } = useGlobalContext()
	const { vendorid } = useParams()
	const [searchParams] = useSearchParams()
	const lat = searchParams.get("lat")
	const long = searchParams.get("long")
	const curr_lat = searchParams.get("curr_lat")
	const curr_long = searchParams.get("curr_long")

	const addVendor = () => {
		PostRequest({
			endpoint: `/api/visit/`, access_token: access_token, options: {
				body: JSON.stringify({ vendor: vendorid })
			}
		})
	}
	return (
		<div>
			<div>Lorem ipsum dolor sit amet cotnsectetur adipisicing elit. Porro, natus.</div>
			<div className="temp">
				{/* TODO this is temp */}
				<button onClick={addVendor}> Scan Qr</button>

			</div>
			<iframe width="600" height="450" loading="lazy" allowFullScreen
				src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDMvYPiNrMzPVK1PtKJzMyfTUzWdWnZccU&origin=${curr_lat},${curr_long}&destination=${lat},${long}`} />

		</div>
	)
};

export default VendorMap;


