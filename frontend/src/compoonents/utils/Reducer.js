const Reducer = (state, { type, payload }) => {
	console.log("reducer");
	if (type === "LOGIN") {
		const { access_token, refresh_token, uuid } = payload
		return ({ ...state, access_token, refresh_token, uuid, isLoggedIn: true })
	}
	if (type === "LOGOUT") {
		return ({ ...state, access_token: "", refresh_token: "", uuid: "", isLoggedIn: false })
	}
	return state;
}

export default Reducer
