const Reducer = (state, { type, payload }) => {
	console.log("reducer");
	if (type === "LOGIN") {
		return ({ ...state, isLoggedIn: true })
	}
	return state;
}

export default Reducer
