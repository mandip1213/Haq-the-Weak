import React from 'react';
import "./Loading.css"
const Loading = () => {
	return (

		<div className="loading">
			<p>Loading</p>
			<div className="loading_anim">
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
			</div>
		</div>)
};

export default Loading;
