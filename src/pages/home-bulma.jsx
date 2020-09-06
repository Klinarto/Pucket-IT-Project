import React, { Component } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import "bulma/css/bulma.min.css";
import "./home-bulma.css";
import "../utilities/helper.css";

class Home extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<Header />
				<Navbar />
				<section className="hero is-fullheight">
					<div id="home-hero" className="hero-body">
						<div id="motto" className="container">
							<h1 className="title is-1 has-text-white has-text-right">
								Motto
							</h1>
							<p className="subtitle has-text-white has-text-right">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nam ac purus turpis. Donec
								ornare neque libero. Etiam semper lacus a urna
								aliquet sollicitudin. Pellentesque habitant
								morbi tristique senectus et netus et malesuada
								fames ac turpis egestas. Quisque sagittis neque
								non varius posuere. Duis viverra nisi turpis,
								nec pretium mi dictum.
							</p>
						</div>
					</div>
				</section>

				<section className="section has-background-light">
					<div className="container card">
						<div className="card-content">
							<h1 className="title">Placeholder Title</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Etiam sit amet diam vitae erat
								molestie tincidunt vel vel purus. Sed est justo,
								semper at scelerisque ac, semper sit amet lacus.
								Donec tellus metus, accumsan a pretium nec,
								viverra sed nisi. Curabitur elementum suscipit
								sapien, ac vulputate dui sodales quis.
								Pellentesque metus nulla, fringilla eu purus id,
								commodo porttitor quam. Pellentesque tempor dui
								risus, ut sagittis tortor venenatis eu. Nulla
								venenatis suscipit ipsum, id lacinia risus. In
								dui nulla, tincidunt condimentum maximus non,
								convallis at sem. Sed cursus mattis mauris, sit
								amet sollicitudin elit.
							</p>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Home;
