import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import useFetch from '../utils/UseFetch';

const VendorDashboard = () => {
	const { uuid } = useGlobalContext()

	const { isLoading, data, error } = useFetch("/api/dashboard/")
	useFetch(`/api/vendor/`)
	useFetch(`/api/vendor/${uuid}/`)

	return (
		<div className="vendor-dashboard">Vendor Dashboard</div>
	)
};

export default VendorDashboard;
