import React, {useState} from "react";
import { Input, Table, Space, Popconfirm, Drawer, notification } from 'antd';
import {useStore} from "./ShrimpFarmApp";
import {FarmsUpdateModal} from "./FarmsUpdateModal";

export const FarmsSearch = () => {
    const store = useStore();
    const [result, setResult] = useState([]);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [totalSizeSelectedId, setTotalSizeSelectedId] = useState(0);
    const [farmSizeVisible, setFarmSizeVisible] = useState(false);

    const showFarmSize = (id) => {
        setFarmSizeVisible(true);
        setSelectedId(id);
        store.calculateFarmTotalSize(id)
            .then(response => {
                console.log("Total Size Ok");
                console.log(response.data);
                setTotalSizeSelectedId(response.data.content.totalSize);
            }).catch(error => {
                console.log("Total Size Error");
                console.log(error);
                setTotalSizeSelectedId("System Busy");
            });
    };

    const onCloseFarmSize = () => {
        setFarmSizeVisible(false);
    };

    const onUpdate = (values) => {
        console.log('Received values of form: ', values);
        store.updateFarm({
            id: selectedId,
            name: values.farmName
        }).then(response => {
            console.log("Update Ok");
            console.log(response.data);
            notification.success({
                message: 'System Information',
                description: `Farm saved`,
            });
            setUpdateVisible(false);
            search();
        }).catch(error => {
            console.log("Update Error");
            console.log(error);
            notification.error({
                message: 'System Information',
                description: `Farm not saved`,
            });
        });
    };

    const showUpdateModal = (id) => {
        setUpdateVisible(true);
        setSelectedId(id);
    };

    const confirmDelete = (id) => {
        console.log("Deleting farm...");
        console.log(id);
        store.deleteFarm(id)
            .then(response => {
                console.log("Delete Ok");
                console.log(response.data);
                notification.success({
                    message: 'System Information',
                    description: `Farm deleted`,
                });
                search();
            }).catch(error => {
                console.log("Delete Error");
                console.log(error);
                notification.error({
                    message: 'System Information',
                    description: `Farm not deleted`,
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
            title: 'Farmer Name',
            dataIndex: 'farmerName',
            key: 'farmerName',
        },
        {
            title: 'Total Size',
            key: 'totalSize',
            render: (text, record) => (
                <a onClick={() => showFarmSize(record.id)}>View</a>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showUpdateModal(record.id)}>Edit</a>
                    <Popconfirm
                        title="Are you sure delete this farm?"
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
        console.log("Search Farms");
        console.log(value);
        store.searchFarms(value)
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
                            farmerName: r.farmerName
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
            <Input.Search placeholder="Farm ID or Name" onSearch={search} enterButton style={{marginBottom: '12px'}} />
            <Table columns={columns} dataSource={result} />
            <FarmsUpdateModal
                visible={updateVisible}
                onUpdate={onUpdate}
                onCancel={() => {
                    setUpdateVisible(false);
                }}
            />
            <Drawer
                title="Total Size of Farm"
                placement="bottom"
                closable={true}
                onClose={onCloseFarmSize}
                visible={farmSizeVisible}
            >
                <p>{totalSizeSelectedId} HECTARES</p>
            </Drawer>
        </div>
    );
};
