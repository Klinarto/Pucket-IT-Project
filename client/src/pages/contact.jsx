import React from "react";
import { Form, Input, Button } from "antd";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import "antd/dist/antd.css";
import "bulma/css/bulma.min.css";

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
	const [form] = Form.useForm();
	const onFinish = (values) => {
		// Fill in
	};

	return (
		<React.Fragment>
			<Header />
			<Navbar current="contact" />
			<section className="section">
				<div className="container">
					{" "}
					<Form
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
