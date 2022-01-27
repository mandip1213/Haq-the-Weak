import React, { useState, useEffect, createRef } from 'react';
import URL from "../../baseurl"
import { Link, useNavigate } from 'react-router-dom';
import useGlobalContext from '../utils/Globalcontext';
import "./Signup.css"

function Signup() {
	/* states */
	const [tab, setTab] = useState(3);
	const [signupDetails, setsignupDetails] = useState({
		// email: "",
		email: "temp@mail.com",

		password: "temppassword", confirmPassword: "temppassword",
		gender: "Male",
		birthday: "",
		// birthday: new Date("2000-01-01").toISOString().substring(0, 10),
		username: "khamer", firstname: "lorem", lastname: "ipsum",
		bio: "Nepal lies between China and India ", home_town: "Morang",
		contact: ""
	})
	const [error, setError] = useState({})

	// const [signupDetails, setsignupDetails] = useState({
	// 	email: "", password: "", confirmPassword: "",
	// 	username: "", firstname: "", lastname: "", bio: "", home_town: "",gender: "",birtthday:"2000-01-01",
	// })

	const navigate = useNavigate()
	const { isLoggedIn } = useGlobalContext()
	const profile_picture = createRef()
	const { email, password, username, confirmPassword, firstname, lastname, bio, gender, contact, birthday, home_town } = signupDetails;
	/* use effect */

	React.useEffect(() => {
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

		formdata.append("username", username)
		formdata.append("email", email)
		formdata.append("password", password)
		formdata.append("confirm_password", confirmPassword)
		formdata.append("first_name", firstname)
		formdata.append("last_name", lastname)
		formdata.append("gender", gender)
		formdata.append("home_town", home_town)
		formdata.append("bio", bio)
		formdata.append("Age", "2000-01-01")

		if (profile_picture.current.files[0])
			formdata.append("profile_picture", profile_picture.current.files[0]);
		// console.log(formdata);
		// for (let [key, values] of formdata.entries()) {
		// 	console.log(key, values);
		// }

		fetch(`${URL}/api/user/`, {
			method: "POST",
			body: formdata,
			headers: {
				// "Content-type": "application/json"
			}
		}).then(res => res.json())
			.then(res => console.log(res)).catch(error => {
				setError({ tab: 3, message: "an unknown error occured" })
			})

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
					<h3 className="fs-subtitle">Some senseless text here </h3>
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
						<input type="text" className="input" value={password} id="password" name="password" onChange={handleChange} />
					</div >


					<div className="input-container">
						<label htmlFor="confirmPassword" className="label">Confirm Password</label>
						<input type="text" className="input" value={confirmPassword} id="confirmPassword" name="confirmPassword" onChange={handleChange} />
					</div >

					< div className="button-div">
						<button type="button" name="next" onClick={() => { setTab(2) }}
							className="next action-button" >Next</button>
					</div>

					<div className="naming-is-hard">Already a member? <Link to="/login">login</Link></div>

				</fieldset>
			}
			{/* page 1 */}

			{/* page 2 */}
			{tab === 2 &&
				<fieldset>
					<legend className="fs-title">Personal Details</legend>
					<h3 className="fs-subtitle">Some senseless text here</h3>
					{error.tab && error.tab === 2 && <div className="error">{error.message}</div>}

					<div className="input-container">
						<label htmlFor="firstname" className="label">firstname</label>
						<input type="text" className="input" value={firstname} id="firstname" name="firstname"
							onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="lastname" className="label">lastname</label>
						<input type="text" className="input" value={lastname} id="lastname" name="lastname"
							onChange={handleChange} />
					</div>

					<div className="input-container">
						<label htmlFor="home_town" className="label">home_town</label>
						<input type="text" className="input" value={home_town} id="home_town" name="home_town"
							onChange={handleChange} />
					</div >


					<div className="input-container">
						<label htmlFor="gender" className="label">gender</label>
						<input type="text" className="input" value={gender} id="gender" name="gender"
							onChange={handleChange} />
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
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
						<button type="submit" name="submit" className="submit action-button"  >Submit</button>
					</div>
				</fieldset>
			}
			{/* page 3 */}
		</form>

	)
}
export default Signup;
