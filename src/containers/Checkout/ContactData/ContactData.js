import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            inputName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your name"
                },
                value: ''
            },
            inputEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your email"
                },
                value: ''
            },
            inputStreet: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Street"
                },
                value: ''
            },

            inputZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Postal code"
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    options: ['fastest', 'cheapest']
                }

            }
        },
        loading: false


    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Yuhan",
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
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false,

                });
            });
    }

    inputChangedHandler = (event, id) => {
        const transOrderForm = { ...this.state.orderForm };
        const transOrderInput = {...transOrderForm[id]};
        transOrderInput.value = event.target.value;
        transOrderForm[id]=transOrderInput;
        this.setState({ orderForm: transOrderForm });
    }

    render() {

        let formInputs = [];
        for (let item in this.state.orderForm) {
            formInputs.push({
                id: item,
                config: this.state.orderForm[item]
            });
        }
        let form = (
            <form action="">
                {formInputs.map((input) => (
                    <Input
                        inputtype={input.config.elementType}
                        elementConfig={input.config.elementConfig}
                        key={input.id}
                        value={input.config.value}
                        changed={(event) => { return this.inputChangedHandler(event, input.id) }}
                    />))}
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (<div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
        )
    }


}

export default ContactData;