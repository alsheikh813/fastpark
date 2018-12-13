import React from "react";
import $ from 'jquery';
import '../index.css';

class About extends React.Component {
	componentDidMount() {
		$('#root').css("background", "lightblue");
	}

	render() {
		return (
			// <div className="aboutPage">
			// 	<div className="aboutTxt">
			// 		<h1> Welcome to ParkIn And Relax </h1>
			// 		<br></br>
			// 		<h4>Our friendly hosts will welcome you with smile.
			// With ParkIn, it’s easy to get rewarded.</h4>
			// 		<h4>Through our mobile-friendly technology you can earn points and redeem
			// 		them for Free Days. All from your smartphone.
			// Sign up now and start earning today.</h4>
			// 	</div>
			// 	<br></br>
			// 	<h2>The Owners of the ParkIn </h2>
			// 	<div className="aboutowners">
			// 		<li> Azhar Al-Bakri</li>
			// 		<li> Mohmoud khudiri</li>
			// 		<li> Mohmoud Zaid</li>
			// 		<li> Mustaf Dirie</li>
			// 	</div>
			// 	<div className="aboutimage"></div>
			// </div>

			<div className="container d-flex justify-content-center">
				<div className="jumbotron row">
					<h1 className="display-4 mb-4 mt-2">Welcome to ParkIn!</h1>
					<p className="lead">Our friendly hosts will welcome you with smile. With ParkIn, it’s easy to get rewarded.</p>
					<hr className="my-4" />
					<p>Through our mobile-friendly technology you can earn points and redeem them for <em>Free</em> hours. All from your smartphone.
					Sign up now and start earning today.</p>
					<div className="container-fluid">
						<h5 className="mt-3 mb-3">Team Members</h5>
						<ul className="list-group row">
							<li className="list-group-item d-flex justify-content-between align-items-center liHover">
								<a href="https://github.com/ghosoun89" target="_blank">Ghusoun Aldabea</a>
								<span className="badge badge-primary badge-pill">7</span>
							</li>

							<li className="list-group-item d-flex justify-content-between align-items-center liHover">
								<a href="https://github.com/alsheikh813" target="_blank">Ashraf Alsheikh</a>
								<span className="badge badge-primary badge-pill">18</span>
							</li>

							<li className="list-group-item d-flex justify-content-between align-items-center liHover">
								<a href="https://github.com/MansourMoukdad88" target="_blank">Mansour Almoukdad</a>
								<span className="badge badge-primary badge-pill">8</span>
							</li>

							<li className="list-group-item d-flex justify-content-between align-items-center liHover">
								<a href="https://github.com/omar-dulaimi" target="_blank">Omar Dulaimi</a>
								<span className="badge badge-primary badge-pill">16</span>
							</li>
						</ul>

					</div>
				</div>


			</div>
		);
	}
}

export default About;	