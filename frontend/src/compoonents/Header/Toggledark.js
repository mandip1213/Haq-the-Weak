import React, { useState, useEffect } from 'react';
import "./Toggledark.css"

const Toggledark = () => {


	const [isDark, setIsDark] = useState(true);
	useEffect(() => {
		if (isDark) {
			document.querySelector("body").classList.remove("light")
		}
		else {
			document.querySelector("body").classList.add("light")
		}
	}, [isDark]);


	return (<div className='toggle-dark'>
		<input type="checkbox" className="checkbox" id="chk" onChange={() => setIsDark(prev => !prev)} />
		<label className="label" htmlFor="chk">
			<i className="fas fa-moon"></i>
			<i className="fas fa-sun"></i>
			<div className="ball"></div>
		</label>
	</div>)
};

export default Toggledark;
