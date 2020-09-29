import React, { Component } from "react";
import "bulma/css/bulma.min.css";
import "../utilities/helper.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="columns heading has-text-weight-bold has-background-light">
					<div className="column center">
						<Link to="/">
							<p className="navbar-item has-text-black">Home</p>
						</Link>
						<Link to="/about-me">
							<p className="navbar-item has-text-black">
								About Me
							</p>
						</Link>
						<Link to="Academic">
							<p className="navbar-item has-text-black">
								Academic Experience
							</p>
						</Link>
						<Link to="Hobbies">
							<p className="navbar-item has-text-black">
								Hobbies
							</p>
						</Link>
						<Link to="Contact">
							<p className="navbar-item has-text-black">
								Contact
							</p>
						</Link>
						<Link to="Login">
							<p className="navbar-item has-text-black">
								Log in
							</p>
						</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Navbar;
