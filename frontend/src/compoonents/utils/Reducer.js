const Reducer = (state, { type, payload }) => {
	console.log("reducer");
	if (type === "LOGIN") {
		const { access_token, refresh_token, uuid } = payload
		return ({ ...state, access_token, refresh_token, uuid, isLoggedIn: true })
	}
	if (type === "LOGOUT") {
		return ({ ...state, access_token: "", refresh_token: "", uuid: "", isLoggedIn: false })
	} if (type === "UPDATE_ACCESS") {
		console.log("inside dispatch");
		localStorage.setItem("access_token", JSON.stringify(payload.access_token))
		return { ...state, access_token: payload.access_token }
	}
	return state;
}

export default Reducer
