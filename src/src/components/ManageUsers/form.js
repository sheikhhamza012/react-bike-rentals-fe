import React, {Component,useState} from 'react';
import Modal from "antd/es/modal/Modal";
import {Button, Form, Input, Spin} from "antd";
import {Link} from "react-router-dom";
import {create_bike, update_bike} from "../../redux/bikes/action_creators";
import {connect} from "react-redux";
import Card from "antd/es/card/Card";
import {
    CrownFilled,
    DeleteFilled,
    DingtalkCircleFilled,
    EditFilled,
    EnvironmentFilled,
    FormatPainterFilled,
    LoadingOutlined, StarFilled, AliwangwangFilled,MailFilled, AlertFilled
} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {create_user, update_user} from "../../redux/manage_users/action_creators";

const UserForm =props=> {
    const [username,setUsername] = useState(props?.data?.username)
    const [form] = Form.useForm()
    return (
        <Modal
            title={props.data?"Update user":"Add new user"}
            visible={true}
            onOk={()=>{
                form.submit()
            }}
            onCancel={()=>{
                props.cancelCB({showForm:false})
            }}
        >
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={props.data??{}}
                form={form}
                onFinish={({username,email,password,is_manager})=>{
                    if(props.data){
                        props.update_user(props.data._id,username,email,is_manager)
                    }else{
                        props.create_user(username,email,password,is_manager)
                    }
                    props.cancelCB({showForm:false})
                }}
                autoComplete="off"
            >

                <Card title={username||"*username*"}
                      bordered={false}
                      style={{width: "100%", border:"1px solid #eee"}}
                >
                    <p style={{fontWeight: "500"}}>User details</p>
                    <p style={{display:"flex", alignItems:"baseline"}}>
                            <span style={{width: 100, display:"inline-block"}}>
                                <CrownFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Manager </span>
                            </span>
                        <Form.Item
                            style={{display:"inline-block"}}
                            name="is_manager"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>

                    </p>
                    <p style={{display:"flex", alignItems:"baseline"}}>
                            <span style={{width: 100, display:"inline-block"}}>
                                <AliwangwangFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Username </span>
                            </span>
                        <Form.Item
                            style={{display:"inline-block"}}
                            name="username"
                            rules={[{required: true, message:  '*required'}]}
                        >
                            <Input style={{width:200}} onChange={(v)=>setUsername(v.target.value)}/>
                        </Form.Item>
                    </p>
                    <p style={{display:"flex", alignItems:"baseline"}}>
                            <span style={{width: 100, display:"inline-block"}}>
                                 <MailFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Email </span>
                            </span>
                        <Form.Item
                            style={{display:"inline-block"}}
                            name="email"
                            rules={[{required: true, message: '*required'}]}
                        >
                            <Input style={{width:200}}/>
                        </Form.Item>
                    </p>
                    {!props.data&&
                    <p style={{display: "flex", alignItems: "baseline"}}>
                            <span style={{width: 100, display: "inline-block"}}>
                                 <AlertFilled style={{marginRight: 10}}/><span
                                style={{fontWeight: "500"}}>Password </span>
                            </span>
                        <Form.Item
                            style={{display: "inline-block"}}
                            name="password"
                            rules={[{required: true, message: '*required'}]}
                        >
                            <Input style={{width: 200}}/>
                        </Form.Item>
                    </p>}
                </Card>

            </Form>
        </Modal>
    );

}
const mapDispatchToProps = (dispatch) => {
    return {
        create_user: (username,email,password,is_manager) => dispatch(create_user({username,email,password,is_manager})),
        update_user: (id,username,email,is_manager) => dispatch(update_user({id:id,params: {username,email,is_manager}})),

    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.manage_users.isLoading,

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
