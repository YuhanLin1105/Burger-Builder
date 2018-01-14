import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
// import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';




class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onIngredientInit()
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });

    }


    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });

    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                purchasing: true
            });
        }else{
            this.props.history.push('/auth');
        };
    }

    checkDisableInfo = () => {
        const disableInfo = {
            ...this.props.ings
        }
        let purchasable = false;

        for (let key in disableInfo) {
            if (disableInfo[key] > 0)
                purchasable = true;
            disableInfo[key] = !disableInfo[key] > 0;

        }
        disableInfo["purchasable"] = purchasable;

        return disableInfo;
    }

    render() {
        const disableInfo = this.checkDisableInfo();

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : null;
        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemove={this.props.onIngredientRemove}
                        disableInfoCheck={disableInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                    />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                btnCancel={this.purchaseCancelHandler}
                btnContinue={this.purchaseContinueHandler} />;
        };

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuth: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onIngredientInit: () => dispatch(actionCreators.initIngredients())
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));