import React, { useState, useEffect} from "react";
import Home from "./pages/home";
import AboutMe from "./pages/about-me";
import Academic from "./pages/academic";
import Hobbies from "./pages/hobbies";
import Contact from "./pages/contact";
import Add from "./pages/add";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { Switch, Route } from "react-router-dom";
import UserContext from "./context/user_context";
import Axios from 'axios';

function App() {
	const [userData, setUserData] = useState({
		token: undefined,
	});

	//when app starts
	useEffect(() => {
		const verifyLoggedIn = async () => {
			let token = localStorage.getItem("auth-token");

			//if token does not exist, create key auth-token of empty string
			if (token === null) {
				localStorage.setItem("auth-token", "");
				token = "";
			}

			const tokenRes = await Axios.post(
				"http://localhost:5000/user/tokenIsValid",
				null,
				{headers: {"x-auth-token": token}});

			if (tokenRes.data) {
				setUserData({
					token
				});
			};
		};

		verifyLoggedIn();
	}, []);

	return (
		<main>
			<UserContext.Provider value={{userData, setUserData}}>
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/about-me" component={AboutMe} />
					<Route path="/academic" component={Academic} />
					<Route path="/hobbies" component={Hobbies} />
					<Route path="/contact" component={Contact} />
					<Route path="/add" component={Add} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/login" component={Login} />
				</Switch>
			</UserContext.Provider>
		</main>
	);
}

export default App;
