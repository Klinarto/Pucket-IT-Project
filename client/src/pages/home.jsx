import React, { useState, useEffect, useContext } from "react";
import { Popover, Button, Space, message } from "antd";
import user_context from "../context/user_context";
import axios from "axios";
import EditModal from "../components/edit_modal_home.component";
import "bulma/css/bulma.min.css";
import "antd/dist/antd.css";
import "./home.css";
import "../utilities/helper.css";
import "./font.css";
import Fade from "react-reveal/Fade";

function Home(params) {
	const { userData } = useContext(user_context);

	// Used for the edit modals
	const [mottoVisible, setMottoVisible] = useState(false);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [heroTitle, setHeroTitle] = useState("");
	const [heroDesc, setHeroDesc] = useState("");
	const [heroBG, setHeroBG] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const section = "homepage";

	useEffect(() => {
		fetchData();
	}, [heroTitle, heroDesc, heroBG, title, description]);

	// Fetch data from api
	function fetchData(params) {
		console.log("Fetching data");
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
	}

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
		values.section = section;
		values._id = "1";
		values.image = heroBG;
		console.log(values);

		let data = new FormData();
		for (let key in values) {
			data.append(key, values[key]);
		}

		axios
			.post("/admin/edit", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					"x-auth-token": userData.token,
				},
			})
			.then((res) => {
				setLoading(false);
				setMottoVisible(false);
				message.success("Edit was successful.", 2);
				console.log(res);
			})
			.catch((error) => {
				setLoading(false);
				setMottoVisible(false);
				message.error("Failed to send");
				console.error(error);
			});

		fetchData();
	}

	// Edit Description
	function onEdit(values) {
		values.section = section;
		values._id = "2";
		console.log(values);

		let data = new FormData();
		for (let key in values) {
			data.append(key, values[key]);
		}

		axios
			.post("/admin/edit", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					"x-auth-token": userData.token,
				},
			})
			.then((res) => {
				setLoading(false);
				setVisible(false);
				message.success("Edit was successful.", 2);
				console.log(res);
			})
			.catch((error) => {
				setLoading(false);
				setVisible(false);
				message.error("Failed to send");
				console.error(error);
			});

		fetchData();
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
							<div id="motto" className="container">
								<Popover
									placement="right"
									content={popoverMotto}
									title="Edit"
								>
									<div>
										<h1 className="title is-1 has-text-white has-text-right font">
											{heroTitle}
										</h1>
										<p className="subtitle has-text-white has-text-right font">
											{heroDesc}
										</p>
									</div>
								</Popover>
							</div>
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
