import React, { Component } from "react";
import Navbar from "../components/navbar";
import Header from "../components/header";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css";
import "./about-me.css";

class AboutMe extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Navbar />
				<section className="section mb-2">
					<Carousel>
						<Carousel.Item>
							<figure>
								<img
									className="d-block carousel-image"
									src={require("../images/carousel-1.jpg")}
									alt="First slide"
								/>
							</figure>

							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>
									Nulla vitae elit libero, a pharetra augue
									mollis interdum.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<figure>
								<img
									className="d-block carousel-image"
									src={require("../images/carousel-2.jpg")}
									alt="Second slide"
								/>
							</figure>

							<Carousel.Caption>
								<h3>Second slide label</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<figure>
								<img
									className="d-block carousel-image"
									src={require("../images/carousel-3.jpg")}
									alt="Third slide"
								/>
							</figure>

							<Carousel.Caption>
								<h3>Third slide label</h3>
								<p>
									Praesent commodo cursus magna, vel
									scelerisque nisl consectetur.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
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

export default AboutMe;
