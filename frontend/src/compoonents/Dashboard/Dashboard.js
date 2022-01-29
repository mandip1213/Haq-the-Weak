import React from 'react';
import useFetch from '../utils/Fetch';
const Dashboard = () => {

	const { isLoading, data: dashboard, error } = useFetch("/api/dashboard/");
	// console.log(dashboard);
	if (isLoading) {
		return (<div>loading</div>)
	}
	if (error) {
		return (<div>error: {error}</div>)
	}
	return <div>Dashboard</div>;
};

export default Dashboard;


