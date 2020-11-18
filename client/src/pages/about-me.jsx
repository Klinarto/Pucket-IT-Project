import React, { useState, useEffect, useContext } from "react";
import CarouselImage from "../components/carousel_image.component";
import EditModal from "../components/edit_modal_home.component";
import { Carousel, Button, Popover, Space, message } from "antd";
import user_context from "../context/user_context";
import axios from "axios";
import "antd/dist/antd.css";
import "./font.css";
import "bulma/css/bulma.min.css";
import Fade from "react-reveal/Fade";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

function AboutMe(params) {
	const { userData } = useContext(user_context);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [carouselImages, setCarouselImages] = useState([]);

	const section = "aboutMe";

	useEffect(() => {
		fetchData();
	}, [title, description]);

	// Fetch data from api
	function fetchData(params) {
		console.log("Fetching data");
		axios
			.get("/api/about-me")
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
	}

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

	const NextArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, padding: "0 5.5%" }}
				onClick={onClick}
			>
				<Button icon={<RightOutlined />} size="large" style={zIndex} />
			</div>
		);
	};

	const PrevArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, padding: "0 3%" }}
				onClick={onClick}
			>
				<Button icon={<LeftOutlined />} size="large" style={zIndex} />
			</div>
		);
	};

	// Edit
	function onEdit(values) {
		values.section = section;
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

	const settings = {
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	const zIndex = { zIndex: "1" };

	return (
		<React.Fragment>
			<section className="section mb-2">
				<Carousel autoplay arrows={true} {...settings}>
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
					{userData.token ? (
						<Popover
							placement="top"
							content={popoverContent}
							title="Edit"
						>
							<div className="container">
								<div className="card">
									<div className="card-content">
										<h1 className="title font">{title}</h1>
										<p className="font">{description}</p>
									</div>
								</div>
							</div>
						</Popover>
					) : (
						<div className="container">
							<div className="card">
								<div className="card-content">
									<h1 className="title font">{title}</h1>
									<p className="font">{description}</p>
								</div>
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
						content={{
							title: title,
							description: description,
						}}
					/>
				) : null}
			</section>
		</React.Fragment>
	);
}

export default AboutMe;
