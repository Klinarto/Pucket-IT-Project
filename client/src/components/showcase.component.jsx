import React from "react";
import "bulma/css/bulma.min.css";
import "./showcase.css";

function Showcase(params) {
	function parseDate(date) {
		if (date !== null) {
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();

			if (day < 10) day = "0" + day;
			if (month < 10) month = "0" + month;

			let parsedDate = day + "-" + month + "-" + year;

			return parsedDate;
		}
	}

	const title = params.title;
	const description = params.description;
	const imageURL = params.image;

	const hasDate = params.startDate !== null && params.endDate !== null;
	const startDate = params.startDate;
	const endDate = params.endDate;
	const parsedStartDate = parseDate(startDate);
	const parsedEndDate = parseDate(endDate);

	if (params.alignment.toLowerCase() === "left") {
		return (
			<section className="section">
				<div className="container">
					<div className="columns is-vcentered">
						<div className="column">
							<div className="content">
								<h1 className="title has-text-left">{title}</h1>
								{hasDate ? (
									<React.Fragment>
										<h5 className="has-text-left">
											Start : {parsedStartDate}
										</h5>
										<h5 className="has-text-left">
											End : {parsedEndDate}
										</h5>
										<p className="has-text-justified">
											{description}
										</p>
									</React.Fragment>
								) : (
									<p className="has-text-justified">
										{description}
									</p>
								)}
							</div>
						</div>
						<div className="column">
							<figure>
								<img
									className="image-showcase"
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
									className="image-showcase"
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
								{hasDate ? (
									<React.Fragment>
										<h5 className="has-text-right">
											Start : {parsedStartDate}
										</h5>
										<h5 className="has-text-right">
											End : {parsedEndDate}
										</h5>
										<p className="has-text-justified">
											{description}
										</p>
									</React.Fragment>
								) : (
									<p className="has-text-justified">
										{description}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Showcase;
