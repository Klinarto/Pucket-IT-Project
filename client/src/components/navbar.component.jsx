import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Affix } from "antd";
import "antd/dist/antd.css";

class Navbar extends Component {
	constructor(props) {
		super();
		this.state = { current: props.current };
	}

	render() {
		const { current } = this.state;
		return (
			<Affix>
				<Menu selectedKeys={[current]} mode="horizontal">
					<Menu.Item key="home">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="about-me">
						<Link to="about-me">About Me</Link>
					</Menu.Item>
					<Menu.Item key="academic-experience">
						<Link to="academic">Academic Experience</Link>
					</Menu.Item>
					<Menu.Item key="hobbies">
						<Link to="hobbies">Hobbies</Link>
					</Menu.Item>
					<Menu.Item key="contact">
						<Link to="contact">Contact</Link>
					</Menu.Item>
					<Menu.Item key="add">
						<Link to="add">Add</Link>
					</Menu.Item>
					<Menu.Item key="dashboard">
						<Link to="dashboard">Dashboard</Link>
					</Menu.Item>
					<Menu.Item
						key="login"
						style={{ float: "right", marginRight: "1.5em" }}
					>
						<Link to="login">Login</Link>
					</Menu.Item>
				</Menu>
			</Affix>
		);
	}
}

export default Navbar;
