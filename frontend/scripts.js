const url = `http://localhost:8000/api`
function getFormData(object) {
	const formData = new FormData();
	Object.keys(object).forEach(key => formData.append(key, object[key]));
	return formData;
}

const auth = async () => {
	const _ = await fetch(`${url}/auth/token/`, {
		method: "POST",
		body: JSON.stringify({ email: "aviato@gmail.com", password: "password" }),
		headers: {
			"content-type": "application/json"
		}
	})
	const { access } = await _.json()
	return access;
}


function addUser() {

	const users = [
		["dianos temp", "temp@gmail.com", "temppassword", "temppassword", "lorem", "ipsum", "Male", "Kathmandu", "2000-01-01", 27.7104, 85.3487],
		["lorem1213", "lorem@gmail.com", "password", "password", "lorem", "ipsum", "Male", "Kathmandu", "2000-01-01", 27.7104, 85.3487],
		["aviato1213", "aviato@gmail.com", "password", "password", "aviato", "nakasara", "Male", "Chitwan", "2010-01-01", 27.7104, 85.3487],
		["hioas1213", "hioas@gmail.com", "password", "password", "hioas", "kiota", "Male", "Morang", "2010-01-01", 27.7104, 85.3487],
		["esoaniol1213", "esoaniol@gmail.com", "password", "password", "esoaniol", "olium", "Male", "Kathmandu", "2010-01-01", 27.7104, 85.3487],

	]
	users.forEach((user) => {
		const keys = ["username", "email", "password", "confirm_password", "first_name", "last_name", "gender", "home_town", "date_of_birth", "home_latitude", "home_longitude"]
		const obj = {}
		for (let i = 0; i < keys.length; i++) {
			obj[keys[i]] = user[i]

		}
		obj["bio"] = "this is my bio"
		console.log(obj);
		const formdata = getFormData(obj)
		fetch(`${url}/user/`, {
			method: "POST",
			headers: {
				// "Content- Type": " multipart/form-data"
			},
			body: formdata
		}).then(res => res.json())
			.then(res => { console.log(res.uuid) })
			.catch(error => {
				console.log("error occured while addihg user error", error)
			})
	})
}
// (async () => {

// 	const access = await auth()
// 	console.log(access, " access");
// 	fetch(`${url}/user/`, {
// 		headers: {
// 			"authorization": `Bearer ${access}`
// 		}
// 	})
// 		.then(_ => _.json())
// 		.then(res => { console.log(res); })
// })()
// addUser()
async function addVendorToUser() {
	const access = await auth()
	const res = await fetch(`${url}/vendor/`)
	const vendors = await res.json()
	console.log("vendors  ", vendors);
	vendors.forEach(async (vendor) => {
		const obj = { vendor: vendor.id, public: true }
		const res = await fetch(`${url}/visit/`, {
			method: "post",
			body: JSON.stringify(obj),
			headers: {
				"Authorization": `Bearer ${access}`,
				"Content-Type": "application/json"
			}
		})
	})

}

addVendorToUser()