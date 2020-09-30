import React, { useState } from "react";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import { Form, Input, Button, Select, DatePicker, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "bulma/css/bulma.min.css";
import axios from "axios";
import "antd/dist/antd.css";

const { Option } = Select;
const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 12,
	},
};

const props = {
	name: "file",
	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

function Add() {
	const [form] = Form.useForm();
	const [title, setTitle] = useState("");
	const [section, setSection] = useState("");
	const [sections, setSections] = useState([
		"Academic Experience",
		"Hobbies",
	]);
	const [alignment, setAlignment] = useState("");
	const [alignments, setAlignments] = useState(["Left", "Right"]);
	const [description, setDescription] = useState("");

	const onFinish = (values) => {
		if (values.section === "Hobbies") {
			values.section = "hobbies";
		} else {
			values.section = "academicExperience";
		}
		values.dateStart = values.dates[0]._d.toISOString();
		values.dateEnd = values.dates[1]._d.toISOString();
		delete values.dates;
		message.success("Showcase added successfully.", 2);
		console.log(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<React.Fragment>
			<Header />
			<Navbar current="add" />
			<section className="section">
				<div className="container">
					<Form
						{...layout}
						form={form}
						name="add"
						onFinish={onFinish}
					>
						<Form.Item
							name="title"
							label="Title"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="section"
							label="Section"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Select placeholder="Select a section" allowClear>
								{sections.map((section) => {
									return (
										<Option key={section} value={section}>
											{section}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							name="alignment"
							label="Alignment"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Select
								placeholder="Select an alignment"
								allowClear
							>
								{alignments.map((alignment) => {
									return (
										<Option
											key={alignment}
											value={alignment}
										>
											{alignment}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							name="dates"
							label="Dates"
							rules={[
								{
									required: true,
								},
							]}
						>
							<RangePicker />
						</Form.Item>

						<Form.Item
							name="description"
							label="Description"
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
								Submit
							</Button>
							<Button htmlType="button" onClick={onReset}>
								Reset
							</Button>
						</Form.Item>
					</Form>
					<div className="container">
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">
								Click or drag file to this area to upload
							</p>
							<p className="ant-upload-hint">
								Support for a single or bulk upload. Strictly
								prohibit from uploading company data or other
								band files
							</p>
						</Dragger>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Add;
