import {Button, Form, Input, Spin} from 'antd';
import React from 'react';
import {login} from "../../redux/user/action_creators";
import {connect} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const Login = ({isLoading, login}) => {
    const onFinish = (values) => {
        const {email, password} = values
        login(email, password)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        isLoading ? <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/> :

            <div>
                <h2 style={{textAlign:"center",color:"rgb(93, 71, 112)",}}>Login</h2>

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
                        name="email"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input style={{border:"solid rgb(93, 71, 112)", borderRadius:2, width:400}} placeholder={"email..."}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password  style={{border:"solid rgb(93, 71, 112)", borderRadius:2, width:400}} placeholder={"password..."}/>
                    </Form.Item>


                    <Form.Item >
                        <Button style={{background:"rgb(93, 71, 112)", color:"#fff", border:"none", width:400}} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Link to={'/register'} ><p style={{color:"rgb(93, 71, 112)"}}>Dont Have An Account? register.</p></Link>
                </Form>
            </div>

    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login({email, password}))
    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)
