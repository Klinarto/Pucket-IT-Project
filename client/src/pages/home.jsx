import React, { Component } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./home.css";
import "../utilities/helper.css";
import "./font.css";
import Fade from 'react-reveal/Fade';

class Home extends Component {
	constructor(props) {
		super();
		
		this.state = {
			heroTitle: "",
			heroDesc: "",
			heroBG: "",
			title: "",
			description: "",
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/")
			.then((response) => {
				if (response.data.length > 1) {
					this.setState({
						heroTitle: response.data[0].title,
						heroDesc: response.data[0].description,
						heroBG: response.data[0].image,
						title: response.data[1].title,
						description: response.data[1].description,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<React.Fragment>
				<section className="hero is-fullheight">
					<div
						id="home-hero"
						className="hero-body"
						style={{ backgroundImage: `url(${this.state.heroBG})` }}
					>
						<Fade right>
							<div id="motto" className="container">
								<h1 className="title is-1 has-text-white has-text-right font">
									{this.state.heroTitle}
								</h1>
								<p className="subtitle has-text-white has-text-right font">
									{this.state.heroDesc}
								</p>
							</div>
						</Fade>
					</div>
				</section>

				<section className="section has-background-light">
					<div className="container">
						<Fade big duration={2000}>
							<div className="card">
								<div className="card-content">
									<h1 className="title font">{this.state.title}</h1>
									<p className="font">{this.state.description}</p>
								</div>
							</div>
						</Fade>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Home;
