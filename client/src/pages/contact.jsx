import React, { Component } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
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
									placeholder="Fake Faker"
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Email</label>
							<div className="control">
								<input
									className="input is-danger"
									type="email"
									placeholder="e.g. FakeEmail@Fake.com"
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Message</label>
							<div className="control">
								<textarea
									className="textarea"
									placeholder="Fake Message"
								></textarea>
							</div>
						</div>

						<div class="field is-grouped">
							<div class="control">
								<button class="button is-link">Submit</button>
							</div>
							<div class="control">
								<button class="button is-link is-light">
									Cancel
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
