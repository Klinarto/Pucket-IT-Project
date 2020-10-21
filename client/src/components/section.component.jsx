import React, { useState, useEffect, useContext } from "react";
import user_context from "../context/user_context";
import Showcase from "../components/showcase.component";
import AddModal from "../components/add_modal.component";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "bulma/css/bulma.min.css";
import axios from "axios";

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
			.get(`http://localhost:5000/api${params.match.path}`)
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
			.post("http://localhost:5000/admin/upload", data, {
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
			<div>
				{/* Render all the showcases */}
				{showcases.map((showcase) => {
					return (
						<Showcase
							showcase={showcase}
							key={showcase._id}
							section={params.location.state.section}
						/>
					);
				})}
				{/* Render the add button if the user is logged in */}
				{userData.token ? (
					<div className="container">
						<Button
							type="dashed"
							size="large"
							onClick={() => {
								setVisible(true);
							}}
							block
						>
							<PlusOutlined /> Add Section
						</Button>
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
