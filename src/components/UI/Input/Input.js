import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    const inputClass = [classes.InputElement];

    if(props.invalid&&props.touched){
        inputClass.push(classes.Invalid);
    }

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={inputClass.join(" ")} {...props.elementConfig}
                onChange={props.changed}
                value={props.value}
                />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClass.join(" ")}{ ...props}/>;
            break;
        case('select'):
            inputElement = 
                <select 
                    className={inputClass.join(" ")}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option=>(
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input className={inputClass.join(" ")} {...props}/>;
    }

    return (
        <div className={classes.Input}>
            <label >{props.label}</label>
            {inputElement}
        </div>

    );

}

export default input;