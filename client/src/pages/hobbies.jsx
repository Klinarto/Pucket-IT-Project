import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import Showcase from "../components/showcase.component";
import "bulma/css/bulma.min.css";
import axios from "axios";

// Replaced with showcase

class Academic extends Component {
	constructor(props) {
		super();

		this.state = { hobbies: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/hobbies")
			.then((res) => {
				this.setState({ hobbies: res.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<div>
					{this.state.hobbies.map((hobby) => {
						return (
							<Showcase
								title={hobby.title}
								description={hobby.description}
								image={hobby.image}
								alignment={hobby.alignment}
								startDate={null}
								endDate={null}
								key={hobby._id}
							/>
						);
					})}
				</div>
			</React.Fragment>
		);
	}
}

export default Academic;
