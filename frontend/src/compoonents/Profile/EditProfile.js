import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useGlobalContext from '../utils/Globalcontext';
import { PatchRequest } from "../utils/PostReq"
import useFetch from '../utils/UseFetch';

const EditProfile = () => {
	const { access_token, uuid } = useGlobalContext()
	console.log(useLocation())
	const { state: { first_name, last_name, bio, birthday, contact, home_town, username } } = useLocation();
	const [state, setState] = useState({ first_name, last_name, bio, birthday, contact, home_town, username });
	const navigate = useNavigate()
	const [error, setError] = useState("")

	useEffect(() => {
		document.title = "TripBee | Edit Profile"
	}, [])
	const handleEditProfile = async (e) => {
		e.preventDefault()

		if (state.first_name.length < 3) {
			setError("First_name must be 3 characters long.")
			return;
		} if (state.last_name.length < 3) {
			setError("last_name must be 3 characters long.")
			return;
		}
		const res = await PatchRequest({
			access_token, endpoint: `/api/user/${uuid}/`, options: {
				body: JSON.stringify(state)
			}
		})
		console.log(res, " patch profile")
		if (res == 1) {
			navigate(`/profile/${uuid}`)
		}

	}
	const handleChange = ({ target: { name, value } }) => {
		if (error) setError("");
		// console.log(name, " : ", value);
		setState({ ...state, [name]: value })
	}
	return (
		<form action="sumbit" onSubmit={handleEditProfile}>
			<h3 className="fs-subtitle">Edit Profile </h3>
			{error && <div className='error'>{error}</div>}

			<div className="input-container">
				<label htmlFor="username" className="label">Username</label>
				<input type="text" className="input" value={state.username} id="username" name="username" onChange={handleChange} />
			</div>




			<div className="input-container">
				<label htmlFor="first_name" className="label">first name</label>
				<input type="text" className="input" value={state.first_name} id="first_name" name="first_name"
					onChange={handleChange} />
			</div>

			<div className="input-container">
				<label htmlFor="last_name" className="label">last name</label>
				<input type="text" className="input" value={state.last_name} id="last_name" name="last_name"
					onChange={handleChange} />
			</div>

			<div className="input-container">
				<label htmlFor="home_town" className="label">home_town</label>
				<input type="text" className="input" value={state.home_town} id="home_town" name="home_town"
					onChange={handleChange} />
			</div >

			<div className="input-container">
				<label htmlFor="contact" className="label">contact</label>
				<input type="tel" className="input" name="contact" id="contact"
					maxLength="10"
					pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
					value={state.contact}
					// required
					onChange={handleChange} />
			</div>

			<div className="input-container">
				<label htmlFor="birthday" className="label">birthday</label>
				<input type="date" className="input" value={state.birthday} id="birthday" name="birthday"
					onChange={handleChange} />
			</div >

			{/* <div className="input-container">
				<label htmlFor="profile_picture">profile picture</label>
				<input type="file" id="profile_picture" name="profile_picture" ref={profile_picture} />
			</div> */}


			<div className="input-container">
				<label htmlFor="bio" className="label">bio</label>
				<textarea className="input" id="bio" name="bio" maxLength={150}
					style={{ resize: "none" }}
					rows="4"
					value={state.bio}
					onChange={handleChange} />
			</div>

			< div className="button-div">
				<button type="submit" name="submit" className="submit action-button"  >Submit</button>
			</div>


		</form>
	)
};

export default EditProfile;
