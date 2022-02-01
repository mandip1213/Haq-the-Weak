import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import useFetch from '../utils/UseFetch';
import Loading from "../extras/Loading"
import { useParams } from 'react-router-dom';
import "./Profile.css"

const Profile = () => {
	const { userid } = useParams()
	const { isLoading, data: profileData, error } = useFetch(`/api/user/${userid}/`)
	console.table(profileData)
	if (isLoading) return <Loading />;

	const { first_name, last_name, profile_picture, followers_count, following_count } = profileData
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
						<button>follow{/* edit if user */}</button>
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
