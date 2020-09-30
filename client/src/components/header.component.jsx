import React, { Component } from "react";
import axios from "axios";
import "./header.css";

class Header extends Component {
	constructor(props) {
		super();

		this.state = { title: "", caption: "" };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/title")
			.then((response) => {
				if (response.data.length > 0) {
					this.setState({
						title: response.data[0].title,
						caption: response.data[0].caption,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="header">
				<div className="container center">
					<h2 className="subtitle is-0">{this.state.title}</h2>
				</div>
				<div className="container center">
					<h2 className="subtitle">{this.state.caption}</h2>
				</div>
			</div>
		);
	}
}

export default Header;