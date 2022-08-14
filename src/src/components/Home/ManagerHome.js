import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from "antd/es/card/Card";
import {get_rentals} from "../../redux/home/action_creators";
import {Spin, Switch, Tooltip} from "antd";
import {AliwangwangFilled, DingdingOutlined, LoadingOutlined} from "@ant-design/icons";
import moment from "moment";

class Home extends Component {
    componentDidMount() {
        this.props.get_rentals()
    }

    renderBikes() {
        return (
            <>
                <div style={{overflow: "auto"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {this.props.rentals.map(x =>
                            <div style={{margin: 10}}>
                                <Card title={x.bike?.model} bordered={true} style={{width: 300}} extra={
                                    <Tooltip placement="topLeft"
                                             title={`A ${x.bike?.model} of color ${x.bike?.color} at location '${x.bike?.location}'`}>

                                        <DingdingOutlined style={{fontSize: 22}}/>
                                    </Tooltip>
                                }>
                                    <p style={{fontWeight: "500"}}>Reservation details</p>
                                    <p>reserved
                                        from {moment(x.reserve_from).format("D, MMMM YYYY")} to {moment(x.reserve_to).format("D, MMMM YYYY")} for {moment(x.reserve_to).diff(moment(x.reserve_from), 'days') + 1} days
                                        by <Tooltip title={x.user.email}><span style={{
                                            fontWeight: "bold",
                                            cursor: "pointer"
                                        }}>{x.user.username}</span></Tooltip>
                                    </p>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }

    renderUsers() {
        return (
            <>
                <div style={{overflow: "auto"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {this.props.rentals.map(x =>
                            <div style={{margin: 10}}>
                                <Card title={x.user.username}
                                      bordered={false}
                                      style={{width: 300}}
                                      extra={
                                          <Tooltip placement="topLeft" title={x.user.email}>
                                            <AliwangwangFilled style={{fontSize: 22}}/>
                                          </Tooltip>
                                      }>
                                        <p style={{fontWeight: "500"}}>Reservation details</p>
                                        <p>
                                            reserved
                                            <Tooltip title={`A ${x.bike?.model} of color ${x.bike?.color} at location '${x.bike?.location}'`}>
                                                <span style={{fontWeight: "bold", cursor: "pointer"}}> {x.bike.model} </span>
                                            </Tooltip>
                                            from {moment(x.reserve_from).format("D, MMMM YYYY")} to {moment(x.reserve_to).format("D, MMMM YYYY")} for {moment(x.reserve_to).diff(moment(x.reserve_from), 'days') + 1} days
                                        </p>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }

    render() {
        return (
            <div>
                <span style={{paddingRight:10}}>Users Reservations</span>
                <Switch checked={this.props.showBikesReserved} onChange={()=>this.props.switch_view(!this.props.showBikesReserved)} />
                <span style={{paddingLeft:10}}>Reserved Bikes</span>
                <h2>
                    {this.props.showBikesReserved ? "Reserved Bikes" : "Users who reserved bikes"}
                    {this.props.isLoading &&
                        <Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>}
                </h2>
                {this.props.showBikesReserved ? this.renderBikes() : this.renderUsers()}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_rentals: () => dispatch(get_rentals()),
        switch_view: (showReservedBikes) => dispatch({type:"SWITCH_RESERVATION_VIEW",payload:showReservedBikes})
    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.home.isLoading,
        showBikesReserved: state.home.showBikesReserved,
        rentals: state.home.rentals || [],

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)
