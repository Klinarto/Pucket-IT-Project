import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import AboutMe from "./pages/about-me";
import Contact from "./pages/contact";
import { CaretUpOutlined } from "@ant-design/icons";

// import Add from "./pages/add";
// import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ChangePassword from "./pages/change_password";
import UserContext from "./context/user_context";
import Axios from "axios";
import Navbar from "./components/navbar.component";
import Header from "./components/header.component";
import Section from "./components/section.component";
import { BackTop } from "antd";
import { Route, Switch, useLocation } from "react-router-dom";
import "antd/dist/antd.css";

const backToTop = {
	width: "35px",
  	height: "35px", 
	lineHeight: "30px",
	borderRadius: 4,
	backgroundColor: "#1088e9",
	color: "#fff",
	textAlign: "center",
	fontSize: "33px"
}

function App() {
	const [userData, setUserData] = useState({
		token: undefined,
	});

	// Get the current location's pathname, i.e. the current page
	let location = useLocation().pathname.substring(1);
	if (location === "") {
		location = "home";
	}
	// console.log("Path:", location);

	// When app starts
	useEffect(() => {
		const verifyLoggedIn = async () => {
			let token = localStorage.getItem("auth-token");

			// If token does not exist, create key auth-token of empty string
			if (token === null) {
				localStorage.setItem("auth-token", "");
				token = "";
			}

			const tokenRes = await Axios.post(
				"http://localhost:5000/user/tokenIsValid",
				null,
				{ headers: { "x-auth-token": token } }
			);

			if (tokenRes.data) {
				setUserData({
					token,
				});
			}
		};

		verifyLoggedIn();
	}, []);

	return (
		<main>
			<UserContext.Provider value={{ userData, setUserData }}>
				<Header />
				<Navbar current={location} />
				<Route path="/" component={Home} exact />
				<Route path="/about-me" component={AboutMe} />
				<Route path="/academic-experiences" component={Section} />
				<Route path="/hobbies" component={Section} />
				<Route path="/contact" component={Contact} />
				<Route path="/login" component={Login} />
				<Route path="/changePassword" component={ChangePassword} />
				{/* <Route path="/add" component={Add} />
        <Route path="/dashboard" component={Dashboard} /> */}
        <BackTop>
			<CaretUpOutlined style={backToTop}/>
          {/* <div style={style}>( ͡° ͜ʖ ͡°)</div> */}
        </BackTop>
      </UserContext.Provider>
		</main>
	);
}

export default App;
