import React from "react";
import $ from 'jquery';
import '../index.css';

class About extends React.Component {
	componentDidMount() {
		$('#root').css("background", "lightblue");
	}

	render() {
		return (
			<div className="aboutPage">
				<div className="aboutTxt">
					<h1> Welcome to ParkIn And Relax </h1>
					<br></br>
					<h4>Our friendly hosts will welcome you with smile.
			With ParkIn, it’s easy to get rewarded.</h4>
					<h4>Through our mobile-friendly technology you can earn points and redeem
					them for Free Days. All from your smartphone.
			Sign up now and start earning today.</h4>
				</div>
				<br></br>
				<h2>The Owners of the ParkIn </h2>
				<div className="aboutowners">
					<li> Azhar Al-Bakri</li>
					<li> Mohmoud khudiri</li>
					<li> Mohmoud Zaid</li>
					<li> Mustaf Dirie</li>
				</div>
				<div className="aboutimage"></div>
			</div>
		);
	}
}

export default About;	