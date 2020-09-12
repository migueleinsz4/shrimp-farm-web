import React from "react";
import {observer} from "mobx-react";
import {useStore} from "./ShrimpFarmApp";
import { Layout, Menu, Breadcrumb } from 'antd';
import {FarmsManage} from "./FarmsManage";
import {FarmsSearch} from "./FarmsSearch";
import {PondsSearch} from "./PondsSearch";
import {PondsManage} from "./PondsManage";
import {About} from "./About";

const { Header, Content, Sider } = Layout;

export const ShrimpFarmLayout = observer(() => {
    const store = useStore();

    const menu = new Map();
    menu.set("FARMS_VIEW",
        {
            name: "Farms",
            defaultSelected: "FARMS_VIEW_SEARCH",
            items: [
                {id: "FARMS_VIEW_SEARCH", item: <Menu.Item key="FARMS_VIEW_SEARCH">Search</Menu.Item>, component: <FarmsSearch />},
                {id: "FARMS_VIEW_MANAGE", item: <Menu.Item key="FARMS_VIEW_MANAGE">Create</Menu.Item>, component: <FarmsManage />}
            ]
        }
    );
    menu.set("PONDS_VIEW",
        {
            name: "Ponds",
            defaultSelected: "PONDS_VIEW_SEARCH",
            items: [
                {id: "PONDS_VIEW_SEARCH", item: <Menu.Item key="PONDS_VIEW_SEARCH">Search</Menu.Item>, component: <PondsSearch />},
                {id: "PONDS_VIEW_MANAGE", item: <Menu.Item key="PONDS_VIEW_MANAGE">Create</Menu.Item>, component: <PondsManage />}
            ]
        }
    );
    menu.set("ABOUT_VIEW",
        {
            name: "About",
            defaultSelected: "ABOUT_VIEW_COPYRIGHT",
            items: [
                {id: "ABOUT_VIEW_COPYRIGHT", item: <Menu.Item key="ABOUT_VIEW_COPYRIGHT">About</Menu.Item>, component: <About />}
            ]
        }
    );

    const onClickMainMenu = (item) => {
        console.log(item.key);
        store.selectedMenu = item.key;
        store.selectedOption = menu.get(store.selectedMenu).defaultSelected;
    };

    const onClickSideMenu = (item) => {
        console.log(item.key);
        store.selectedOption = item.key;
    };

    return(
        <Layout>
            <Header className="header">
                <Menu theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['FARMS_VIEW']}
                      selectedKeys={[store.selectedMenu]}
                      onClick={onClickMainMenu}
                >
                    <Menu.Item key="FARMS_VIEW">Farms</Menu.Item>
                    <Menu.Item key="PONDS_VIEW">Ponds</Menu.Item>
                    <Menu.Item key="ABOUT_VIEW">About</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[menu.get(store.selectedMenu).defaultSelected]}
                        selectedKeys={[store.selectedOption]}
                        onClick={onClickSideMenu}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            menu.get(store.selectedMenu).items.map(i => i.item)
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Farmer: {store.farmerName}</Breadcrumb.Item>
                        <Breadcrumb.Item>{menu.get(store.selectedMenu).name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 512,
                        }}
                    >
                        {
                            menu.get(store.selectedMenu).items
                                .find(i => i.id === store.selectedOption)
                                .component
                        }
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

});