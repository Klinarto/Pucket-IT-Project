import React, { Component } from "react";
import "bulma/css/bulma.min.css";
import "../utilities/helper.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav
					class="navbar"
					role="navigation"
					aria-label="main navigation"
				>
					<div class="navbar-brand">
						<a class="navbar-item" href="https://bulma.io"></a>

						<a
							role="button"
							class="navbar-burger burger"
							aria-label="menu"
							aria-expanded="false"
							data-target="navbarBasicExample"
						>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>

					<div id="navbarBasicExample" class="navbar-menu">
						<div class="navbar-start">
							<Link to="/">
								<a className="navbar-item">Home</a>
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
						</div>

						<div class="navbar-end">
							<div class="navbar-item">
								<a class="button is-light">Log in</a>
							</div>
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default Navbar;
