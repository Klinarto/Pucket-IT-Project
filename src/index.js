import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import Home from "./pages/home-bulma";
import AboutMe from "./pages/about-me";
import Academic from "./pages/academic";
import Hobbies from "./pages/hobbies";
import Contact from "./pages/contact";
import * as serviceWorker from "./serviceWorker";
// import "./debug.css";

ReactDOM.render(
	<React.StrictMode>
		<Home />
		<AboutMe />
		<Academic />
		<Hobbies />
		<Contact />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
