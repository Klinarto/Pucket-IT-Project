import React, { Component, useState } from "react";
import CarouselImage from "../components/carousel_image.component";
import { Carousel } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "./font.css"
import "bulma/css/bulma.min.css";
import Fade from 'react-reveal/Fade';
import { useEffect } from "react";
import { Button } from 'antd';
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

function AboutMe(params) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [carouselImages, setCarouselImages] = useState([]);
	const [carousel, setCarousel] = useState(React.createRef());

	useEffect(() => {
		axios
			.get("https://pucket.herokuapp.com/api/about-me")
			.then((response) => {
				if (response.data.length > 0) {
					setTitle(response.data[0].title);
					setDescription(response.data[0].description);
					setCarouselImages(response.data[0].carouselImages);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const NextArrow = props => {
		const { className, style, onClick } = props
		return (
		<div
			className={className}
			style={{ ...style, padding: "0 5.5%"}}
			onClick={onClick}
		>
			<Button icon={<RightOutlined/>} size="large" style={zIndex}/>
		</div>
		)
	}
	
	const PrevArrow = props => {
		const { className, style, onClick } = props
		return (
		<div
			className={className}
			style={{ ...style, padding: "0 3%"}}
			onClick={onClick}
		>
			<Button icon={<LeftOutlined/>} size="large" style={zIndex}/>
		</div>
		)
	}
	
	const settings = {
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />
	}

	const zIndex = {zIndex: "1"};
	
	return (
		<React.Fragment>
			<section className="section mb-2">
				<Carousel autoplay arrows={true} {...settings} >
					{carouselImages.map((image, index) => {
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
									<h1 className="title font">{title}</h1>
									<p className="font">{description}</p>
								</div>
							</div>
						</div>
					</Fade>
				</section>
			</React.Fragment>
		);
}

export default AboutMe;
