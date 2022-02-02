import React from 'react';
import VendorDashboard from '../Dashboard/VendorDashboard';
import useGlobalContext from '../utils/Globalcontext';
import { handleLogout } from '../utils/logout';

const VendorView = () => {
	const { dispatch } = useGlobalContext()
	return (
		<>
			<div>Vendor view  <button className="button" onClick={() => { handleLogout(dispatch) }}>logout</button></div>
			<VendorDashboard />
		</>
	)


};

export default VendorView;
