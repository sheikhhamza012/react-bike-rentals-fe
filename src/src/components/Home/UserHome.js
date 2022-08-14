import React, {Component, createRef} from 'react';
import {connect} from "react-redux";
import Card from "antd/es/card/Card";
import {get_available_bikes, get_rentals, give_rate, reserve} from "../../redux/home/action_creators";
import {Button, Form, Input, Spin, Switch, Tooltip, DatePicker} from "antd";
import {
    AliwangwangFilled,
    DingdingOutlined,
    FilterFilled,
    LoadingOutlined,
    CalendarFilled,
    DingtalkCircleFilled,
    FormatPainterFilled,
    EnvironmentFilled,
    StarFilled
} from "@ant-design/icons";
import moment from "moment";
import {BikeCard} from '../Bikes'
import Modal from "antd/es/modal/Modal";
class Home extends Component {
    state={
        showFilterModal:false,
        showReserveModal:false,

    }
    componentDidMount() {
        this.props.get_available_bikes({})
    }
    filterForm = createRef()
    reserveForm = createRef()
    render() {
        return (
            <div>
                <h2>
                    Bikes available
                    <FilterFilled style={{fontSize: 22, margin:10, cursor:"pointer"}} onClick={()=> {
                        this.setState({showFilterModal:true})
                    }}/>
                    <Button onClick={()=>{
                        this.props.get_available_bikes({from:moment(),to:moment()})
                    }}>Clear Filters</Button>
                    {this.props.isLoading &&
                        <Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>}
                </h2>
                <div style={{overflow: "auto"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {
                            this.props.bikes.map((x,id)=><BikeCard
                                giveRate={(bike_id,s)=>{
                                    this.props.give_rate(bike_id,s)
                                }}
                                hideEdit={true} hideDelete={true} data={x} key={id} extras={<Button onClick={()=>{
                                this.setState({showReserveModal:x._id})
                            }}>Reserve</Button>}/>)
                        }
                    </div>
                </div>
                <Modal
                    title={"Reserve Bike"}
                    visible={this.state.showReserveModal!=false}
                    onOk={()=>{
                        this.reserveForm.current.submit()
                    }}
                    onCancel={()=>{
                        this.setState({showReserveModal:false})
                    }}

                >
                    <Form
                        name="control-ref"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        ref={this.reserveForm}
                        onFinish={({ date})=>{
                            const [from,to] = date??[undefined,undefined]
                            this.props.reserve(this.state.showReserveModal, from, to)
                            this.setState({showReserveModal:false})
                        }}
                        autoComplete="off"
                    >
                        <div style={{display:"flex",alignItems:"baseline"}}>
                            <span style={{width: 150, display:"inline-block"}}>
                                <CalendarFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Date Range </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="date"
                                rules={[{required: true, message: '*required'}]}

                            >
                                <DatePicker.RangePicker style={{width:350}}/>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
                <Modal
                    title={"Filter bikes"}
                    visible={this.state.showFilterModal}
                    onOk={()=>{
                        this.filterForm.current.submit()
                    }}
                    onCancel={()=>{
                        this.setState({showFilterModal:false})
                    }}

                >
                    <Form
                        name="control-ref"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        ref={this.filterForm}
                        onFinish={({model, color, location, rate, date})=>{
                            const [from,to] = date??[undefined,undefined]
                            this.props.get_available_bikes({model, color, location, rate, from, to})
                            this.setState({showFilterModal:false})

                        }}
                        autoComplete="off"
                    >
                        <div style={{display:"flex",alignItems:"baseline"}}>
                            <span style={{width: 150, display:"inline-block"}}>
                                <CalendarFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Date Range </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="date"
                            >
                                <DatePicker.RangePicker style={{width:350}}/>
                            </Form.Item>
                        </div>
                        <div style={{display:"flex",alignItems:"baseline"}}>
                            <span style={{width: 150, display:"inline-block"}}>
                                <DingtalkCircleFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Model </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="model"
                            >
                                <Input style={{width:350}}/>
                            </Form.Item>
                        </div>
                        <div style={{display:"flex",alignItems:"baseline"}}>
                            <span style={{width: 150, display:"inline-block"}}>
                                <FormatPainterFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Color </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="color"
                            >
                                <Input style={{width:350}}/>
                            </Form.Item>
                        </div>
                        <div style={{display:"flex",alignItems:"baseline"}}>
                            <span style={{width: 150, display:"inline-block"}}>
                                <EnvironmentFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Location </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="location"
                            >
                                <Input style={{width:350}}/>
                            </Form.Item>
                        </div>
                        <div style={{display:"flex",alignItems:"baseline"}}>
                            <span style={{width: 150, display:"inline-block"}}>
                                <StarFilled  style={{marginRight:10}}/><span style={{fontWeight: "500"}}>Rating </span>
                            </span>
                            <Form.Item
                                style={{display:"inline-block"}}
                                name="rate"
                            >
                                <Input type={"number"} max={5} min={1} style={{width:350}}/>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_available_bikes: (params) => dispatch(get_available_bikes(params)),
        reserve: (bike_id,from,to) => dispatch(reserve({bike_id,from,to})),
        give_rate:(bike_id,rate) => dispatch(give_rate({bike_id,rate})),

    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.home.isLoading,
        bikes: state.home.bikes || [],

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)
