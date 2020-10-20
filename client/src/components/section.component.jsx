import React, { useState, useEffect, useContext } from "react";
import user_context from "../context/user_context";
import Showcase from "../components/showcase.component";
import AddModal from "../components/add_modal.component";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "bulma/css/bulma.min.css";
import axios from "axios";

function Section(params) {
	const { userData , setUserData } = useContext(user_context);
	const [showcases, setShowcases] = useState([]);
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const baseURL = "https://pucket.herokuapp.com";

	useEffect(() => {
		let mounted = true;

		axios
			.get(baseURL + `/api${params.match.path}`)
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

	function onAdd(values) {
		console.log("Received values of form: ", values);

		values.section = params.location.state.section;

		if (values.hasOwnProperty("dates")) {
			// console.log("Values has dates");
			values.startDate = values.dates[0]._d.toISOString();
			values.endDate = values.dates[1]._d.toISOString();
			delete values.dates;
			// console.log("Updated values:", values);
		}

		let data = new FormData();

		for (let key in values) {
			data.append(key, values[key]);
		}

		// console.log(data);

		axios
			.post(baseURL + "/admin/upload", data, {
				headers: { "Content-Type": "multipart/form-data", "x-auth-token": userData.token },
			})
			.then((res) => {
				setLoading(false);
				setVisible(false);
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
				{showcases.map((showcase) => {
					return (
						<Showcase
							showcase={showcase}
							key={showcase._id}
							section={params.location.state.section}
						/>
					);
				})}
				{userData.token ? <div className="container">
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
						onCreate={onAdd}
						onCancel={() => {
							setVisible(false);
						}}
						section={params.location.state.section}
					/>
				</div> : null}
			</div>
		</React.Fragment>
	);
}

export default Section;
