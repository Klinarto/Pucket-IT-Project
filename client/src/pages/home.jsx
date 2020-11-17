import React, { useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./home.css";
import "../utilities/helper.css";
import "./font.css";
import Fade from 'react-reveal/Fade';

function Home(params) {
	const [heroTitle, setHeroTitle] = useState("");
	const [heroDesc, setHeroDesc] = useState("");
	const [heroBG, setHeroBG] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		axios
			.get("https://pucket.herokuapp.com/api/")
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
					<Fade right>
							<div id="motto" className="container">
								<h1 className="title is-1 has-text-white has-text-right font">
									{heroTitle}
								</h1>
								<p className="subtitle has-text-white has-text-right font">
									{heroDesc}
								</p>
							</div>
          </Fade>
				</div>
			</section>
			<section className="section has-background-light">
				<div className="container">
					<Fade big duration={2000}>
							<div className="card">
								<div className="card-content">
									<h1 className="title font">{title}</h1>
									<p className="font">{description}</p>
								</div>
							</div>
						</Fade>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Home;
