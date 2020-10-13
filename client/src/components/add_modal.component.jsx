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

function AddModal(params) {
	const [form] = Form.useForm();
	const alignments = ["Left", "Right"];
	const section = params.section;
	const [loading, setLoading] = useState(false);

	// console.log(props);

	function onOk() {
		form.validateFields()
			.then((values) => {
				setLoading(true);
				params.onCreate(values);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}

	return (
		<Modal
			visible={params.visible}
			title="Add Showcase"
			okText="Add"
			cancelText="Cancel"
			onCancel={params.onCancel}
			destroyOnClose={true}
			centered
			onOk={onOk}
			confirmLoading={loading}
		>
			<Form
				form={form}
				preserve={false}
				layout="vertical"
				name="edit"
				initialValues={params.showcase}
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
			</Form>
		</Modal>
	);
}

export default AddModal;
