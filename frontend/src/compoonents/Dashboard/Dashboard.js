import React, { useState, useEffect } from 'react';
import Loading from '../extras/Loading';
import "./Dashboard.css"
import useFetch from '../utils/UseFetch';
import Male from "../images/boyprofile.jpg"
import Female from "../images/girlprofile.jpg"
import Vendor from "../images/vendor.jpeg"
const Dashboard = () => {
	const { isLoading, data: dashboard, error } = useFetch("/api/dashboard/");

	// const { isLoading, data: dashboard, error } = useFetch("/api/visit/");
	//TODO return s all visits
	useEffect(() => {
		document.title = "TripBee | Dashboard "

	}, [])
	if (isLoading) {
		return (
			<div className="list  dashboard">
				<h1 className="heading outline-heading ">Dashboard</h1>
				<Loading />
			</div>

		)
	}
	if (error) {
		return (<div className="list  dashboard">
			<h1 className="heading outline-heading ">Dashboard</h1>
			<div className="error">
				{error}
			</div>
		</div>)
	}
	if (dashboard.length === 0) {
		return (<div className="list  dashboard">
			<h1 className="heading outline-heading ">Dashboard</h1>
			<div>You have no scans</div>
		</div>


		)
	}
	const total = dashboard.reduce((prev, curr) => (prev + curr.score), 0)
	const user = dashboard[0].user
	const { gender, first_name, last_name, username, profile_picture, batch, batch_count, total_score } = user;
	// const { first_name, last_name, username, date_of_birth, gender, profile_picture, uuid, followers_count, following_count, followers, following, batch, batch_count } = user;

	/*
	*/
	return (<div className="list  dashboard">
		<h1 className="heading outline-heading ">Dashboard</h1>
		<div className="list__body">

			<div className='emergency-class' >

				<div className="left" style={{ display: "flex", alignItems: "center" }}>
					<div className="name ">
						<img className="user__image" /* tempclass */ src={profile_picture ? profile_picture :
							(gender === "Male" ? Male : Female)} /></div>
					<div className="name"><h3>{username}</h3></div>
				</div>
				<div className='total-score'>
					{/* TODO batches  */}
					{/* TODO peronal links facebook social media */}
					<h2>Total Score: {total}</h2>
				</div>

			</div>
			<table className='dashboard-table list__table'>
				{/* note css for list* is imported from leaderboard.css */}

				<thead className="dashboard-table-head">
					<tr>
						<th>SN</th>
						<th>name</th>
						<th>score</th>
						<th>location</th>
						<th>type of place</th>
					</tr>
				</thead>
				<tbody>

					{dashboard.length !== 0 && dashboard.map(({ user, vendor, id, score }, index) => {
						let { name, location, image, type_of_place } = vendor
						image = image ? image : Vendor
						// setTotal(prev => prev + score)
						return (
							<tr key={id} className='list__row'>
								<td className="list__cell"><span className="list__value">{index + 1}</span></td>
								<td className='list__cell with-image'>

									<img className='user__image' src={image} alt="" />
									<span className='list__value'>{name}</span>
								</td>
								<td className='list__cell'><span className='list__value'>{score.toFixed(2)}</span></td>
								<td className='list__cell'><span className='list__value'>{location}</span></td>
								<td className='list__cell'><span className='list__value'>{type_of_place}</span></td>
							</tr>
						)
					})
					}

				</tbody>
			</table>
		</div >
	</div >
	)
};

export default Dashboard;


