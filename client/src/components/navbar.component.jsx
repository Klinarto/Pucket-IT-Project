import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Affix } from "antd";
import "antd/dist/antd.css";

function Navbar(props) {
	const [current, setCurrent] = useState("home");

	function handleClick(e) {
		// console.log("click ", e);
		setCurrent(e.key);
	}
	return (
		<Affix>
			<Menu
				onClick={handleClick}
				selectedKeys={[current]}
				mode="horizontal"
			>
				<Menu.Item key="home">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="about-me">
					<Link to="about-me">About Me</Link>
				</Menu.Item>
				<Menu.Item key="academic-experiences">
					<Link
						to={{
							pathname: "academic-experiences",
							state: {
								section: "academicExperience",
							},
						}}
					>
						Academic Experience
					</Link>
				</Menu.Item>
				<Menu.Item key="hobbies">
					<Link
						to={{
							pathname: "hobbies",
							state: {
								section: "hobbies",
							},
						}}
					>
						Hobbies
					</Link>
				</Menu.Item>
				<Menu.Item key="contact">
					<Link to="contact">Contact</Link>
				</Menu.Item>
				{/* <Menu.Item key="add">
					<Link to="add">Add</Link>
				</Menu.Item>
				<Menu.Item key="dashboard">
					<Link to="dashboard">Dashboard</Link>
				</Menu.Item> */}
				<Menu.Item style={{ float: "right", marginRight: "1.5em" }}>
					Login
				</Menu.Item>
			</Menu>
		</Affix>
	);
}

export default Navbar;
