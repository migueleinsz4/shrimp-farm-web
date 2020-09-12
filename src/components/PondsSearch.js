import React, {useState} from "react";
import { Input, Table, Space, Popconfirm, notification } from 'antd';
import {useStore} from "./ShrimpFarmApp";
import {PondsUpdateModal} from "./PondsUpdateModal";

export const PondsSearch = () => {
    const store = useStore();
    const [result, setResult] = useState([]);

    const [updateVisible, setUpdateVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const onUpdate = (values) => {
        console.log('Received values of form: ', values);
        store.updatePond({
            id: selectedId,
            name: values.pondName,
            size: values.pondSize
        }).then(response => {
            console.log("Update Ok");
            console.log(response.data);
            notification.success({
                message: 'System Information',
                description: `Pond saved`,
            });
            setUpdateVisible(false);
            search();
        }).catch(error => {
            console.log("Update Error");
            console.log(error);
            notification.error({
                message: 'System Information',
                description: `Pond not saved`,
            });
        });
    };

    const showUpdateModal = (id) => {
        setUpdateVisible(true);
        setSelectedId(id);
    };

    const confirmDelete = (id) => {
        console.log("Deleting pond...");
        console.log(id);
        store.deletePond(id)
            .then(response => {
                console.log("Delete Ok");
                console.log(response.data);
                notification.success({
                    message: 'System Information',
                    description: `Pond deleted`,
                });
                search();
            }).catch(error => {
            console.log("Delete Error");
            console.log(error);
            notification.error({
                message: 'System Information',
                description: `Pond not deleted`,
            });
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Farm Name',
            dataIndex: 'farmName',
            key: 'farmName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showUpdateModal(record.id)}>Edit</a>
                    <Popconfirm
                        title="Are you sure delete this pond?"
                        onConfirm={() => confirmDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const search = (value) => {
        console.log("Search Ponds");
        console.log(value);
        store.searchPonds(value)
            .then(response => {
                console.log("Search Ok");
                console.log(response.data);
                let content = [];
                if (response.data.code === "000") {
                    if (Array.isArray(response.data.content))
                        content.push(...response.data.content);
                    else
                        content.push(response.data.content);
                }
                setResult(
                    content.map(r => {
                        return {
                            key: r.id,
                            id: r.id,
                            name: r.name,
                            size: r.size,
                            farmName: r.farmName
                        }
                    })
                );
            })
            .catch(error => {
                console.log("Search Error");
                console.log(error);
                setResult([]);
            });
    };

    return(
        <div>
            <Input.Search placeholder="Pond ID or Name" onSearch={search} enterButton style={{marginBottom: '12px'}} />
            <Table columns={columns} dataSource={result} />
            <PondsUpdateModal
                visible={updateVisible}
                onUpdate={onUpdate}
                onCancel={() => {
                    setUpdateVisible(false);
                }}
            />
        </div>
    );
};