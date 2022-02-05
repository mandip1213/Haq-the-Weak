import React, { useState, useEffect } from 'react';
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
	const [following, setFollowing] = useState(false);
	// const [error, setError] = useState("");
	useEffect(() => {
		document.title = "TripBee | Profile"
	}, [])
	useEffect(() => {
		if (isLoading) return;
		if (error) return;
		const _following = followers.some(_followers => _followers.uuid === uuid);
		setFollowing(_following);
	}, [isLoading]);

	if (isLoading) return <Loading />;

	const handleFollow = (action) => (e) => {
		console.log(action, "action")
		fetch(`${baseurl}/api/user/${uuid}/`, {
			method: "PATCH",
			body: JSON.stringify({
				"action": action,
				"follow_uuid": userid
			}), headers: {
				Authorization: `Bearer ${access_token}`,
				"Content-type": "application/json"
			}
		}).then(res => res.json())
			.then(res => {
				console.log(res)
				setFollowing(prev => !prev)
				//TOD handle error
				//TODO the followers count dont decrease this way
				//anothoer approach can be sending req again
				//or decreasing followers count yourself , the user never knows lol

			})
			.catch(err => {
				console.log("error follow/unfolow", err)
				// setError("An error occured . Sorry for inconvenience.")
			})
	}

	const { first_name, last_name, bio, birthday, profile_picture, contact, home_town, username, followers, followers_count, following_count } = profileData

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
						<span>
							{first_name + " " + last_name}
						</span>

						{isSameUser ?
							<button className="profile-action"><Link to={`/profile/edit/${uuid}`} state={{
								first_name, last_name, bio, birthday, contact, home_town, username
							}}> Edit Profile</Link></button>
							:
							following ?
								<button className="profile-action" onClick={handleFollow("UNFOLLOW")}>
									unfollow
								</button>
								: <button className="profile-action" onClick={handleFollow("FOLLOW")}>
									follow
								</button>}
					</div>

					{/* <div className="batches">
						<div>ba</div>
						<div>tc</div>
						<div>he</div>
					</div> */}

					{/* TODO public vendor */}

					<div className="location">
						Dublin
						<svg
							className='location-icon'
							viewBox="0 0 395.71 395.71"
							fill="currentColor"
						>
							<path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
						</svg>
					</div>
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
