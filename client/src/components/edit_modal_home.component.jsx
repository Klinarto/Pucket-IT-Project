import React, { useState } from "react";
import { Modal, Form, Select, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { Option } = Select;

function EditModal(params) {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState([]);

	// Used for the validation messages of the form
	const validateMessages = {
		required: "${label} is required",
	};

	// On ok, send values which contains the values of the currently edited showcase,and either the current image or the new image to the current showcase component which would handle the request to the server
	function onOk() {
		form.validateFields()
			.then((values) => {
				if (fileList.length > 0) {
					values.image = fileList[0].originFileObj;
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
			title="Edit"
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
				initialValues={params.content}
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
					name="description"
					label="Description"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default EditModal;
