import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import "antd/dist/antd.css";
import "bulma/css/bulma.min.css";
import axios from "axios";
import Recaptcha from "react-recaptcha";

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

function Contact(params) {
	const [isVerified, setIsVerified] = useState(false);
	const [form] = Form.useForm();

	function recaptchaLoaded(){
		console.log('captcha succesfully loaded');
	}

	const onFinish = (values) => {
		if(isVerified) {
			axios.post("http://localhost:5000/api/contact-me", values)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
			window.location = "/";
		} else {
			message.error('Please verify that you are a human!');
		}
	};

	function verifyCallback(res) {
		if (res){
			setIsVerified(true);
		}
	}

	return (
		<React.Fragment>
			<section className="section">
				<div className="container">
					{" "}
					<Form onFinish={onFinish}
						{...layout}
						form={form}
						name="Contact Message"
						validateMessages={validateMessages}
					>
						<Form.Item
							name="name"
							label="Name"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{
									required: true,
									type: "email",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="message"
							label="Message"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input.TextArea />
						</Form.Item>

						<Form.Item 
							wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
							
							<Recaptcha
								render={"explicit"}
								sitekey="6LevhNkZAAAAABvtk2j7bEhd-tJrxpPWH_rphULH"
								onloadCallback={recaptchaLoaded}
								verifyCallback={verifyCallback}
							/>
						</Form.Item>
						
						<Form.Item
							wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
						>
							<Button type="primary" htmlType="submit">
								Send
							</Button>
						</Form.Item>

						

					</Form>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Contact;
