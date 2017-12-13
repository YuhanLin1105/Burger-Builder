import React from 'react';

import Ax from '../../../hoc/Ax';

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
            <p>Continue to Checkout?</p>
        </Ax>
    )

};

export default orderSummary;