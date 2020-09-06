import React, { Component } from "react";
import "bulma/css/bulma.min.css";
import "../utilities/helper.css";

class Navbar extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="columns heading has-text-weight-bold has-background-light">
					<div className="column center">
						<p className="navbar-item has-text-black">Home</p>
						<p className="navbar-item has-text-black">About Me</p>
						<p className="navbar-item has-text-black">
							Academic Experience
						</p>
						<p className="navbar-item has-text-black">Hobbies</p>
						<p className="navbar-item has-text-black">Contact</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Navbar;
