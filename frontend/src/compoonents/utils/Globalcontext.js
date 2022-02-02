import React from "react";
import Reducer from "./Reducer";
const GlobalContext = React.createContext()

const initialState = {

	access_token: "",
	refresh_token: "",
	uuid: "",
	isLoggedIn: false,
	isVendor: false
}
const initializeState = (state) => {
	let refresh_token = localStorage.getItem("refresh_token");
	let access_token = localStorage.getItem("access_token");
	let uuid = localStorage.getItem("uuid")
	let isVendor = localStorage.getItem("isVendor")
	if (access_token && refresh_token && uuid) {
		refresh_token = JSON.parse(refresh_token)
		access_token = JSON.parse(access_token)
		isVendor = JSON.parse(isVendor)
		uuid = JSON.parse(uuid)
		return { ...state, access_token, refresh_token, uuid, isLoggedIn: true, isVendor }
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