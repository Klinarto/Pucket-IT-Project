import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import Showcase from "../components/showcase.component";
import "bulma/css/bulma.min.css";
import "./academic.css";
import axios from "axios";

class Academic extends Component {
	constructor(props) {
		super();

		this.state = { experiences: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/academic-experiences")
			.then((response) => {
				this.setState({ experiences: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<Navbar />
				<div>
					{this.state.experiences.map((experience) => {
						return (
							<Showcase
								title={experience.title}
								description={experience.description}
								image={experience.image}
								alignment={experience.alignment}
								key={experience._id}
							/>
						);
					})}
				</div>
			</React.Fragment>
		);
	}
}

export default Academic;
