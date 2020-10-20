import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import Showcase from "../components/showcase.component";
import AddModal from "../components/add_modal.component";
import { Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "bulma/css/bulma.min.css";
import axios from "axios";

// Replaced with showcase

class Academic extends Component {
	constructor(props) {
		super();

		this.state = { experiences: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/api/academic-experiences")
			.then((response) => {
				console.log(response.data);
				this.setState({ experiences: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<div>
					{this.state.experiences.map((experience) => {
						return (
							<Showcase
								id={experience._id}
								title={experience.title}
								description={experience.description}
								image={experience.image}
								alignment={experience.alignment}
								startDate={new Date(experience.dateStart)}
								endDate={new Date(experience.dateEnd)}
								key={experience._id}
							/>
						);
					})}
					<div className="container">
						<Button
							type="dashed"
							size="large"
							onClick={() => {}}
							block
						>
							<PlusOutlined /> Add field
						</Button>
						{/* <AddModal
							visible={visible}
							onCreate={onCreate}
							onCancel={() => {
								setVisible(false);
							}}
							showcase={showcase}
						/> */}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Academic;
