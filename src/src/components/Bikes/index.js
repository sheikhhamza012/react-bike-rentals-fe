import React, {Component, useEffect, useState} from 'react';
import Card from "antd/es/card/Card";
import {Spin, Tooltip} from "antd";
import Form from  './form'
import {
    DeleteFilled,
    EditFilled,
    StarFilled,
    FormatPainterFilled,
    LoadingOutlined,
    DingtalkCircleFilled,
    EnvironmentFilled,
    PlusCircleFilled
} from "@ant-design/icons";
import moment from "moment";
import {delete_bike, get_bikes} from "../../redux/bikes/action_creators";
import {connect} from "react-redux";
import Modal from "antd/es/modal/Modal";

class Bikes extends Component {
    state={
        showForm:false
    }
    componentDidMount() {
        this.props.get_bikes()
    }

    render() {
        return (
            <div>
                <h2>
                    List of Bikes
                    <PlusCircleFilled style={{fontSize: 22, margin:10, cursor:"pointer"}} onClick={()=> {
                        this.setState({showForm:true})
                    }}/>
                    {this.props.isLoading &&
                    <Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>}
                </h2>
                <div style={{overflow: "auto"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {this.props.bikes.map((x,i) =>
                            <BikeCard key={i} deleteCB={this.props.delete_bike} data={x}/>
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
export const BikeCard = props=>{
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
            <Card title={x.model}
                  bordered={false}
                  style={{minWidth: 300}}
                  extra={
                      isLoading?
                        <Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
                      :
                          <div>
                              {!props.hideEdit&&<EditFilled style={{fontSize: 22, margin: 10, cursor: "pointer"}} onClick={() => {
                                  setShowForm(true)
                              }}/>}
                              {!props.hideDelete&&<DeleteFilled style={{fontSize: 22, margin:10, cursor:"pointer"}} onClick={()=> {
                                  setIsLoading(true)

                                  props.deleteCB(x._id)
                              }}/>
                              }
                              {props.extras}
                          </div>
                  }>
                <p style={{fontWeight: "500"}}>Bike details</p>
                <p>
                    <DingtalkCircleFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Model </span>{x.model}
                </p>
                <p>
                    <FormatPainterFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Color </span>{x.color}
                </p>
                <p>
                    <EnvironmentFilled style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Location </span>{x.location}
                </p>
                {props.reservationDetail&&<>
                    <p style={{fontWeight: "500"}}>Reservation details</p>
                    <p>
                        {props.reservationDetail}
                    </p>
                </>
                }
                {<div style={{display:"flex",justifyContent:"space-around"}}>
                    {new Array(x.rating&&x.no_of_ratings?Math.ceil(x.rating/x.no_of_ratings):0).fill(0).map((r,i)=>
                        <Tooltip title={i+1}>
                            <StarFilled style={{cursor:"pointer"}} onClick={()=>{
                                props.giveRate(props.data._id,i+1)
                            }}/>
                        </Tooltip>
                    )}
                    {new Array(x.rating&&x.no_of_ratings?5 - Math.ceil(x.rating/x.no_of_ratings):5).fill(0).map((r,i)=>
                        <Tooltip title={i+1+(x.rating&&x.no_of_ratings?Math.ceil(x.rating/x.no_of_ratings):0)}>
                            <StarFilled style={{color:"#eee" , cursor:"pointer"}} onClick={()=>{
                                props.giveRate(props.data._id,i+1+(x.rating&&x.no_of_ratings?Math.ceil(x.rating/x.no_of_ratings):0))
                            }}/>
                        </Tooltip>
                    )}
                </div>
                }
            </Card>
    </div>)
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_bikes: () => dispatch(get_bikes()),
        delete_bike: (id) => dispatch(delete_bike(id)),

    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.bikes.isLoading,
        bikes: state.bikes.bikes_list || [],

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bikes)
