import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.fecthingOrders(this.props.token);
    }

    render() {
        let orderlist = this.props.loading ? <Spinner /> : (
            <div>
                {this.props.orders.map(order => {
                    return <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                })}
            </div>
        );
        return orderlist;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fecthingOrders: (token) => dispatch(actionCreator.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));