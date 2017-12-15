import React, { Component } from 'react';

import Ax from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        purchasing: false,
        totalPrice: 4,
        loading: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-l.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error=>{});
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Lin",
                address: {
                    street: "aaa",
                    zipCode: "1234",
                    country: 'US'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }

        }
        axios.post('/order.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }


    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });

    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = (oldCount <= 0) ? 0 : oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;

        const priceAddition = (oldCount <= 0) ? 0 : INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
    }

    checkDisableInfo = () => {
        const disableInfo = {
            ...this.state.ingredients
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

        let burger = <Spinner />
        let orderSummary = null;

        if (this.state.ingredients) {
            burger =
                <Ax>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disableInfoCheck={disableInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Ax>;
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                btnCancel={this.purchaseCancelHandler}
                btnContinue={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>;
        }

        return (
            <Ax>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Ax>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);