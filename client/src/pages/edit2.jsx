import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import "bulma/css/bulma.min.css";
import axios from "axios";
import "antd/dist/antd.css";

class Add extends Component {
	constructor(props) {
		super();

		this.state = {
			title: "",
			sections: ["Academic Experience", "Hobbies"],
			section: "",
			alignments: ["Left", "Right"],
			alignment: "",
			description: "",
		};
	}

	onSubmit = (e) => {
		e.preventDefault();
		const document = {
			title: this.state.title,
			description: this.state.description,
			alignment: this.state.alignment,
		};

		console.log(document);
	};

	componentDidMount() {}
	render() {
		return (
			<React.Fragment>
				<Header />
				<Navbar current="add" />
				<section className="section">
					<div className="container">
						<form action="post" onSubmit={this.onSubmit}>
							<div className="field">
								<label className="label">Title</label>
								<div className="control">
									<input
										className="input"
										type="text"
										placeholder="E.g. Project 1, Drawing"
										value={this.state.title}
										onChange={(e) => {
											this.setState({
												title: e.target.value,
											});
										}}
									/>
								</div>
							</div>

							<div className="field">
								<label className="label">Section</label>
								<div className="control">
									<div className="select">
										<select
											value={this.state.section}
											onChange={(e) => {
												this.setState({
													section: e.target.value,
												});
											}}
										>
											{this.state.sections.map(
												(section) => {
													return (
														<option
															key={section}
															value={section}
														>
															{section}
														</option>
													);
												}
											)}
										</select>
									</div>
								</div>
							</div>

							<div className="field">
								<label className="label">Alignment</label>
								<div className="control">
									<div className="select">
										<select
											ref="userInput"
											className="form"
											value={this.state.alignment}
											onChange={(e) => {
												this.setState({
													alignment: e.target.value,
												});
											}}
										>
											{this.state.alignments.map(
												(alignment) => {
													return (
														<option
															key={alignment}
															value={alignment}
														>
															{alignment}
														</option>
													);
												}
											)}
										</select>
									</div>
								</div>
							</div>

							<div className="field">
								<label className="label">Description</label>
								<div className="control">
									<textarea
										className="textarea"
										placeholder="Short Description"
										value={this.state.description}
										onChange={(e) => {
											this.setState({
												description: e.target.value,
											});
										}}
									></textarea>
								</div>
							</div>

							<div className="field is-grouped">
								<div className="control">
									<button className="button is-link">
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Add;
