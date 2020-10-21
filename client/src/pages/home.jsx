import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./home.css";
import "../utilities/helper.css";

function Home(params) {
	const [heroTitle, setHeroTitle] = useState("");
	const [heroDesc, setHeroDesc] = useState("");
	const [heroBG, setHeroBG] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/")
			.then((response) => {
				if (response.data.length > 1) {
					setHeroTitle(response.data[0].title);
					setHeroDesc(response.data[0].description);
					setHeroBG(response.data[0].image);
					setTitle(response.data[1].title);
					setDescription(response.data[1].description);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<React.Fragment>
			<section className="hero is-fullheight">
				<div
					id="home-hero"
					className="hero-body"
					style={{ backgroundImage: `url(${heroBG})` }}
				>
					<div id="motto" className="container">
						<h1 className="title is-1 has-text-white has-text-right">
							{heroTitle}
						</h1>
						<p className="subtitle has-text-white has-text-right">
							{heroDesc}
						</p>
					</div>
				</div>
			</section>

			<section className="section has-background-light">
				<div className="container">
					<div className="card">
						<div className="card-content">
							<h1 className="title">{title}</h1>
							<p>{description}</p>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Home;
