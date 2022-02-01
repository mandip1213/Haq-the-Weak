import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import useFetch from '../utils/UseFetch';
import Loading from "../extras/Loading"
import { useParams } from 'react-router-dom';
import "./Profile.css"
import baseurl from '../../baseurl';
import { Link } from 'react-router-dom';

const Profile = () => {
	const { userid } = useParams()
	const { uuid, access_token } = useGlobalContext();
	let isSameUser = false;
	if (uuid === userid) {
		isSameUser = true;
	}
	const { isLoading, data: profileData, error } = useFetch(`/api/user/${userid}/`)
	if (isLoading) return <Loading />;

	const handleFollow = () => {
		//TODO : handle case for already followed
		fetch(`${baseurl}/api/user/${uuid}/`, {
			method: "PATCH",
			body: JSON.stringify({
				"action": "FOLLOW",
				"follow_uuid": userid
			}), headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-type": "application/json"
			}
		}).then(res => res.json())
			.then(res => { console.log(res) })
			.catch(err => { console.log(err) })
	}

	const { first_name, last_name, bio, birthday, profile_picture, contact, home_town, username, followers_count, following_count } = profileData
	return (

		<div className="profile-card">

			<div className="card-header">

				<div className="left">
					<div className="pic">
						<img src="https://lh3.googleusercontent.com/ogw/ADea4I70PeEcDK4HGIqjH7bes64KQIL7TIq5lpPdBlIJJQ=s192-c-mo" alt="" />
					</div>
				</div>

				<div className="right">

					<div className="name">
						{first_name + " " + last_name}
						{isSameUser ?
							<button><Link to={`/profile/edit/${uuid}`} state={{
								first_name, last_name, bio, birthday, contact, home_town, username
							}}> Edit Profile</Link></button>
							: <button onClick={handleFollow}>follow</button>
						}
					</div>
					<div className="batches">
						<div>ba</div>
						<div>tc</div>
						<div>he</div>
					</div>
					<div className="location"><i className="fas fa-map-marker-alt">{/* location icon */}</i> Dublin</div>
					<div className="follow-stats">

						<span>{followers_count}</span>
						Followers

					</div>
					<div className="follow-stats">
						<span>{following_count}</span>
						Following
					</div>

				</div>
			</div>
			<div className="bio">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, recusandae magnam possimus fuga dolorum animi.</div>
			<div className="numbers">
				<div className="item " >
					<span>20</span>
					Unique visits
				</div>
				<div className="border"></div>
				<div className="item">
					<span>150</span>
					Visits
				</div>
				<div className="border"></div>
				<div className="item">
					<span>403.89</span>
					Score
				</div>
			</div>
			{/*
			<div className="card-footer">

			</div>

			<div className="icons">
				<a href="#" className="fab fa-instagram"></a>
				<a href="#" className="fab fa-linkedin"></a>
				<a href="#" className="fab fa-github"></a>
			</div>
			<a href="#" className="contact-btn">Contact Me</a>

			<div className="instagram-account">@irishgirldeveloper</div> */}
		</div >
	);
};

export default Profile;
