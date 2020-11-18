import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Affix, message } from "antd";
import "antd/dist/antd.css";
import user_context from "../context/user_context";
import "./header.css";

const buttonStyle = { padding: "0px 2em", fontSize: "1.2em" };

function Navbar(params) {
	const { userData, setUserData } = useContext(user_context);
	const [current, setCurrent] = useState(params.current);

	const logout = () => {
		setUserData({ token: undefined, user: undefined });
		localStorage.setItem("auth-token", "");
		message.success("Logout Successful");
	};

	// Set the current clicked tab in the navbar
	// to the current selected tab
	function handleClick(e) {
		setCurrent(e.key);
	}

	return (
		<Affix>
			<Menu
				style={{ display: "flex", justifyContent: "center" }}
				theme="dark"
				onClick={handleClick}
				selectedKeys={[current]}
				mode="horizontal"
			>
				<Menu.Item key="home">
					<Link to="/" style={buttonStyle} className="font">
						Home
					</Link>
				</Menu.Item>
				<Menu.Item key="about-me">
					<Link to="about-me" style={buttonStyle} className="font">
						About Me
					</Link>
				</Menu.Item>
				<Menu.Item key="academic-experiences">
					<Link
						style={buttonStyle}
						className="font"
						// Used for back end routing
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
						style={buttonStyle}
						className="font"
						// Used for back end routing
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
					<Link to="contact" style={buttonStyle} className="font">
						Contact
					</Link>
				</Menu.Item>
				{/* Render the logout button if the user is logged in */}
				{userData.token ? (
					<Menu.Item
						onClick={logout}
						key="logout"
						style={{ float: "right", marginRight: "1.5em" }}
					>
						<Link to="/" style={buttonStyle} className="font">
							Logout
						</Link>
					</Menu.Item>
				) : null}
				{/* <Menu.Item key="add">
					<Link to="add">Add</Link>
				</Menu.Item>
				<Menu.Item key="dashboard">
					<Link to="dashboard">Dashboard</Link>
				</Menu.Item> */}
			</Menu>
		</Affix>
	);
}

export default Navbar;
