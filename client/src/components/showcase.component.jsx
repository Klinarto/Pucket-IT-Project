import React, { useState, useContext } from "react";
import { Popover, Button, Space, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import user_context from "../context/user_context";
import EditModal from "./edit_modal_showcase.component";
import moment from "moment";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./showcase.css";

const { confirm } = Modal;

// A showcase is a component that "showcases" a user's specific desired content of a specific section

function Showcase(params) {
	const { userData } = useContext(user_context);

	// Used for the edit modal
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState([]);

	const title = params.showcase.title;
	const description = params.showcase.description;
	const imageURL = params.showcase.image;
	const placeholder = "../images/placeholder-image.jpg";

	let hasDate = false;
	let parsedStartDate = null;
	let parsedEndDate = null;

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
				<Button
					onClick={() => {
						showDeleteConfirm();
					}}
					danger
				>
					Delete
				</Button>
			</Space>
		</div>
	);

	// If the showcase data has dates, parse it
	if (params.showcase.hasOwnProperty("startDate")) {
		hasDate = true;
		params.showcase.dates = [
			moment(params.showcase.startDate),
			moment(params.showcase.endDate),
		];
		const startDate = new Date(params.showcase.startDate);
		const endDate = new Date(params.showcase.endDate);
		parsedStartDate = parseDate(startDate);
		parsedEndDate = parseDate(endDate);
	}

	// Parse from ISO Date format to dd-mm-yyyy
	function parseDate(date) {
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;

		let parsedDate = day + "-" + month + "-" + year;

		return parsedDate;
	}

	// Function that will be passed to the edit modal and return
	// the values from the edit modal form which will then be sent
	// to the server to update
	function onEdit(values) {
		// console.log("Received values of form: ", values);
		values._id = params.showcase._id;

		values.section = params.section;
		values.imageUrl = params.showcase.image;

		console.log("Values: ", values);

		if (values.hasOwnProperty("dates")) {
			// console.log("Values has dates");
			values.startDate = values.dates[0]._d.toISOString();
			values.endDate = values.dates[1]._d.toISOString();
			delete values.dates;
		}

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
				setFileList([]);
				message.success("Showcase edited successfully.", 2);
				console.log(res);
			})
			.catch((error) => {
				setLoading(false);
				setVisible(false);
				message.error("Failed to send");
				console.error(error);
			});
	}

	// Function to show the delete confirmation modal
	function showDeleteConfirm() {
		confirm({
			title: "Are you sure you want to delete this showcase?",
			icon: <ExclamationCircleOutlined />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				deleteShowcase();
			},
			onCancel() {
				console.log("<(_ _*)> You have my gratitude.");
			},
		});
	}

	// Send a post request to the server to delete the current showcase
	function deleteShowcase() {
		let data = new FormData();

		data.append("section", params.section);
		data.append("_id", params.showcase._id);

		axios
			.post("/admin/delete", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					"x-auth-token": userData.token,
				},
			})
			.then((res) => {
				message.success("Showcase deleted successfully.", 2);
				console.log(res);
			})
			.catch((error) => {
				message.error("Failed to delete");
				console.error(error);
			});
	}

	// Render the showcase to be either left or right aligned based on the
	// alignment of the showcase from the database
	if (params.showcase.alignment.toLowerCase() === "left") {
		return (
			<React.Fragment>
				<section className="section">
					<div className="container">
						<div className="columns is-vcentered">
							<div className="column">
								{/* Render the popover when the user is logged in */}
								{userData.token ? (
									<Popover
										placement="right"
										content={popoverContent}
										title="Edit"
									>
										<div className="content">
											<h1 className="title has-text-left">
												{title}
											</h1>
											{/* If the showcase has date data, render the date, else don't render anything */}
											{hasDate ? (
												<React.Fragment>
													<h5 className="has-text-left">
														Start :{" "}
														{parsedStartDate}
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
									</Popover>
								) : (
									<div className="content">
										<h1 className="title has-text-left">
											{title}
										</h1>
										{/* If the showcase has date data, render the date, else don't render anything */}
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
								)}
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
				{/* Render the edit modal if the user is logged on and visible is true */}
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
						setFileList={(files) => setFileList(files)}
						fileList={fileList}
						showcase={params.showcase}
						section={params.section}
					/>
				) : null}
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
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
								{/* Render the popover when the user is logged in */}
								{userData.token ? (
									<Popover
										placement="left"
										content={popoverContent}
										title="Edit"
									>
										<div className="content">
											<h1 className="title has-text-right">
												{title}
											</h1>
											{/* If the showcase has date data, render the date, else don't render anything */}
											{hasDate ? (
												<React.Fragment>
													<h5 className="has-text-right">
														Start :{" "}
														{parsedStartDate}
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
									</Popover>
								) : (
									<div className="content">
										<h1 className="title has-text-right">
											{title}
										</h1>
										{/* If the showcase has date data, render the date, else don't render anything */}
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
								)}
							</div>
						</div>
					</div>
				</section>
				{/* Render the edit modal if the user is logged on and visible is true */}
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
						setFileList={(files) => setFileList(files)}
						fileList={fileList}
						showcase={params.showcase}
						section={params.section}
					/>
				) : null}
			</React.Fragment>
		);
	}
}

export default Showcase;
