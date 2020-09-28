import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import "bulma/css/bulma.min.css";

class Contact extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<Header />
				<Navbar />
				<section className="section has-background-light">
					<div className="card container">
						<div className="field">
							<label className="label">Name</label>
							<div className="control">
								<input
									className="input"
									type="text"
									placeholder="John Doe"
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Email</label>
							<div className="control">
								<input
									className="input"
									type="email"
									placeholder="e.g. JohnDoe@gmail.com"
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Message</label>
							<div className="control">
								<textarea
									className="textarea"
									placeholder="Message Description"
								></textarea>
							</div>
						</div>

						<div className="field is-grouped">
							<div className="control">
								<button
									className="button is-link"
									name="send-message"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Contact;
