import { Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";

// Not in use
const { Column } = Table;
function Dashboard(props) {
	const [showcases, setShowcase] = useState([]);
	const [selectedShowcase, setSelectedShowcase] = useState();
	const [visible, setVisible] = useState(false);
	const baseURL = "http://pucket.herokuapp.com";

	function addToShowcases(data, section) {
		data.forEach((showcase) => {
			showcase.section = section;
			setShowcase((showcases) => [...showcases, showcase]);
		});
	}

	function onCreate(values) {
		console.log("Received values of form: ", values);
		setVisible(false);
	}

	useEffect(() => {
		axios
			.get(baseURL + "/api/academic-experiences")
			.then((response) => {
				console.log(response.data);
				addToShowcases(response.data, "Academic");
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get(baseURL + "/api/hobbies")
			.then((response) => {
				console.log(response.data);
				addToShowcases(response.data, "Hobbies");
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<React.Fragment>
			<section className="section">
				<div className="container">
					<Table dataSource={showcases}>
						<Column title="Title" dataIndex="title" key="title" />
						<Column
							title="Description"
							dataIndex="description"
							key="description"
						/>
						<Column
							title="Section"
							dataIndex="section"
							key="section"
						/>
						<Column
							title="Actions"
							key="action"
							render={(text, record) => (
								<Space size="middle">
									<div>
										<a
											onClick={() => {
												setSelectedShowcase(record);
												setVisible(true);
											}}
										>
											Edit
										</a>
									</div>
									<a>Delete</a>
								</Space>
							)}
						/>
					</Table>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Dashboard;
