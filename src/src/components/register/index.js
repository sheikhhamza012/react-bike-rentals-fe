import {Button, Form, Input, Spin} from 'antd';
import React from 'react';
import {LoadingOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {register} from '../../redux/user/action_creators'
import {Link} from "react-router-dom";

const Register = ({isLoading, register}) => {


    const onFinish = (values) => {
        const {username, email, password} = values
        register(username, email, password)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <h2  style={{textAlign:"center",color:"rgb(93, 71, 112)",}}>Sign Up</h2>
            <Form
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="username"

                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input style={{border:"solid rgb(93, 71, 112)", borderRadius:2, width:400}} placeholder={"username..."}/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input style={{border:"solid rgb(93, 71, 112)", borderRadius:2, width:400}} placeholder={"email..."}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password style={{border:"solid rgb(93, 71, 112)", borderRadius:2, width:400}} placeholder={"password..."}/>
                </Form.Item>

                <Form.Item>
                    {isLoading ? <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/> :
                        <Button style={{background:"rgb(93, 71, 112)", color:"#fff", border:"none", width:400}} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    }

                </Form.Item>
                <Link to={'/'}><p style={{color:"rgb(93, 71, 112)"}}>Already Have An Account?</p></Link>
            </Form>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, email, password) => dispatch(register({username, email, password}))
    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register)
