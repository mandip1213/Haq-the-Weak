import React, { useState, useEffect, useDebugValue } from 'react';
import Loading from '../extras/Loading';
import useFetch from '../utils/UseFetch';
import "./Leaderboard.css"
const Leaderboard = () => {
	const { isLoading, data: dashboard, error } = useFetch("/api/leaderboard/");
	const [tab, setTab] = useState("global");
	useEffect(() => {
		// constuseFetch("/api/leaderbord/")

	}, [])

	return (
		<>
			{tab === "global" ? <Global /> : <Global />}
		</>


	)
};

function Global() {
	const { isLoading, data: globals, error } = useFetch("/api/leaderboard/")
	if (isLoading) {
		return <Loading />
	} if (error) {
		return <div>error</div>
	}
	return (

		<div className="list  ">
			<h1 className="heading">Leaderboard</h1>
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

								user_profile_picture = user_profile_picture ? user_profile_picture : "https://www.formula1.com/content/fom-website/en/drivers/lewis-hamilton/_jcr_content/image.img.1920.medium.jpg/1533294345447.jpg"

								return (
									<tr key={user_uuid} className="list__row" data-image={user_profile_picture} data-nationality="British" data-dob="1985-01-07" data-country="gb">
										<td className="list__cell"><span className="list__value">{index + 1}</span></td>

										<td className="list__cell with-image">
											<img className='user__image' src={user_profile_picture} alt="" />
											<span className="list__value">{username}</span>
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
		</div>
	)

}

export default Leaderboard;





