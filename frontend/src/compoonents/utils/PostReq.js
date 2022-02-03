import URL from "../../baseurl"
const PostRequest = async ({ endpoint, access_token, options }) => {
	console.log(access_token);
	const _res = await fetch(`${URL}${endpoint}`, {
		method: "POST",
		headers: {
			authorization: `Bearer ${access_token}`,
			"Content-Type": "application/json"
		},
		...options
	})
	const res = await _res.json()

	console.log("res from ", endpoint, res);
}

export const PatchRequest = async ({ endpoint, access_token, options }) => {
	console.log(access_token);

	try {
		const _res = await fetch(`${URL}${endpoint}`, {
			method: "Patch",
			headers: {
				authorization: `Bearer ${access_token}`,
				"Content-Type": "application/json"
			},
			...options
		})
		const res = await _res.json()
		console.log("res from ", endpoint, res);
	} catch (error) {
		console.log("error on ", endpoint, error)
		return 0
	}
	return 1; //temp ret val
}

export default PostRequest