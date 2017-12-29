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
                value: '',
                validation: {
                    required: true
                },
                valid:false
            },
            inputEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your email"
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false
            },
            inputStreet: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Street"
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false
            },

            inputZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Postal code"
                },
                value: '',
                validation:{
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false
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

    checkValidity(value, rule){
        let isValid=true;
        
        if(rule.required){
            isValid = value.trim() !== ''&& isValid;
        }

        if(rule.minLength){
            isValid = value.length>= rule.minLength && isValid;
        }

        if(rule.maxLength){
            isValid = value.length<= rule.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const orderData = {};
        for (let formElementKey in this.state.orderForm) {
            orderData[formElementKey] = this.state.orderForm[formElementKey].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderData

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
        const transOrderInput = { ...transOrderForm[id] };
        transOrderInput.value = event.target.value;
        transOrderForm[id] = transOrderInput;
        transOrderForm[id].valid = this.checkValidity(transOrderForm[id].value, transOrderForm[id].validation)
        console.log(transOrderForm[id].valid);
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
            <form onSubmit={this.orderHandler}>
                {formInputs.map((input) => (
                    <Input
                        inputtype={input.config.elementType}
                        elementConfig={input.config.elementConfig}
                        key={input.id}
                        value={input.config.value}
                        changed={(event) => { return this.inputChangedHandler(event, input.id) }}
                        invalid={!input.config.valid}
                    />))}
                <Button btnType="Success">ORDER</Button>
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