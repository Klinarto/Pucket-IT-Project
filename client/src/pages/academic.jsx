import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import Showcase from "../components/showcase.component";
import "bulma/css/bulma.min.css";
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
				console.log(response.data);
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
				<Navbar current="academic-experience" />
				<div>
					{this.state.experiences.map((experience) => {
						return (
							<Showcase
								title={experience.title}
								description={experience.description}
								image={experience.image}
								alignment={experience.alignment}
								startDate={new Date(experience.dateStart)}
								endDate={new Date(experience.dateEnd)}
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
