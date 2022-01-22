const Reducer = (state, { type, payload }) => {
	console.log("reducer");
	if (type === "LOGIN") {
		return ({ ...state, isLoggedIn: true })
	}
	if (type === "LOGOUT") {
		return ({ ...state, isLoggedIn: false })
	}
	return state;
}

export default Reducer
