import React, {Component, useEffect, useState} from 'react';
import Card from "antd/es/card/Card";
import {Spin, Tooltip} from "antd";
import Form from  './form'
import {
    DeleteFilled,
    EditFilled,
    CrownFilled,
    MailFilled,
    LoadingOutlined,
    DingtalkCircleFilled,
    AliwangwangFilled,
    PlusCircleFilled
} from "@ant-design/icons";
import moment from "moment";
import {delete_bike, get_bikes} from "../../redux/bikes/action_creators";
import {connect} from "react-redux";
import Modal from "antd/es/modal/Modal";
import {delete_user, get_users} from "../../redux/manage_users/action_creators";
class Bikes extends Component {
    state={
        showForm:false
    }
    componentDidMount() {
        this.props.get_users()
    }

    render() {
        return (
            <div>
                <h2>
                    List of Users and Managers
                    <PlusCircleFilled style={{fontSize: 22, margin:10, cursor:"pointer"}} onClick={()=> {
                        this.setState({showForm:true})
                    }}/>
                    {this.props.isLoading &&
                    <Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>}
                </h2>
                <div style={{overflow: "auto"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {this.props.users_list.map((x,i) =>
                            <UserCard key={i} deleteCB={this.props.delete_user} data={x}/>
                        )}
                    </div>
                </div>
                {this.state.showForm&&<Form cancelCB={()=> {
                    this.setState({showForm:false})
                }}/>}
            </div>
        );
    }
}
const UserCard = props=>{
    const x= props.data
    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    useEffect(()=>{
        setIsLoading(false)
    },[x])
    return(
        <div style={{margin: 10}}>
            {showForm&&<Form data={x} cancelCB={()=> {
                setShowForm(false)
            }}/>}
            <Card title={x.username}
                  bordered={false}
                  style={{minWidth: 300,minHeight:266}}

                  extra={
                      isLoading?
                        <Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
                      :
                          <div>
                              <EditFilled  style={{fontSize: 22, margin:10, cursor:"pointer"}} onClick={()=> {
                                    setShowForm(true)
                              }}/>
                              <DeleteFilled style={{fontSize: 22, margin:10, cursor:"pointer"}} onClick={()=> {
                                  setIsLoading(true)

                                  props.deleteCB(x._id)
                              }}/>
                          </div>
                  }>
                <p style={{fontWeight: "500"}}>User details</p>
                {x.is_manager&&
                <p>
                    <CrownFilled style={{marginRight: 10}}/><span style={{fontWeight: "500"}}> </span>Manager
                </p>}
                <p>
                    <AliwangwangFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Name </span>{x.username}
                </p>
                <p>
                    <MailFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Email </span>{x.email}
                </p>


            </Card>
    </div>)
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_users: () => dispatch(get_users()),
        delete_user: (id) => dispatch(delete_user(id)),
    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.manage_users.isLoading,
        users_list: state.manage_users.users_list || [],

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bikes)
