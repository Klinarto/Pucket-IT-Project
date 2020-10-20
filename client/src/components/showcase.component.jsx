import React, { useState, useContext } from "react";
import user_context from "../context/user_context";
import { Popover, Button, Space, message } from "antd";
import EditModal from "./edit_modal.component";
import moment from "moment";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./showcase.css";

// A show case is a section that "showcases" the user's desired stuff
// like an academic experience or hobby

function Showcase(params) {
	// console.log(params.showcase);
	const { userData , setUserData } = useContext(user_context);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = params.showcase.title;
	const description = params.showcase.description;
	const imageURL = params.showcase.image;

	let hasDate = false;
	let parsedStartDate = null;
	let parsedEndDate = null;

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
				<p>Placeholder Text</p>
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
		values._id = params.showcase._id;
		console.log("Received values of form: ", values);

		values.section = params.section;
		values.imageUrl = params.showcase.image;

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

		// console.log(data);

		axios
			.post("http://localhost:5000/admin/edit", data, {
				headers: { "Content-Type": "multipart/form-data", "x-auth-token": userData.token },
			})
			.then((res) => {
				setLoading(false);
				setVisible(false);
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

	// console.log(params.showcase);

	if (params.showcase.alignment.toLowerCase() === "left") {
		// showcase.alignment = "Left";
		return (
			<React.Fragment>
				<section className="section">
					<div className="container">
						<div className="columns is-vcentered">
							<div className="column">
								{userData.token ? <Popover
									placement="right"
									content={popoverContent}
									title="Edit"
								>
									<div className="content">
										<h1 className="title has-text-left">
											{title}
										</h1>
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
								</Popover> : <div className="content">
										<h1 className="title has-text-left">
											{title}
										</h1>
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
									</div>}
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
				{userData.token ? <EditModal
					visible={visible}
					loading={loading}
					onCreate={onEdit}
					changeLoading={(value) => {
						setLoading(value);
					}}
					onCancel={() => {
						setVisible(false);
					}}
					showcase={params.showcase}
					section={params.section}
				/> : null}
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
								{userData.token ? <Popover
									placement="left"
									content={popoverContent}
									title="Edit"
								>
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
								</Popover> : <div className="content">
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
									</div>}
							</div>
						</div>
					</div>
				</section>
				{userData.token ? <EditModal
					visible={visible}
					loading={loading}
					onCreate={onEdit}
					changeLoading={(value) => {
						setLoading(value);
					}}
					onCancel={() => {
						setVisible(false);
					}}
					showcase={params.showcase}
					section={params.section}
				/>: null}
			</React.Fragment>
		);
	}
}

export default Showcase;
