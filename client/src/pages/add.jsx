import React, { useState, useContext } from "react";
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Upload,
	message,
	Modal,
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import "bulma/css/bulma.min.css";
import axios from "axios";
import "antd/dist/antd.css";
import user_context from "../context/user_context";

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

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

// Replaced with add_modal and mainly used for debug

function Add() {
	const { userData, setUserData } = useContext(user_context);
	const [form] = Form.useForm();
	const [sections, setSections] = useState([
		"Academic Experience",
		"Hobbies",
	]);
	const [alignments, setAlignments] = useState(["Left", "Right"]);
	const [fileList, setFileList] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	function handleUpload({ fileList }) {
		// console.log("File", fileList);
		setFileList(fileList);
		// console.log("fileList", fileList);
	}

	const onFinish = (values) => {
		if (values.section === "Hobbies") {
			values.section = "hobbies";
		} else {
			values.section = "academicExperience";
		}
		// console.log(values);
		// values.dateStart = values.dates[0]._d.toISOString();
		// values.dateEnd = values.dates[1]._d.toISOString();
		// delete values.dates;

		console.log(values);

		let data = new FormData();

		for (let key in values) {
			data.append(key, values[key]);
		}

		data.append("image", fileList[0].originFileObj);

		console.log(data);

		axios
			.post("/admin/upload", data, {
				headers: {
					"Content-Type": "multipart/form-data",
					"x-auth-token": userData.token,
				},
			})
			.then((res) => {
				console.log(res);
				message.success("Showcase added successfully.", 2);
			})
			.catch((error) => {
				console.log(error);
				message.error("Showcase failed to added.", 2);
			});
	};

	function handleCancel() {
		setPreviewVisible(false);
	}

	async function handlePreview(file) {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	}

	const onReset = () => {
		form.resetFields();
	};

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<React.Fragment>
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
						{/* <Form.Item
							name="dates"
							label="Dates"
							rules={[
								{
									required: true,
								},
							]}
						>
							<RangePicker />
						</Form.Item> */}

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
							name="image"
							label="Image"
							valuePropName="file"
						>
							<Upload
								listType="picture-card"
								fileList={fileList}
								onPreview={handlePreview}
								onChange={handleUpload}
								beforeUpload={() => false}
							>
								{fileList.length >= 1 ? null : uploadButton}
							</Upload>
							<Modal
								visible={previewVisible}
								title={previewTitle}
								footer={null}
								onCancel={handleCancel}
							>
								<img
									alt="example"
									style={{ width: "100%" }}
									src={previewImage}
								/>
							</Modal>
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
					{/* <div className="container">
						
						<Dragger {...props} 
						fileList={fileList} 
						onChange={handleUpload} 
						beforeUpload={() => false}>
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
					</div> */}
				</div>
			</section>
		</React.Fragment>
	);
}

export default Add;
