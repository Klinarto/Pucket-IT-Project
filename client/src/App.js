import React from "react";
import Home from "./pages/home";
import AboutMe from "./pages/about-me";
import Academic from "./pages/academic";
import Hobbies from "./pages/hobbies";
import Contact from "./pages/contact";
import Add from "./pages/add";
import Dashboard from "./pages/dashboard";
import { Switch, Route } from "react-router-dom";

function App() {
	return (
		<main>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/about-me" component={AboutMe} />
				<Route path="/academic" component={Academic} />
				<Route path="/hobbies" component={Hobbies} />
				<Route path="/contact" component={Contact} />
				<Route path="/add" component={Add} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		</main>
	);
}

export default App;
