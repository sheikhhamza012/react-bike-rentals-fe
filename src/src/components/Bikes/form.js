import React, {Component,useState} from 'react';
import Modal from "antd/es/modal/Modal";
import {Button, Form, Input, Spin} from "antd";
import {Link} from "react-router-dom";
import {create_bike, update_bike} from "../../redux/bikes/action_creators";
import {connect} from "react-redux";
import Card from "antd/es/card/Card";
import {
    DeleteFilled,
    DingtalkCircleFilled,
    EditFilled,
    EnvironmentFilled,
    FormatPainterFilled,
    LoadingOutlined, StarFilled
} from "@ant-design/icons";

const BikeForm =props=> {
    const [model,setModel] = useState(props?.data?.model)
    const [form] = Form.useForm()
        return (
            <Modal
                title={props.data?"Update bike":"Add new bike"}
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
                    onFinish={({model,color,location})=>{
                        if(props.data){
                            props.update_bike(props.data._id,model,color,location)
                        }else{
                            props.create_bike(model,color,location)
                        }
                        props.cancelCB({showForm:false})
                    }}
                    autoComplete="off"
                >

                    <Card title={model||"*model*"}
                          bordered={false}
                          style={{width: "100%", border:"1px solid #eee"}}
                    >
                        <p style={{fontWeight: "500"}}>Bike details</p>
                        <p style={{display:"flex", alignItems:"baseline"}}>
                            <span style={{width: 100, display:"inline-block"}}>
                                <DingtalkCircleFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Model </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}

                                name="model"
                                rules={[{required: true, message:  '*required'}]}
                            >
                                <Input onChange={e=>setModel(e.target.value)} style={{width:100}}/>
                            </Form.Item>

                        </p>
                        <p style={{display:"flex", alignItems:"baseline"}}>
                            <span style={{width: 100, display:"inline-block"}}>
                                <FormatPainterFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Color </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="color"
                                rules={[{required: true, message:  '*required'}]}
                            >
                                <Input style={{width:100}}/>
                            </Form.Item>
                        </p>
                        <p style={{display:"flex", alignItems:"baseline"}}>
                            <span style={{width: 100, display:"inline-block"}}>
                                 <EnvironmentFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Location </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="location"
                                rules={[{required: true, message: '*required'}]}
                            >
                                <Input style={{width:100}}/>
                            </Form.Item>
                        </p>
                    </Card>

                </Form>
            </Modal>
        );

}
const mapDispatchToProps = (dispatch) => {
    return {
        create_bike: (model,color,location) => dispatch(create_bike({model,color,location})),
        update_bike: (id,model,color,location) => dispatch(update_bike({id:id,params: {model, color, location}})),

    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.bikes.isLoading,

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BikeForm)
