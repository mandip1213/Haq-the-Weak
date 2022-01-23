import React, { useState, createRef } from 'react';
import URL from "../../baseurl"
import { Link, useNavigate } from 'react-router-dom';
import useGlobalContext from '../utils/Globalcontext';

const Signup = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useGlobalContext()
	const [signupDetails, setsignupDetails] = useState({
		email: "temp@temp.com", password: "temppassword	", confirmPassword: "temppassword"
		, username: "khamer", firstname: "lorem", lastname: "ipsum", bio: "Nepal lies between China and India ", home_town: "Dreamland"
	})
	// const [signupDetails, setsignupDetails] = useState({
	// 	email: "", password: "", confirmPassword: "",
	// 	username: "", firstname: "", lastname: "", bio: "", home_town: ""
	// })
	const [error, setError] = useState("")
	const profile_picture = createRef()
	const { email, password, username, confirmPassword, firstname, lastname, bio, home_town } = signupDetails;

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn])

	const handleChange = ({ target: { name, value } }) => {
		if (error) setError("");
		setsignupDetails({ ...signupDetails, [name]: value })
	}
	console.log(firstname);
	// 'name',
	// 'username',
	// 	'email',
	// 	'password',
	// 	'confirm_password',
	// 	'profile_picture',
	// 	'bio',
	// 	'home_town'


	const signup = (_signupDetails) => (e) => {
		e.preventDefault();

		const { email, password, username, confirmPassword, firstname, lastname, bio, home_town } = _signupDetails;

		// console.log(profile_picture.current.files[0]);

		const formdata = new FormData()

		formdata.append("name", (firstname + lastname))
		formdata.append("username", username)
		formdata.append("email", email)
		formdata.append("password", password)
		formdata.append("confirm_password", confirmPassword)
		if (profile_picture.current.files[0])
			formdata.append("profile_picture", profile_picture.current.files[0]);
		formdata.append("bio", bio)
		formdata.append("home_town", home_town)
		// console.log(formdata);
		for (let [key, values] of formdata.entries()) {
			console.log(key, values);
		}

		fetch(`${URL}/api/user/`, {
			method: "POST",
			body: formdata,
			headers: {
				// "Content-type": "application/json"
			}
		}).then(res => res.json())
			.then(res => console.log(res))
		return/* temp */
		console.log("signup");
		if (!email || !password || !confirmPassword || !username)
			return setError("All fields must bve filled");
		if (password !== confirmPassword)
			return setError("Password donot match")
		if (password.length < 6)
			return setError("passowrd must be 6 characters long");


	}
	return <div className="signupFrm">
		<div className="wrapper">

			<form onSubmit={signup(signupDetails)} className="form">
				<h1 className="title">Sign up</h1>

				{error && <div className="error">{error}</div>}

				<div className="inputContainer">
					<label htmlFor="" className="label">firstname</label>
					<input type="text" className="input" value={firstname} name="firstname" onChange={handleChange} />
				</div>

				<div className="inputContainer">
					<label htmlFor="" className="label">lastname</label>
					<input type="text" className="input" value={lastname} name="lastname" onChange={handleChange} />
				</div>

				<div className="inputContainer">
					<label htmlFor="" className="label">Email</label>
					<input type="text" className="input" value={email} name="email" onChange={handleChange} />
				</div>

				<div className="inputContainer">
					<label htmlFor="" className="label">Username</label>
					<input type="text" className="input" value={username} name="username" onChange={handleChange} />
				</div>

				<div className="inputContainer">
					<label htmlFor="" className="label">Password</label>
					<input type="text" className="input" value={password} name="password" onChange={handleChange} />
				</div >


				<div className="inputContainer">
					<label htmlFor="" className="label">Confirm Password</label>
					<input type="text" className="input" value={confirmPassword} name="confirmPassword" onChange={handleChange} />
				</div >

				<div className="inputContainer">
					<label htmlFor="" className="label">bio</label>
					<input type="text" className="input" value={bio} name="bio" onChange={handleChange} />
				</div >


				<div className="inputContainer">
					<label htmlFor="" className="label">home_town</label>
					<input type="text" className="input" value={home_town} name="home_town" onChange={handleChange} />
				</div >

				<div className="inputContainer">
					<label htmlFor="profile_picture"></label>
					<input type="file" id="profile_picture" name="profile_picture" ref={profile_picture} />
				</div>

				<input type="submit" className="submitBtn" value="Sign up" />

				<div className="naming-is-hard">Already a member<Link to="/login">login</Link></div>

			</form>

		</div>
	</div >
};

export default Signup;
