import React, { useEffect } from 'react';
import useFetch from '../utils/UseFetch';

const Vendor = () => {
	const { isLoading, data: vendors, error } = useFetch("/api/vendor/")
	// const { isLoading: lol, data, error: lll } = useFetch("/api/vendor/8a07ed59-fcec-4672-bea9-9fa97e8953f3/")

	if (isLoading) {
		return <div>Loading</div>
	}
	if (error) {
		return <div>Error</div>
	}
	return (
		<div>
			{
				vendors.map(({ contact, id, image, is_spponsor, location, name, type_of_place }) => (
					<div key={id} style={{ display: "flex", justifyContent: "space-between" }}>
						<div>{name}</div>
						<div>{contact ? contact : 980_5643_242}</div>
						<div>{type_of_place}</div>
						<div>{location}</div>
					</div>

				))
			}

		</div>
	)
};

export default Vendor;
