import React from "react";
import Reducer from "./Reducer";
const GlobalContext = React.createContext()

const initialState = {

	access_token: "",
	refresh_token: "",
	userDetails: {
		username: "", email: "", id: ""

	},
	isLoggedIn: false,
}
const initializeState = (state) => {
	let refresh_token = localStorage.getItem("refresh_token");
	let access_token = localStorage.getItem("access_token");
	let userDetails = localStorage.getItem("userDetails")
	if (access_token && refresh_token && userDetails) {
		refresh_token = JSON.parse(refresh_token)
		access_token = JSON.parse(access_token)
		userDetails = JSON.parse(userDetails)
		return { ...state, access_token, refresh_token, userDetails, isLoggedIn: true }
	}
	return state
}

export const GlobalContextProvider = ({ children }) => {


	const [state, dispatch] = React.useReducer(Reducer, initialState, initializeState)
	const value = {
		...state,
		dispatch,
		test: "testing mode "
	}
	return (
		<GlobalContext.Provider value={value} >
			{children}
		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => React.useContext(GlobalContext)
export default useGlobalContext