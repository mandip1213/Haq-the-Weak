import React from 'react';
import "./css/LpFooter.css"
const LpFooter = () => {

	React.useEffect(() => {

		const userscount = document.querySelector("#users-count")
		const vendorscount = document.querySelector("#vendors-count")
		const scanscount = document.querySelector("#scans-count")
		// console.log(userscount)

		const usercount = 104;
		const vendorcount = 37;
		const scancount = 1024;

		const maxcount = Math.max(usercount, vendorcount, scancount)
		let usercounter = 0;
		let vendorcounter = 0;
		let scancounter = 0;
		let options = {
			rootMargin: '0px',
			threshold: 1.0
		}
		let target = document.querySelector(".lp-counter")
		let observer = new IntersectionObserver(callback, options);
		observer.observe(target);
		function callback(entries, observer) {
			entries.forEach(entry => {

				if (entry.isIntersecting > 0) {
					// console.log("reached destination", entry.isIntersecting)
				} else {
					return
				}

				const userRef = setInterval(() => {
					userscount.innerText = usercounter;
					// console.log("user")
					if (usercounter >= usercount)
						clearInterval(userRef)
					usercounter++;
				}, [2000 / usercount])

				const vendorRef = setInterval(() => {
					vendorscount.innerText = vendorcounter;
					// console.log("vendor")
					if (vendorcounter >= vendorcount)
						clearInterval(vendorRef)
					vendorcounter++;
				}, [2000 / vendorcount])

				const scanRef = setInterval(() => {
					// console.log("scan")
					scanscount.innerText = scancounter;
					if (scancounter >= scancount)
						clearInterval(scanRef)
					scancounter++;
				}, [2000 / scancount])
				observer.unobserve(target)
			});
		};



	}, []);




	return (<footer>
		<div className="lp-container">

			<div className="lp-footer-content">

				<div className="lp-address">
					<svg
						className='location-icon'
						viewBox="0 0 395.71 395.71"
						fill="currentColor"
					>
						<path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
				c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
				C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
				c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
					</svg>
					<p>
						Lalitpur, Nepal </p>
				</div>

				<div className="lp-contact-info">

					<div className="flex-start">
						Phone:
						<p>985974927</p>
					</div>

					<div className="flex-start">
						Email:
						<p>info@tripbee.com</p>
					</div>
				</div>

				<div className="footer-nav">
					<ul>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Offers</a></li>
						<li>
							<a href="#"></a>
						</li>
						<li><a href="#">log</a></li>
					</ul>
				</div>


			</div>

		</div>
	</footer>)
};

export default LpFooter;
