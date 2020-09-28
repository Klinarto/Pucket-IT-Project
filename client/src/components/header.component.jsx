import React, { Component } from "react";
import "./header.css";

class Header extends Component {
	state = {};
	render() {
		return (
			<div className="header">
				<div className="container center">
					<h2 className="subtitle is-0">Grizz Last Name</h2>
				</div>
				<div className="container center">
					<h2 className="subtitle">
						Graduate Student in University of Melbourne
					</h2>
				</div>
			</div>
		);
	}
}

export default Header;
