import React from "react";
import {useStore} from "./ShrimpFarmApp";
import { Form, Input, Button, notification } from 'antd';

export const FarmsManage = () => {
    const store = useStore();
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        store.createFarm({
            name: values.farmName,
            idFarmer: store.farmerId
        }).then(response => {
            console.log("Create Ok");
            console.log(response.data);
            form.resetFields();
            notification.success({
                message: 'System Information',
                description: `Farm saved`,
            });

        })
        .catch(error => {
            console.log("Create Error");
            console.log(error);
            notification.error({
                message: 'System Information',
                description: `Farm not saved`,
            });
        });

    };

    return(
        <Form
            id="farmsManageForm"
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Farm Name"
                name="farmName"
                rules={[
                    {
                        required: true,
                        max: 50,
                        message: 'Please input the farm name!',
                    },
                ]}
            >
                <Input placeholder="name" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
        </Form>
    );
};
