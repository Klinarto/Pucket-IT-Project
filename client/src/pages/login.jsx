import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import "antd/dist/antd.css";
import "bulma/css/bulma.min.css";
import axios from "axios";
import user_context from "../context/user_context";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 12,
	},
};

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not valid email!",
	},
};


function Login(params) {
	const [form] = Form.useForm();
	const {userData, setUserData} = useContext(user_context);
	const onFinish = (values) => {
		axios.post("http://localhost:5000/user/login", values)
		.then((res) => {
			setUserData({token: res.data.token});
			localStorage.setItem("auth-token", res.data.token);
			window.location = "/";
			message.success("Login succesful");
		})
		.catch((error) => {
			console.log(error)
			message.error("Login failed");
		});
	};

	return (
		<React.Fragment>
			<section className="section">
				<div className="container">
					{" "}
					<Form onFinish={onFinish}
						{...layout}
						form={form}
						name="Login Message"
						validateMessages={validateMessages}
					>
						<Form.Item
							name="username"
							label="Username"
							rules={[
								{
                                    required: true,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
						>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Login;