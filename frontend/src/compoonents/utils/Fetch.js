import { useState, useEffect } from "react"
import useGlobalContext from "./Globalcontext";
import URL from "../../baseurl"

const useFetch = (endpoint) => {
	const [state, setState] = useState({ isLoading: true, data: [], error: "" });
	const { access_token } = useGlobalContext();


	useEffect(async () => {
		try {
			const _res = await fetch(`${URL}${endpoint}`, {
				// headers: { "Authorization": `Bearer ${access_token}` }

			})
			console.log(_res.status);
			const res = await _res.json()
			console.log("response from server : ", res);

			if (_res.status !== 200) {
				console.log("error");
				const error = res.detail ? res.detail : "AN unknown error occured"
				setState({ ...state, error: error, isLoading: false })
				return;
			}
			setState({ ...state, data: res, isLoading: false })

		} catch (error) {
			console.log("error onreturn   ", error);

			setState({ ...state, error: "Check all fields", isLoading: false })
		}

	}, []);

	return state;


}

export default useFetch