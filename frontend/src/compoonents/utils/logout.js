
export const handleLogout = (dispatch) => {
	localStorage.removeItem("access_token")
	localStorage.removeItem("refresh_token")
	localStorage.removeItem("uuid")
	localStorage.removeItem("isVendor")
	dispatch({ type: "LOGOUT" })
}
