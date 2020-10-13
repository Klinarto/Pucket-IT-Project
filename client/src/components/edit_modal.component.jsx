import React, { useState } from "react";
import {
	Button,
	Modal,
	Form,
	Select,
	Input,
	DatePicker,
	Upload,
	message,
} from "antd";
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

function EditModal(props) {
	const [form] = Form.useForm();
	const [sections] = useState(["Academic Experience", "Hobbies"]);
	const [alignments] = useState(["Left", "Right"]);
	const showcase = props.showcase;

	console.log(props);

	return (
		<Modal
			visible={props.visible}
			title="Edit Showcase"
			okText="Edit"
			cancelText="Cancel"
			onCancel={props.onCancel}
			destroyOnClose={true}
			onOk={() => {
				form.validateFields()
					.then((values) => {
						form.resetFields();
						props.onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				preserve={false}
				layout="vertical"
				name="edit"
				initialValues={props.showcase}
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
			</Form>
		</Modal>
	);
}

export default EditModal;
