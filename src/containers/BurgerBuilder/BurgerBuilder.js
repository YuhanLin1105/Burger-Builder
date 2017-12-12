import React, { Component } from 'react';

import Ax from '../../hoc/Ax';

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {

    render() {
        return (
            <Ax>
                <Burger/>
                <div>Build Controls</div>
            </Ax>
        );
    }
}

export default BurgerBuilder;