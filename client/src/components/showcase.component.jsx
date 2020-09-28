import React from "react";
import "bulma/css/bulma.min.css";

function Showcase(params) {
	const title = params.title;
	const description = params.description;
	const imageURL = params.image;
	console.log(imageURL);
	if (params.alignment === "left") {
		return (
			<section className="section">
				<div className="container">
					<div className="columns is-vcentered">
						<div className="column">
							<div className="content">
								<h1 className="title has-text-left">{title}</h1>
								<p className="has-text-justified">
									{description}
								</p>
							</div>
						</div>
						<div className="column">
							<figure>
								<img
									className="image-academic"
									src={imageURL}
									alt={title + " Image"}
								/>
							</figure>
						</div>
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<section className="section">
				<div className="container">
					<div className="columns is-vcentered">
						<div className="column">
							<figure>
								<img
									className="image-academic"
									src={imageURL}
									alt={title + " Image"}
								/>
							</figure>
						</div>
						<div className="column">
							<div className="content">
								<h1 className="title has-text-right">
									{title}
								</h1>
								<p className="has-text-justified">
									{description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Showcase;
