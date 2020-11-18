import React, { useState, useEffect, useContext } from "react";
import user_context from "../context/user_context";
import Showcase from "../components/showcase.component";
import AddModal from "../components/add_modal_showcase.component";
import { Button, message, Affix } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "bulma/css/bulma.min.css";
import Fade from "react-reveal/Fade";
import "./section.css";
import axios from "axios";

const sectionButton = {
	borderColor: "#001529",
	backgroundColor: "rgba(238,238,238, 0.7)",
	boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.5)",
};

// A section is a component that "showcases" all the user's specific content of a specific category such as academic experiences or hobbies

function Section(params) {
	const { userData, setUserData } = useContext(user_context);
	const [showcases, setShowcases] = useState([]);
	const [fileList, setFileList] = useState([]);

	// Used for the add modal
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;

		axios
			.get(`/api${params.match.path}`)
			.then((res) => {
				if (mounted) {
					// console.log(res.data);
					setShowcases(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return function cleanup() {
			mounted = false;
		};
	}, [showcases, params]);

	// Function that will be passed to the add modal and return
	// the values from the add modal form which will then be sent
	// to the server to add to the database
	function onAdd(values) {
		console.log("Received values of form: ", values);

		values.section = params.location.state.section;

		// If the values received has dates, parse the date to ISO format
		if (values.hasOwnProperty("dates")) {
			// console.log("Values has dates");
			values.startDate = values.dates[0]._d.toISOString();
			values.endDate = values.dates[1]._d.toISOString();
			delete values.dates;
			// console.log("Updated values:", values);
		}

		// Convert the JSON data to Form Data
		let data = new FormData();
		for (let key in values) {
			data.append(key, values[key]);
		}

		axios
			.post("/admin/upload", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					"x-auth-token": userData.token,
				},
			})
			.then((res) => {
				setLoading(false);
				setVisible(false);
				setFileList([]);
				message.success("Showcase added successfully.", 2);
				console.log(res);
			})
			.catch((error) => {
				setLoading(false);
				setVisible(false);
				message.error("Failed to send");
				console.error(error);
			});
	}

	return (
		<React.Fragment>
			<div className="white">
				{/* Render all the showcases */}
				{showcases.map((showcase) => {
					return (
						<Fade key={showcase._id} bottom delay={500}>
							<Showcase
								showcase={showcase}
								key={showcase._id}
								section={params.location.state.section}
							/>
						</Fade>
					);
				})}

				{/* Render the add button if the user is logged in */}
				{userData.token ? (
					<div className="container" id="add-section-padding">
						<Affix offsetBottom={10}>
							<Button
								style={sectionButton}
								shape="round"
								size="large"
								onClick={() => {
									setVisible(true);
								}}
								block
							>
								<PlusOutlined /> Add Section
							</Button>
						</Affix>
						<AddModal
							visible={visible}
							loading={loading}
							changeLoading={(value) => {
								setLoading(value);
							}}
							setFileList={(files) => {
								setFileList(files);
							}}
							onCreate={onAdd}
							onCancel={() => {
								setVisible(false);
							}}
							section={params.location.state.section}
							fileList={fileList}
						/>
					</div>
				) : null}
			</div>
		</React.Fragment>
	);
}

export default Section;
