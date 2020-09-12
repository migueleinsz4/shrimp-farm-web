import React, {useState, useEffect} from "react";
import {useStore} from "./ShrimpFarmApp";
import { Form, Input, Button, notification, Select } from 'antd';

export const PondsManage = () => {
    const store = useStore();
    const [form] = Form.useForm();
    const [farms, setFarms] = useState([]);


    const onFinish = values => {
        console.log('Received values of form: ', values);
        store.createPond({
            name: values.pondName,
            size: values.pondSize,
            idFarm: values.farmId
        }).then(response => {
            console.log("Create Ok");
            console.log(response.data);
            form.resetFields();
            notification.success({
                message: 'System Information',
                description: `Pond saved`,
            });

        })
            .catch(error => {
                console.log("Create Error");
                console.log(error);
                notification.error({
                    message: 'System Information',
                    description: `Pond not saved`,
                });
            });

    };

    const getAllFarms = () => {
        store.searchFarms()
                .then(response => {
                    console.log("Get All Farms Ok");
                    console.log(response.data);
                    let content = [];
                    if (response.data.code === "000") {
                        if (Array.isArray(response.data.content))
                            content.push(...response.data.content);
                        else
                            content.push(response.data.content);
                    }

                    setFarms(
                        content.map(r => {
                            return {
                                key: r.id,
                                id: r.id,
                                name: r.name,
                                farmerName: r.farmerName
                            }
                        })
                    );

                })
                .catch(error => {
                    console.log("Get All Farms Error");
                    console.log(error);
                    setFarms([]);
                });
    };

    useEffect(getAllFarms, []);

    return(
        <Form
            id="pondsManageForm"
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Farm"
                name="farmId"
                rules={[
                    {
                        required: true,
                        message: 'Please select the farm!',
                    },
                ]}
            >
                <Select
                    placeholder="Select a farm"
                    allowClear
                >
                    {farms.map(farm => <Select.Option value={farm.id}>{farm.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                label="Pond Name"
                name="pondName"
                rules={[
                    {
                        required: true,
                        max: 50,
                        message: 'Please input the pond name!',
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                label="Pond Size"
                name="pondSize"
                rules={[
                    {
                        required: true,
                        pattern: /^\d{1,5}(\.\d{1,2})?$/,
                        message: 'Please input the pond size in valid format!',
                    },
                ]}
            >
                <Input placeholder="Size" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
        </Form>
    );
};
