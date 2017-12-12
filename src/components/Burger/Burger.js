import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props)=>{
    let tansIngredients = Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])]
                .map((_, i)=>{
                    return <BurgerIngredient key={igKey+i} type={igKey}/>;
                });
        })
        .reduce((pre,cur)=>{
            return pre.concat(cur);
        },[]);
    if (tansIngredients.length===0)
        tansIngredients="Please add some ingredients."

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {tansIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;