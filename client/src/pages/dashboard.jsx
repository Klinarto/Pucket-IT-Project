import { Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import EditModal from "../components/edit_modal.component";
import axios from "axios";
import "antd/dist/antd.css";

const { Column } = Table;
function Dashboard(props) {
	const [showcases, setShowcase] = useState([]);
	const [selectedShowcase, setSelectedShowcase] = useState();
	const [visible, setVisible] = useState(false);

	function addToShowcases(data, section) {
		data.forEach((showcase) => {
			showcase.section = section;
			setShowcase((showcases) => [...showcases, showcase]);
		});
	}

	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setVisible(false);
	};

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/academic-experiences")
			.then((response) => {
				console.log(response.data);
				addToShowcases(response.data, "Academic");
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("http://localhost:5000/api/hobbies")
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
			<Header />
			<Navbar current="dashboard" />
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
					<EditModal
						visible={visible}
						onCreate={onCreate}
						onCancel={() => {
							setVisible(false);
						}}
						showcase={selectedShowcase}
					/>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Dashboard;
