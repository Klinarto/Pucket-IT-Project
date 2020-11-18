import React, { useState, useEffect, useContext } from "react";
import { Popover, Button, Space, message } from "antd";
import user_context from "../context/user_context";
import axios from "axios";
import EditModal from "../components/edit_modal_home.component";
import "bulma/css/bulma.min.css";
import "./home.css";
import "../utilities/helper.css";
import "./font.css";
import Fade from "react-reveal/Fade";

function Home(params) {
	const { userData, setUserData } = useContext(user_context);

	// Used for the edit modals
	const [mottoVisible, setMottoVisible] = useState(false);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [heroTitle, setHeroTitle] = useState("");
	const [heroDesc, setHeroDesc] = useState("");
	const [heroBG, setHeroBG] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		axios
			.get("/api/")
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

	// Popover HTML body
	const popoverMotto = (
		<div>
			<Space direction="vertical">
				<Button
					onClick={() => {
						setMottoVisible(true);
					}}
				>
					Edit
				</Button>
			</Space>
		</div>
	);

	// Popover HTML body
	const popoverContent = (
		<div>
			<Space direction="vertical">
				<Button
					onClick={() => {
						setVisible(true);
					}}
				>
					Edit
				</Button>
			</Space>
		</div>
	);

	// Edit Motto
	function onEditMotto(values) {
		//
	}

	// Edit Description
	function onEdit(values) {
		//
	}

	return (
		<React.Fragment>
			<section className="hero is-fullheight">
				<div
					id="home-hero"
					className="hero-body"
					style={{ backgroundImage: `url(${heroBG})` }}
				>
					<Fade right>
						{userData.token ? (
							<Popover
								placement="right"
								content={popoverMotto}
								title="Edit"
							>
								<div id="motto" className="container">
									<h1 className="title is-1 has-text-white has-text-right font">
										{heroTitle}
									</h1>
									<p className="subtitle has-text-white has-text-right font">
										{heroDesc}
									</p>
								</div>
							</Popover>
						) : (
							<div id="motto" className="container">
								<h1 className="title is-1 has-text-white has-text-right font">
									{heroTitle}
								</h1>
								<p className="subtitle has-text-white has-text-right font">
									{heroDesc}
								</p>
							</div>
						)}
					</Fade>
					{userData.token ? (
						<EditModal
							visible={mottoVisible}
							loading={loading}
							onCreate={onEditMotto}
							changeLoading={(value) => {
								setLoading(value);
							}}
							onCancel={() => {
								setMottoVisible(false);
							}}
							content={{
								title: heroTitle,
								description: heroDesc,
							}}
						/>
					) : null}
				</div>
			</section>
			<section className="section has-background-light">
				<div className="container">
					<Fade big duration={2000}>
						{userData.token ? (
							<Popover
								placement="top"
								content={popoverContent}
								title="Edit"
							>
								<div className="card">
									<div className="card-content">
										<h1 className="title font">{title}</h1>
										<p className="font">{description}</p>
									</div>
								</div>
							</Popover>
						) : (
							<div className="card">
								<div className="card-content">
									<h1 className="title font">{title}</h1>
									<p className="font">{description}</p>
								</div>
							</div>
						)}
					</Fade>
					{userData.token ? (
						<EditModal
							visible={visible}
							loading={loading}
							onCreate={onEdit}
							changeLoading={(value) => {
								setLoading(value);
							}}
							onCancel={() => {
								setVisible(false);
							}}
							content={{ title: title, description: description }}
						/>
					) : null}
				</div>
			</section>
		</React.Fragment>
	);
}

export default Home;
