import React, {Component} from 'react';
import {FilterFilled, LoadingOutlined} from "@ant-design/icons";
import {Button, Spin} from "antd";
import moment from "moment";
import {
    cancel_reservation,
    get_available_bikes,
    get_my_reservations,
    give_rate,
    reserve
} from "../../redux/home/action_creators";
import {connect} from "react-redux";
import {BikeCard} from "../Bikes";

class UserReservations extends Component {
    componentDidMount() {
        this.props.get_my_reservations()
    }

    render() {
        return (
            <div>
                <div>
                    <h2>
                        Your Reservations
                        {this.props.isLoading&&<Spin style={{marginLeft: 10}} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>}
                    </h2>
                    <div style={{overflow: "auto"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            {
                                this.props.my_reservations.map((x,id)=>
                                    <BikeCard hideEdit={true} hideDelete={true}
                                              giveRate={(bike_id,s)=>{
                                                  this.props.give_rate(bike_id,s)
                                              }}
                                              reservationDetail={`reserved from ${moment(x.reserve_from).format("D, MMMM YYYY")} to ${moment(x.reserve_to).format("D, MMMM YYYY")} for ${moment(x.reserve_to).diff(moment(x.reserve_from), 'days') + 1} days`}
                                              data={x.bike} key={id} extras={<Button danger onClick={()=>{
                                        this.props.cancel_reservation(x._id)
                                    }}>Cancel Reservation</Button>}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_my_reservations: () => dispatch(get_my_reservations()),
        cancel_reservation: (id) => dispatch(cancel_reservation(id)),
        give_rate:(bike_id,rate) => dispatch(give_rate({bike_id,rate})),
    };
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.home.isLoading,
        my_reservations: state.home.my_reservations || [],

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserReservations)
