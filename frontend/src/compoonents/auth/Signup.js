import React, { useState, useEffect, createRef } from 'react';
import URL from "../../baseurl"
import { Link, useNavigate } from 'react-router-dom';
import useGlobalContext from '../utils/Globalcontext';
import "./Signup.css"
import { Eye } from "./Login"
import districts from './district';

function Signup() {
	/* states */
	const [tab, setTab] = useState(1);
	const [signupDetails, setsignupDetails] = useState({
		// email: "",
		email: "",
		username: "",
		password: "", confirmPassword: "",
		gender: "Male",
		birthday: "",
		// birthday: new Date("2000-01-01").toISOString().substring(0, 10),
		firstname: "", lastname: "",
		bio: " ", home_town: "Kathmandu",
		contact: ""
	})

	// const [signupDetails, setsignupDetails] = useState({
	// 	// email: "",
	// 	email: "tempp@gmail.com",
	// 	username: "ellipsers",
	// 	password: "temppassword", confirmPassword: "temppassword",
	// 	gender: "Male",
	// 	birthday: "",
	// 	// birthday: new Date("2000-01-01").toISOString().substring(0, 10),
	// 	firstname: "lorem", lastname: "ipsum",
	// 	bio: "Nepal lies between China and India ", home_town: "Morang",
	// 	contact: ""
	// })
	const [error, setError] = useState({})


	const navigate = useNavigate()
	const { isLoggedIn } = useGlobalContext()
	const profile_picture = createRef()
	const { email, password, username, confirmPassword, firstname, lastname, bio, gender, contact, birthday, home_town } = signupDetails;
	/* use effect */

	React.useEffect(() => {
		document.title = "TripBee | Signup"

		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn])


	/* functions */
	const handleChange = ({ target: { name, value } }) => {
		if (error) setError("");
		console.log(name, " : ", value);
		setsignupDetails({ ...signupDetails, [name]: value })
	}



	const signup = (_signupDetails) => (e) => {
		e.preventDefault();
		console.log("signup");
		const {
			email, password, username, confirmPassword, firstname, lastname,
			bio, gender, contact, birthday, home_town
		} = _signupDetails;

		const fieldsArray = [
			["email", "password", "username", "confirmPassword"],
			["firstname", "lastname", "home_town", "gender"]
		]
		for (let i = 0; i < fieldsArray.length; i++) {
			const tabcheck = i + 1;
			const tabFields = fieldsArray[i]
			for (let j = 0; j < tabFields.length; j++) {
				if (!(_signupDetails[tabFields[j]])) {
					console.log(`error in tab ${tabcheck} field:${tabFields[j]}`)
					setTab(tabcheck)
					setError({ tab: tabcheck, message: `${tabFields[j]} cannot  be empty ` })
					return;
				}
			}
		}

		if (password !== confirmPassword) {
			setTab(1)
			setError({ tab: 1, message: "Password donot match" })
			return
		}

		if (password.length < 6) {
			setTab(1)
			setError({ tab: 1, message: "passowrd must be 6 characters long" });
			return;
		}

		if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.toLowerCase())) {
			console.log("iinvalid mail")
			setTab(1)
			setError({ tab: 1, message: "Please enter valid mail" })
			return
		}

		if (firstname.length < 3) {
			setTab(2)
			setError({ tab: 2, message: "Firstname must be 3 characters long." });
			return;
		}
		if (lastname.length < 3) {
			setTab(2)
			setError({ tab: 2, message: "Lastname must be 3 characters long." });
			return;
		}


		// console.log(profile_picture.current.files[0]);

		const formdata = new FormData()

		// formdata.append("username", "")
		formdata.append("username", username)
		formdata.append("email", email)
		formdata.append("password", password)
		formdata.append("confirm_password", confirmPassword)
		formdata.append("first_name", firstname)
		formdata.append("last_name", lastname)
		formdata.append("gender", gender)
		formdata.append("home_town", home_town)
		formdata.append("bio", bio)
		formdata.append("date_of_birth", "2000-01-01")
		// if()

		if (profile_picture.current.files[0])
			formdata.append("profile_picture", profile_picture.current.files[0]);
		// console.log(formdata);
		// for (let [key, values] of formdata.entries()) {
		// 	console.log(key, values);
		// }

		// fetch(`${URL}/api/user/`, {
		// 	method: "POST",
		// 	body: formdata,
		// 	headers: {
		// 		// "Content-type": "application/json"
		// 	}
		// }).then(res => res.json())
		// 	.then(res => {
		// 		navigate("/login")
		// 		console.log(res)
		// 	}).catch(error => {
		// 		setError({ tab: 3, message: "an unknown error occured" })
		// 	})



		if (window.navigator.geolocation) {
			// Geolocation available
			window.navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
				if (!latitude || !longitude)
					return;
				console.table(latitude, longitude)
				console.log("test")
				formdata.append("home_latitude", latitude)
				formdata.append("home_longitude", longitude)
				fetch(`${URL}/api/user/`, {
					method: "post",
					body: formdata,
				}).then(res => res.json())
					.then(res => {
						console.log(res)
						navigate("/login")
					})
					.catch(error => {
						console.log("error   ", error)
						setError({ tab: 3, message: "An error occured" })
					})

			}, (error) => {
				console.log("geolocation error", error)
				if (error.code === 1 && error.message.includes("denied"))
					alert("Please allow access to location")
				setError({ tab: 3, message: "Allow acces to location for signup. " })
			});

		} else {
			setError({ tab: 3, message: "There is no gps available in your device. Try again with another device." })

		}

	}
	const togglePassword = (e) => {
		e.currentTarget.classList.toggle("show-hide-password")
		const element = document.querySelector("input.password")
		element.type = (element.type === "text" ? "password" : "text")
	}
	const toggleConfirmPassword = (e) => {
		/* not time to do in same function */
		e.currentTarget.classList.toggle("show-hide-password")
		const element = document.querySelector("input.confirm-password")
		element.type = (element.type === "text" ? "password" : "text")
	}
	return (
		/* < !--multistep form-- >*/
		<form id="signup-form" onSubmit={signup(signupDetails)}>
			<ul id="progressbar">
				<li className={`${tab >= 1 && "active"}`}>Account Setup</li>
				<li className={`${tab >= 2 && "active"}`}> Personal Info</li>
				<li className={`${tab >= 3 && "active"}`}>Additional Info</li>
			</ul>
			{/* page 1 */}
			{tab === 1 &&
				<fieldset>

					<legend className="fs-title">Create  account</legend>
					<h3 className="fs-subtitle">Signup or Regret</h3>
					{error.tab && error.tab === 1 && <div className="error">{error.message}</div>}

					<div className="input-container">
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
						<div className="password-input">
							<input type="password" name="password" id="password" className="input password" value={password} onChange={handleChange} />
							<span className='show-hide-password' onClick={togglePassword}><Eye />
							</span>
						</div>
					</div >


					<div className="input-container">
						<label htmlFor="confirmPassword" className="label">Confirm Password</label>
						<div className="password-input">
							<input type="password" name="confirmPassword" id="confirmPassword" className="input confirm-password" value={confirmPassword} onChange={handleChange} />
							<span className='show-hide-password' onClick={toggleConfirmPassword}><Eye />
							</span>
						</div>
					</div >

					< div className="button-div">
						<button type="button" name="next" onClick={() => { setTab(2) }}
							className="next action-button next-first" >Next</button>
					</div>

					<div className="to-login">Already a member? <Link to="/login">login</Link></div>

				</fieldset>
			}
			{/* page 1 */}

			{/* page 2 */}
			{tab === 2 &&
				<fieldset>
					<legend className="fs-title">Personal Details</legend>
					{/* <h3 className="fs-subtitle">We will kee</h3> */}
					{error.tab && error.tab === 2 && <div className="error">{error.message}</div>}

					<div style={{ paddingTop: "1rem" }} className="input-container">
						<label htmlFor="firstname" className="label">first Name</label>
						<input type="text" className="input" value={firstname} id="firstname" name="firstname"
							onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="lastname" className="label">last Name</label>
						<input type="text" className="input" value={lastname} id="lastname" name="lastname"
							onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="home_town" className="label">home District</label>
						{/* <select  type="text" className="input" value={home_town} id="home_town" name="home_town"
							onChange={handleChange} /> */}
						<select name="home_town" id="home_town" value={home_town} onChange={handleChange} >

							{districts.map(district => <option value={district}>{district}</option>)}
						</select>
					</div >


					<div className="input-container">
						<label htmlFor="gender" className="label">gender</label>
						<select name="gender" id="gender" value={gender} onChange={handleChange} >
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							{/* <option value="Male">Male</option> */}
						</select>
					</div >

					< div className="button-div">
						<button type="button" name="previous" className="previous action-button"
							onClick={() => { setTab(1) }}>
							Previous
						</button>

						<button type="button" name="next" className="next action-button"
							onClick={() => { setTab(3) }}>
							Next
						</button>
					</div>
				</fieldset>}
			{/* page 2*/}



			{/* page 3 */}
			{
				tab === 3 &&
				<fieldset>
					<legend className="fs-title">Additional Details</legend>
					<h3 className="fs-subtitle">Feel free to  skip these</h3>

					{error.tab && error.tab === 3 && <div className="error">{error.message}</div>}


					<div className="input-container">
						<label htmlFor="contact" className="label">contact</label>
						<input type="tel" className="input" name="contact" id="contact"
							maxLength="10"
							// pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
							value={contact}
							// required
							onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="birthday" className="label">birthday</label>
						<input type="date" className="input" value={birthday} id="birthday" name="birthday"
							onChange={handleChange} />
					</div >

					<div className="input-container">
						<label htmlFor="profile_picture">profile picture</label>
						<input type="file" id="profile_picture" name="profile_picture" ref={profile_picture} />
					</div>


					<div className="input-container">
						<label htmlFor="bio" className="label">bio</label>
						<textarea className="input" id="bio" name="bio" maxLength={150}
							style={{ resize: "none" }}
							rows="4"
							value={bio}
							onChange={handleChange} />
					</div>

					< div className="button-div">
						<button type="button" name="previous" onClick={() => { setTab(2) }} className="previous action-button"  >Previous</button>
						<button type="submit" name="submit" className="submit action-button"  >Signup</button>
					</div>
				</fieldset>
			}
			{/* page 3 */}
		</form >

	)
}
export default Signup;
