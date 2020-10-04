import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Affix, message } from "antd";
import "antd/dist/antd.css";
import user_context from "../context/user_context";

function Navbar(props) {
	const {userData, setUserData} = useContext(user_context);
	const [current, setCurrent] = useState(props.current);
	const logout = () => {
        setUserData({token: undefined, user: undefined});
		localStorage.setItem("auth-token", "");
		message.success("Logout Successful");
	};
	
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
					{userData.token ? (
					<React.Fragment>
						<Menu.Item key="add">
							<Link to="add">Add</Link>
						</Menu.Item>
						<Menu.Item key="dashboard">
							<Link to="dashboard">Dashboard</Link>
						</Menu.Item>
					</React.Fragment>) : null}
					
					{userData.token ? (
					<Menu.Item onClick = {logout}
						key="logout"
						style={{ float: "right", marginRight: "1.5em" }}
					>
						<Link to="/">Logout</Link>
					</Menu.Item>
					) : (<Menu.Item
						key="login"
						style={{ float: "right", marginRight: "1.5em" }}
					>
						<Link to="login">Login</Link>
					</Menu.Item>)}
					
				</Menu>
			</Affix>
	)
}

export default Navbar;
