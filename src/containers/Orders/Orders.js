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
        console.log("OrdersDidMount");
        this.props.fecthingOrders();
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchOrders = [];
        //         for (let key in res.data) {
        //             fetchOrders.push(
        //                 {
        //                     ...res.data[key],
        //                     id: key
        //                 });
        //         }
        //         console.log(fetchOrders);
        //         this.setState({
        //             loading: false,
        //             orders: fetchOrders
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false });
        //     })
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fecthingOrders: () => dispatch(actionCreator.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));