import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import useFetch from '../utils/UseFetch';
import "./Profile.css"

const Profile = () => {
	const { uuid } = useGlobalContext()
	const { isLoading, data: profileData, error } = useFetch(`/api/user/${uuid}/`)
	return (

		<div>profile</div>
	);
};

export default Profile;
