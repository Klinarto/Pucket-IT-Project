import React, { useState } from "react";
import { Modal, Form, Select, Input, DatePicker, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { Option } = Select;
const { RangePicker } = DatePicker;

// Convert image to Base64. Used for the image preview
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

function EditModal(params) {
	const [form] = Form.useForm();

	// Used for preview images
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const alignments = ["Left", "Right"];
	const section = params.section;

	// Used for the validation messages of the form
	const validateMessages = {
		required: "${label} is required",
	};

	// Upload button HTML body
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>
				Click or Drag <br /> to upload
			</div>
		</div>
	);

	// Handle upload of image file
	function handleUpload({ fileList }) {
		// console.log("File", fileList);
		params.setFileList(fileList);
		// console.log("fileList", fileList);
	}

	// Handle edit modal's cancel
	function handleCancel() {
		setPreviewVisible(false);
	}

	// Handle the image preview
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

	// On ok, send values which contains the values of the currently edited showcase,and either the current image or the new image to the current showcase component which would handle the request to the server
	function onOk() {
		form.validateFields()
			.then((values) => {
				if (params.fileList.length > 0) {
					values.image = params.fileList[0].originFileObj;
				}
				params.changeLoading(true);
				params.onCreate(values);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	}

	return (
		<Modal
			visible={params.visible}
			title="Edit Showcase"
			okText="Edit"
			cancelText="Cancel"
			onCancel={params.onCancel}
			destroyOnClose={true}
			centered
			onOk={onOk}
			confirmLoading={params.loading}
		>
			<Form
				form={form}
				layout="vertical"
				name="edit"
				initialValues={params.showcase}
				validateMessages={validateMessages}
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
					name="alignment"
					label="Alignment"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select placeholder="Select an alignment" allowClear>
						{alignments.map((alignment) => {
							return (
								<Option key={alignment} value={alignment}>
									{alignment}
								</Option>
							);
						})}
					</Select>
				</Form.Item>

				{section === "academicExperience" ? (
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
				) : null}

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
				<Form.Item label="Image">
					<Form.Item name="image" valuePropName="file">
						<Upload
							listType="picture-card"
							fileList={params.fileList}
							onPreview={handlePreview}
							onChange={handleUpload}
							beforeUpload={() => false}
						>
							{params.fileList.length >= 1 ? null : uploadButton}
						</Upload>
					</Form.Item>
					{/* Modal to preview the image */}
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
			</Form>
		</Modal>
	);
}

export default EditModal;
