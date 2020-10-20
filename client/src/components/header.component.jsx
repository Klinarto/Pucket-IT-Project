import React, { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";

function Header(params) {
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/title")
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
		<div className="header">
			<div className="container center">
				<h2 className="subtitle is-0">{title}</h2>
			</div>
			<div className="container center">
				<h2 className="subtitle">{caption}</h2>
			</div>
		</div>
	);
}
export default Header;
