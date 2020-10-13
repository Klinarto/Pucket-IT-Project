import React from "react";
import Home from "./pages/home";
import AboutMe from "./pages/about-me";
// import Academic from "./pages/academic";
// import Hobbies from "./pages/hobbies";
import Contact from "./pages/contact";
import Add from "./pages/add";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar.component";
import Header from "./components/header.component";
import Section from "./components/section.component";
import { BackTop } from "antd";
import { Route } from "react-router-dom";
import "antd/dist/antd.css";

const style = {
	height: 40,
	width: 40,
	lineHeight: "40px",
	borderRadius: 4,
	backgroundColor: "#1088e9",
	color: "#fff",
	textAlign: "center",
	fontSize: 14,
};

function App() {
	return (
		<main>
			<Header />
			<Navbar />
			<Route path="/" component={Home} exact />
			<Route path="/about-me" component={AboutMe} />
			<Route path="/academic-experiences" component={Section} />
			<Route path="/hobbies" component={Section} />
			<Route path="/contact" component={Contact} />
			<Route path="/add" component={Add} />
			<Route path="/dashboard" component={Dashboard} />
			<BackTop>
				<div style={style}>UP</div>
				{/* <div style={style}>( ͡° ͜ʖ ͡°)</div> */}
			</BackTop>
		</main>
	);
}

export default App;
