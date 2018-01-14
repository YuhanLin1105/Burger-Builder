import React from 'react';
import classes from './NavItems.css'
import NavItem from './NavItem/NavItem'

const navItems = (props) => {

    return (
        <ul className={classes.NavItems}>
            <NavItem  link="/">Burger Builder</NavItem>
            {props.isAuth 
                ? (<NavItem link="/orders">Orders</NavItem>) 
                : null}
            {props.isAuth 
                ? (<NavItem link="/logout">Logout</NavItem>) 
                : (<NavItem link="/auth">Authenticate</NavItem>)}
        </ul>
    );
};

export default navItems;