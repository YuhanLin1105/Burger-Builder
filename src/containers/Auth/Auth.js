import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as  actionCreator from '../../store/actions/index';
import classes from './Auth.css';
import { checkValidity, updateObject } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Email address"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formValid: false,
        isSignup: true

    }

    inputChangedHandler = (event, id) => {
        const updatedFormElement = updateObject(this.state.controls[id], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[id].validation),
            touched: true
        });

        const updatedcontrols = updateObject(this.state.controls, {
            [id]: updatedFormElement
        });

        let formValid = true;

        for (let key in updatedcontrols) {
            if (!updatedcontrols[key].valid) {
                formValid = false;
            }
        }

        this.setState({ controls: updatedcontrols, formValid: formValid });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

    }

    swithAuthModelHandler = (event) => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        })
    }

    render() {
        if(this.props.isAuth){
            return <Redirect to='/' />
        }

        let form=<Spinner/>    

        if (!this.props.loading) {
            let formInputs = [];
            for (let item in this.state.controls) {
                formInputs.push({
                    id: item,
                    config: this.state.controls[item]
                });
            }
            form = (
                <form onSubmit={this.submitHandler}>
                    {formInputs.map((input) => (
                        <Input
                            inputtype={input.config.elementType}
                            elementConfig={input.config.elementConfig}
                            key={input.id}
                            value={input.config.value}
                            invalid={!input.config.valid}
                            touched={input.config.touched}
                            changed={(event) => { return this.inputChangedHandler(event, input.id) }}
                        />))}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
            );
        }
        let errorMsg = null
        if (this.props.error){
            errorMsg=(
                <p> {this.props.error.message}</p>
            )
        }


        return (
            <div className={classes.Auth}>
                <p>
                    <strong>
                        {this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}
                    </strong>
                </p>
                {form}
                {errorMsg}
                <Button btnType="Danger" clicked={this.swithAuthModelHandler}>SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    };
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token!=null
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreator.auth(email, password, isSignup))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);