import React, { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";

function Header(params) {
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");

	useEffect(() => {
		axios
			.get("/api/title")
			.then((response) => {
				if (response.data.length > 0) {
					setTitle(response.data[0].title);
					setCaption(response.data[0].caption);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="header background-header-color font">
			<div className="container center">
				<h2 className="title is-4 white-text">{title}</h2>
			</div>
			<div className="container center">
				<h2 className="subtitle white-text">{caption}</h2>
			</div>
		</div>
	);
}
export default Header;
