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

	console.log(res);
}

export default PostRequest