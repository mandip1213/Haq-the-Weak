import { useState, useEffect } from "react"
import useGlobalContext from "./Globalcontext";
import URL from "../../baseurl"

const useFetch = () => {
	const [state, setState] = useState({ isLoading: true, data: [], error: "" });
	const { access_token } = useGlobalContext();


	useEffect(async () => {

		const _res = await fetch(`${URL}/api/leaderboard/`, {
			headers: { "Authorization": `Bearer ${access_token}` }

		})

		const res = await _res.json()
		console.log(res);


	}, []);

	return state;


}

export default useFetch