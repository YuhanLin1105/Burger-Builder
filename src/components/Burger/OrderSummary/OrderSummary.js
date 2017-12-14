import React from 'react';

import Ax from '../../../hoc/Ax';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
                </li>);
        });


    return (
        <Ax>
            <h3>Your Order</h3>
            <p>with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.btnCancel} >CANCEL</Button>
            <Button btnType="Success" clicked={props.btnContinue} >CONTINUE</Button>
        </Ax>
    )

};

export default orderSummary;