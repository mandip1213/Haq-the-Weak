import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from "./LandingPage"
import "./Home.css"
import useFetch from '../utils/UseFetch';
import baseurl from '../../baseurl';
import Loading from "../extras/Loading"

export const Stars = ({ ratings }) => {
	return (<>
		<span className={`activity__star ${ratings >= 1 && "rated"}`}>&#9733;</span>
		<span className={`activity__star ${ratings >= 2 && "rated"}`}>&#9733;</span>
		<span className={`activity__star ${ratings >= 3 && "rated"}`}>&#9733;</span>
		<span className={`activity__star ${ratings >= 4 && "rated"}`}>&#9733;</span>
		<span className={`activity__star ${ratings >= 5 && "rated"}`}>&#9733;</span>
	</>
	)
}

const Home = () => {
	const { isLoading, data: feeds, error } = useFetch("/api/feed/")
	const { uuid, access_token } = useGlobalContext()
	useEffect(async () => {
		document.title = "TripBee | Feed"


	}, [])

	function calculateTime(date) {
		const posted = new Date(date).getTime()
		const curr = new Date().getTime()
		let diff = Math.floor((curr - posted) / 1000);//secondes
		if (diff < 60) return `${diff} seconds ago`;
		diff = Math.floor(diff / 60)//minute
		if (diff < 60) return `${diff} minute${diff == 1 ? "" : "s"}  ago`;
		diff = Math.floor(diff / 60)
		if (diff < 60) return `${diff} hour${diff == 1 ? "" : "s"}  ago`;
		diff = Math.floor(diff / 24)
		if (diff < 24) return `${diff} day${diff == 1 ? "" : "s"}  ago`;
		diff = Math.floor(diff / 7)
		if (diff < 52) return `${diff} 52${diff == 1 ? "" : "s"}  ago`;
		console.log("hello")
		return "some times ago";
	}
	if (isLoading) return (<div className="activities">
		<h2 className='heading outline-heading'>Feed</h2>
		<Loading /></div>);
	if (error) return (
		<div className="activities">
			<h2 className='heading outline-heading'>Feed</h2>
			<div className='loading-error'>error</div>;
		</div>
	)
	if (feeds.length === 0) return (
		<div className="activities loading">
			<h2 className='heading outline-heading'>Feed</h2>
			<div>You have no feeds. Try following someone.</div>
		</div>
	);

	return (
		<>
			<div className="activities">
				<h2 className='heading out\line-heading'>Feed</h2>
				{feeds.map(feed => {
					const { created_at, ratings, content, user: { username, gender, uuid, batch }, vendor: { name: vendorname, location, type_of_place } } = feed;
					// TODO need date of visit
					//TODO unique id
					//TODO show leaderboard in home
					return (
						<div className="activity">

							<div className="activity__header">
								<div className="activity__user">
									<img className="activity__user-image" src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80" />
									<div>	<Link style={{ color: "var(--special-text-color)" }} to={`/profile/${uuid}`}>{username}</Link> visited {location}.</div>
								</div>
								<span className="activity__date">{calculateTime(created_at)}</span>

							</div>
							<div className="activity__body">

								<div className="activity__body-main">
									<div className="acitvity__vendor">
										<img className="activity__vendor-image"
											src="https://lh3.googleusercontent.com/ogw/ADea4I70PeEcDK4HGIqjH7bes64KQIL7TIq5lpPdBlIJJQ=s192-c-mo" />
										<div className="activity__vendor-text">
											<span className="vendor-name">{vendorname}</span>
											<span className='vendor-type'>{type_of_place}</span>
										</div>
									</div>
									<div className="activity__stars"><Stars ratings={ratings} /></div>
								</div>

								{content && <div className='activity__content'>{content}</div>}
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
};
export default Home;
