import React, { useState, useEffect, useDebugValue } from 'react';
import Loading from '../extras/Loading';
import useFetch from '../utils/UseFetch';
import defaultpp from "../images/pp.jpg"
import "./Leaderboard.css"
import { Link } from "react-router-dom"
const Leaderboard = () => {
	const [endpoint, setEndpoint] = useState("leaderboard");
	useEffect(() => {
		document.title = "TripBee | Leaderboard"
	}, [])
	console.log("rerender")
	return (
		<>
			< div className="list leaderboard  " >
				<h1 className="heading outline-heading">Leaderboard</h1>
				<div className="tabs--">
					<button onClick={() => { setEndpoint("leaderboard") }}> Global</button>
					<button onClick={() => { setEndpoint("following-leaderboard") }}> Followings</button>

				</div>
				{
					<LeaderboardTable endpoint={endpoint} />
				}

			</div>
		</>
	)
};

export const LeaderboardTable = ({ endpoint }) => {
	console.log("leaderboard  ", endpoint)
	const { isLoading, data: globals, error } = useFetch(`/api/${endpoint}/`, [endpoint])
	if (isLoading) {
		return (
			<Loading />
		)
	} if (error) {
		return (
			<div>error</div>
		)

	}
	return (

		<div className="list__body">
			<table className="list__table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Username</th>
						<th>Score</th>
						<th>Scans{/* visits */}</th>
						<th>Visits{/* unique visits */}</th>
					</tr>
				</thead>

				<tbody>
					{
						globals.map(({ user_uuid, username, score, user_profile_picture, unique_visits, visits }, index) => {

							user_profile_picture = user_profile_picture ? user_profile_picture : defaultpp

							return (
								<tr key={user_uuid} className="list__row" data-image={user_profile_picture} data-nationality="British" data-dob="1985-01-07" data-country="gb">
									<td className="list__cell"><span className="list__value">{index + 1}</span></td>

									<td className="list__cell with-image">
										<img className='user__image' src={user_profile_picture} alt="" />
										<Link className="list__value" to={`/profile/${user_uuid}`}>{username}</Link>
									</td>

									<td className="list__cell"><span className="list__value">{score.toFixed(2)}</span></td>
									<td className="list__cell"><span className="list__value">{visits}</span></td>
									<td className="list__cell"><span className="list__value">{unique_visits}</span></td>
								</tr>
							)
						})


					}
				</tbody>
			</table>
		</div>
	)

}

export default Leaderboard;





