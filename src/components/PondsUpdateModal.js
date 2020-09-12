import React from 'react';
import { Modal, Form, Input } from 'antd';

export const PondsUpdateModal = ({ visible, onUpdate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Update Pond"
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onUpdate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="pondName"
                    label="Pond Name"
                    rules={[
                        {
                            required: true,
                            max: 50,
                            message: 'Please input the pond name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="pondSize"
                    label="Pond Size"
                    rules={[
                        {
                            required: true,
                            pattern: /^\d{1,5}(\.\d{1,2})?$/,
                            message: 'Please input the pond size in valid format!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

