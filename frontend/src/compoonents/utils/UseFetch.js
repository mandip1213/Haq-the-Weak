import { useState, useEffect } from "react"
import useGlobalContext from "./Globalcontext";
import URL from "../../baseurl"
import { handleLogout } from "./logout";

const useFetch = (endpoint, dependencyArray = []) => {
	const [state, setState] = useState({ isLoading: true, data: [], error: "" });
	const { access_token, refresh_token, dispatch } = useGlobalContext();


	useEffect(async () => {
		try {
			//try to fetch data
			const _res = await fetch(`${URL}${endpoint}`, {
				headers: { "Authorization": `Bearer ${access_token}` }
			})

			const res = await _res.json()
			console.log("response for  ", endpoint, res);

			if (_res.status === 401) {
				//token exdpired now reresh the access token
				console.log("token expired I guess")/* Todo verify properly  from backend*/
				const _res = await fetch(`${URL}/api/auth/token/refresh/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ refresh: refresh_token })
				})
				const res = await _res.json()
				// console.log("refresh res ", res);
				if (res.access) {
					// console.log("before dispatch");
					dispatch({ type: "UPDATE_ACCESS", payload: { access_token: res.access } })
					// console.log("after dispatch");
				} else {
					setState({ ...state, error: "an unknown error occured ", isLoading: false })
					handleLogout(dispatch)
					return;
				}
				// console.log("after dispatch inside usefecth");

				const ___res = await fetch(`${URL}${endpoint}`, {
					headers: { "Authorization": `Bearer ${res.access}` }

				});

				const __res = await ___res.json()
				if (___res.status !== 200) {
					// console.log("error  inside ---res.status");
					const error = res.detail ? res.detail : "AN unknown error occured"
					setState({ ...state, error: error, isLoading: false })
					return;
				}

				console.log("res for   ", endpoint, __res)
				setState({ ...state, data: __res, isLoading: false })
				return;

			}

			if (_res.status !== 200) {
				console.log("error");
				const error = res.detail ? res.detail : "AN unknown error occured"
				setState({ ...state, error: error, isLoading: false })
				return;
			}
			setState({ ...state, data: res, isLoading: false })

		}

		catch (error) {
			console.log("error onreturn   ", error);
			setState({ ...state, error: "Check all fields", isLoading: false })
		}

	}, dependencyArray);

	return state;


}

export default useFetch