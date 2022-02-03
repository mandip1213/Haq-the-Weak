import React from 'react';
import { Link } from "react-router-dom"
import useGlobalContext from '../utils/Globalcontext';
import LandingPage from "./LandingPage"
import "./Home.css"
import useFetch from '../utils/UseFetch';
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
	if (isLoading) return <Loading />
	if (error) return <div>error</div>;
	if (feeds.length === 0) return <div>You have no feeds. Try following someone.</div>
	return (
		<>
			<div className="activities">
				{feeds.map(feed => {
					feed.content = "Dont visit this place"
					const { ratings, content, user: { username, gender, uuid, batch }, vendor: { name: vendorname, location, type_of_place } } = feed;
					// TODO need date of visit
					//TODO unique id
					//TODO show leaderboard in home
					return (
						<div className="activity">

							<div className="activity__header">
								<div className="activity__user">
									<img className="activity__user-image" src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80" />
									<div>	<Link to={`/profile/${uuid}`}>{username}</Link> visited {location}.</div>
								</div>
								<span className="activity__date">10 minutes ago</span>

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
