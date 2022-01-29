import React from 'react';
import useGlobalContext from '../utils/Globalcontext';
import PostRequest from '../utils/PostReq';

const ScanQR = () => {
	const { access_token } = useGlobalContext()
	const _id = ["8a07ed59-fcec-4672-bea9-9fa97e8953f3", "761d3741-0213-46b8-a0d6-233573855c24", "4a4d2c5d-3636-42ae-8195-592450461e72", "0a4d2c5d-3636-42ae-8195-592450461e72"]
	const id = _id[Math.floor(Math.random() * _id.length)]
	const body = {
		vendor: id,
		public: true
	}
	const handleAdd = async () => {

		PostRequest({ endpoint: "/api/visit/", access_token, options: { body: JSON.stringify(body) } })
	}
	return (
		<div className="add">
			< button className="action-button " onClick={handleAdd}>ADD </button>
		</div>
	)
};

export default ScanQR;
