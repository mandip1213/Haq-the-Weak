import React from 'react';
import useGlobalContext from '../utils/Globalcontext';


import { useNavigate } from 'react-router-dom'
const Login = () => {

	const navigate = useNavigate()
	const { dispatch, isLoggedIn } = useGlobalContext()

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn])

	return (<>
		<button onClick={() => { dispatch({ type: "LOGIN" }) }}>Login</button>
	</>)
};

export default Login;
