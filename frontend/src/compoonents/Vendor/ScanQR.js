import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import PostRequest from '../utils/PostReq';

const ScanQR = () => {
	const { access_token } = useGlobalContext()
	const _id = ["cd82cdc2-2455-43df-a850-1661692e5320", "b15151e7-4a68-4106-96e0-b3c86879a931", "84ac6466-63f2-40a6-bcb2-2bf6db5d1171", "734e6abd-6da1-4177-929f-3076e452e4f9"]

	const handleAdd = async () => {
		const id = _id[Math.floor(Math.random() * _id.length)]
		const body = {
			vendor: id,
			public: true
		}

		PostRequest({ endpoint: "/api/visit/", access_token, options: { body: JSON.stringify(body) } })
	}
	return (
		<div className="add">
			< button className="action-button " onClick={handleAdd}>ADD </button>
		</div>
	)
};

export default ScanQR;
