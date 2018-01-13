import React, { Component } from 'react';

class Auth extends Component {
    state = {
        controls: {
            inputEmail: {
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
            }
        }

    }

    render() {
        return (
            <div>
                <from>

                </from>
            </div>
        );
    };
}

export default Auth;