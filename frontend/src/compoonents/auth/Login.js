import React, { useState } from 'react'
import URL from "../../baseurl"
import useGlobalContext from '../utils/Globalcontext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const { dispatch, isLoggedIn } = useGlobalContext();
	const [error, setError] = useState("")
	const [loginDetails, setLoginDetails] = useState({ email: "temp@temp.com", password: "temppassword	" })
	// const [loginDetails, setLoginDetails] = useState({ email: "", password: "" })

	const { email, password } = loginDetails;

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn])
	const handleChange = ({ target: { name, value } }) => {
		if (error) setError("");
		setLoginDetails({ ...loginDetails, [name]: value })
	}

	const login = (_loginDetails) => async (e) => {
		const { email, password } = _loginDetails
		console.log("login");
		e.preventDefault()
		if (!email || !password)
			return setError("All fields must be filled");

		if (password.length < 6)
			return setError("Incorrect Password");
		let result;

/* temp */dispatch({ type: "LOGIN" })
		// try {
		// 	const res = await fetch(`${URL}/api/auth/token`, {
		// 		method: "POST",
		// 		body: JSON.stringify({ email, password }),
		// 		headers: {
		// 			"content-type": "application/json"
		// 		}
		// 	})
		// 	result = await res.json()
		// 	console.log(result);
		// }
		// catch (error) {
		// 	return setError("An unknown error occured")
		// }
		// if (result.status = 0) {
		// 	return setError("Invalid email and password")
		// }
		// if (result.access_token && result.refresh_token && result.username && result.email) {
		// 	console.log("hello");
		// 	localStorage.setItem("refresh_token", JSON.stringify(result.refresh_token));
		// 	localStorage.setItem("access_token", JSON.stringify(result.access_token));
		// 	localStorage.setItem("userDetails", JSON.stringify({ username: result.username, email: result.email, id: result.id }))
		// 	dispatch({
		// 		type: "LOG_IN",
		// 		payload: {
		// 			access_token: result.access_token,
		// 			refresh_token: result.refresh_token,
		// 			userDetails: { username: result.username, email: result.email, id: result.id }
		// 		}
		// 	})
		// 	return;
		// }


	}


	return (
		<div className="login-from">
			<div className="wrapper">

				<form onSubmit={login(loginDetails)} action="" className="form">

					<h1 className="title">Log in</h1>

					{error && <div className="error">{error}</div>}

					<div className="inputContainer">
						<label htmlFor="" className="label">Email</label>
						<input type="text" name="email" className="input" value={email} onChange={handleChange} />
					</div>

					<div className="inputContainer">
						<label htmlFor="" className="label">Password</label>
						<input type="text" name="password" className="input" value={password} onChange={handleChange} />
					</div>

					<input type="submit" className="submitBtn" value="Login" />

					<div className="naming-is-hard">Not registered Yet ? <Link to="/signup">signup</Link></div>

				</form>

			</div>
		</div>
	)
}

export default Login
