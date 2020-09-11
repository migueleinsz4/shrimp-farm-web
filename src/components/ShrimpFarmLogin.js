import React from "react";
import {observer} from "mobx-react";
import {useStore} from "./ShrimpFarmApp";
import {Alert, Button, Form, Input, Row, Checkbox} from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';

export const ShrimpFarmLogin = observer(() => {
    const store = useStore();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        store.login(values.username, values.password, "MAIN_VIEW");
    };

    let loginMessage = store.loginMessage;
    let loginMsgVisible = loginMessage === "Login ok" ? 'hidden' : 'visible';

    return (
        <div className="form-container">
            <div style={{width: "20%", paddingBottom: "16px"}}>

            </div>
            <div style={{
                width: "45%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none'
            }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1 style={{fontSize: "35px", color: "black", textAlign: 'center'}}>Cargill Shrimp Farm Web App</h1>
                </div>
                <div style={{fontSize: "10px", color: "black", textAlign: 'center', marginBottom: '24px'}}>
                    ({process.env.NODE_ENV})
                </div>
            </div>
            <Row>
                <Form id="loginForm"
                      className="login-form"
                      initialValues={{
                          remember: true,
                      }}
                      onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input
                            suffix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                            autoComplete="username"
                            autoCorrect="off"
                            spellCheck="false"
                            style={{height: '2.3em'}}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            suffix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="password"
                            autoComplete="current-password"
                            style={{height: '2.3em'}}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                    <Form.Item>
                        <Alert
                            message={loginMessage}
                            type="error"
                            showIcon
                            style={{visibility: `${loginMsgVisible}`}}
                        />
                    </Form.Item>
                </Form>
            </Row>
        </div>
    );
});