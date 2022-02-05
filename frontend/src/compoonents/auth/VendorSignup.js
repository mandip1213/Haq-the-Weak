import React, { useState, useEffect, createRef } from "react";
import URL from "../../baseurl"
import "./VendorSignup.css"
import { Link } from "react-router-dom"

const VendorSignup = () => {

	// const initialState = {
	// 	'username': "", 'email': "", 'password': "", 'confirm_password': "", 'name': "", 'location': "", 'latitude': "",
	// 	'longitude': "", 'image': "", 'type_of_place': "", 'contact': ""
	// }
	const initialState = {
		'username': "Hamro cafe", 'email': "vendor@gmail.com",
		'password': "password",
		'confirm_password': "password", 'name': "Hamro cafe", 'location': "Nuwakot", 'latitude': "",
		'longitude': "", 'image': "", 'type_of_place': "Cafe", 'contact': 98_322_111_34
	}
	const [vendorSignup, setVendorSignup] = useState(initialState);

	const [error, setError] = useState()
	const profile_picture = createRef()

	useEffect(() => {

		document.title = "TripBee | Vendor Signup"

	}, [])

	const { username, email, password, confirm_password, name, location, latitude, longitude, image, type_of_place, contact } = vendorSignup;
	const handleChange = ({ target: { name, value } }) => {
		if (error) setError("");
		console.log(name, " : ", value);
		setVendorSignup({ ...vendorSignup, [name]: value })
	}
	const signup = (_vendorDetails) => (e) => {
		e.preventDefault();
		console.log("signup");
		const { username, email, password, confirm_password, name, location, latitude, longitude, image, type_of_place, contact } = _vendorDetails;

		const fieldsArray = ['username', 'email', 'password', 'confirm_password', 'name', 'location', 'type_of_place', 'contact']
		for (let i = 0; i < fieldsArray.length; i++) {

			if (!(_vendorDetails[fieldsArray[i]])) {
				setError(`${fieldsArray[i]} cannot be empty`)
				console.log("error ", fieldsArray[i]);
				return;
			}
		}


		if (password !== confirm_password) {
			setError("Password donot match")
			return
		}

		if (password.length < 6) {
			setError("passowrd must be 6 characters long");
			return;
		}

		if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.toLowerCase())) {
			console.log("iinvalid mail")
			setError("Please enter valid mail")
			return
		}

		if (name.length < 3) {
			setError("Firstname must be 3 characters long.");
			return;
		}


		const formdata = new FormData()


		formdata.append("username", username)
		formdata.append("email", email)
		formdata.append("password", password)
		formdata.append("confirm_password", confirm_password)
		formdata.append("name", name)
		formdata.append("location", location)
		formdata.append("type_of_place", type_of_place)
		formdata.append("contact", contact)

		if (profile_picture.current.files[0])
			formdata.append("image", profile_picture.current.files[0]);

		if (window.navigator.geolocation) {
			// Geolocation available
			window.navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
				console.log(latitude, longitude)
				if (!latitude || !longitude)
					return;
				formdata.append("latitude", latitude)
				formdata.append("longitude", longitude)
				fetch(`${URL}/api/vendor/`, {
					method: "post",
					body: formdata,
				}).then(res => res.json())
					.then(res => {
						console.log(res)
					})
					.catch(error => {
						console.log("error   ", error)
						setError("An error occured")
					})

			}, (error) => {
				console.log("geolocation error", error)
				if (error.code === 1 && error.message.includes("denied"))
					alert("Please allow access to location")
				setError("Allow acces to location for signup. ")
			});

		} else {
			setError("There is no gps available in your device. Try again with another device.")

		}

	}
	return (
		<form action="" onSubmit={signup(vendorSignup)} className="vendor-signup">
			<fieldset>
				<legend >Vendor Registration</legend>
				<h3 className="vendor__signupo-text">Lets join our hands for the better of Toursim and everyone </h3>
				<div className="input-container">
					{error && <div className="error">{error}</div>}
					<label htmlFor="email" className="label">Email</label>
					<input type="text" className="input"
						name="email"
						id="email"
						value={email}
						onChange={handleChange} />
				</div>

				<div className="input-container">
					<label htmlFor="username" className="label">Username</label>
					<input type="text" className="input" value={username} id="username" name="username" onChange={handleChange} />
				</div>

				<div className="input-container">
					<label htmlFor="password" className="label">Password</label>
					<input type="text" className="input" value={password} id="password" name="password" onChange={handleChange} />
				</div >


				<div className="input-container">
					<label htmlFor="confirm_password" className="label">Confirm Password</label>
					<input type="text" className="input" value={confirm_password} id="confirm_password" name="confirm_password" onChange={handleChange} />
				</div >


				<div className="input-container">
					<label htmlFor="name" className="label">name</label>
					<input type="text" className="input" value={name} id="name" name="name"
						onChange={handleChange} />
				</div>


				<div className="input-container">
					<label htmlFor="location" className="label">location</label>
					<input type="text" className="input" value={location} id="location" name="location"
						onChange={handleChange} />
				</div >


				<div className="input-container">
					<label htmlFor="type_of_place" className="label">type_of_place</label>
					<input type="text" className="input" value={type_of_place} id="type_of_place" name="type_of_place"
						onChange={handleChange} />
				</div >

				<div className="input-container">
					<label htmlFor="contact" className="label">contact</label>
					<input type="tel" className="input" name="contact" id="contact"
						maxLength="10"
						pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
						value={contact}
						// required
						onChange={handleChange} />
				</div>



				<div className="input-container">
					<label htmlFor="profile_picture">profile picture</label>
					<input type="file" id="profile_picture" name="profile_picture" ref={profile_picture} />
				</div>

				<button className="vendor-signup action-button">Signup</button>

				<div className="naming-is-hard">Already a member? <Link to="/login">login</Link></div>
			</fieldset>
		</form>
	)
};

export default VendorSignup;
