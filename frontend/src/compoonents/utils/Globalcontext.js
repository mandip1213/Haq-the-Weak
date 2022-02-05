import React from "react";
import Reducer from "./Reducer";
const GlobalContext = React.createContext()

const initialState = {

	access_token: "",
	refresh_token: "",
	username: "",
	profile_picture: "",
	uuid: "",
	isLoggedIn: false,
	isVendor: false
}
const initializeState = (state) => {
	let refresh_token = localStorage.getItem("refresh_token");
	let access_token = localStorage.getItem("access_token");
	let uuid = localStorage.getItem("uuid")
	let isVendor = localStorage.getItem("isVendor")
	let username = localStorage.getItem("username")
	let profile_picture = localStorage.getItem("profile_picture")
	if (access_token && refresh_token && uuid && username) {
		refresh_token = JSON.parse(refresh_token)
		access_token = JSON.parse(access_token)
		isVendor = JSON.parse(isVendor)
		uuid = JSON.parse(uuid)
		username = JSON.parse(username)
		profile_picture = JSON.parse(profile_picture)
		return { ...state, access_token, refresh_token, uuid, isLoggedIn: true, isVendor, username, profile_picture }
	}
	return state
}

export const GlobalContextProvider = ({ children }) => {


	const [state, dispatch] = React.useReducer(Reducer, initialState, initializeState)
	const value = {
		...state,
		dispatch,
	}
	return (
		<GlobalContext.Provider value={value} >
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => React.useContext(GlobalContext)
export default useGlobalContext