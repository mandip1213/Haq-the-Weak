import React, { useEffect } from 'react';
import useFetch from '../utils/UseFetch';
const Dashboard = () => {

	const { isLoading, data: dashboard, error } = useFetch("/api/dashboard/");

	// const { isLoading, data: dashboard, error } = useFetch("/api/visit/");
	// console.log(dashboard);



	// if (isLoading) {
	// 	return (<div>loading</div>)
	// }
	// if (error) {
	// 	return (<div>error: {error}</div>)
	// }
	return <div>Dashboard</div>;
};

export default Dashboard;


