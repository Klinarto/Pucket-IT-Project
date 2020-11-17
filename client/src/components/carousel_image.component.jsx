import React from "react";
import "./carousel_image.css";

function CarouselImage(params) {
	return (
		<div className="carousel-image">
			<figure className="center-image">
				<img src={params.url} alt={params.title} />
			</figure>
			<h3>{params.title}</h3>
			<p>{params.caption}</p>
		</div>
	);
}

export default CarouselImage;
