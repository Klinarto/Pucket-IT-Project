import React, { Component } from "react";
import CarouselImage from "../components/carousel_image.component";
import { Carousel } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "bulma/css/bulma.min.css";
import Fade from 'react-reveal/Fade';

class AboutMe extends Component {
	constructor(props) {
		super();

		this.state = { title: "", description: "", carouselImages: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/about-me")
			.then((response) => {
				if (response.data.length > 0) {
					this.setState({
						title: response.data[0].title,
						description: response.data[0].description,
						carouselImages: response.data[0].carouselImages,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<section className="section mb-2">
					<Carousel autoplay>
						{this.state.carouselImages.map((image, index) => {
							return (
								<CarouselImage
									className="carousel-image"
									key={index}
									url={image.url}
									title={image.title}
									caption={image.caption}
								/>
							);
						})}
					</Carousel>
				</section>

				<section className="section has-background-light">
					<Fade big delay={1000}>
						<div className="container">
							<div className="card">
								<div className="card-content">
									<h1 className="title">{this.state.title}</h1>
									<p>{this.state.description}</p>
								</div>
							</div>
						</div>
					</Fade>
				</section>
			</React.Fragment>
		);
	}
}

export default AboutMe;
