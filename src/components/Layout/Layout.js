import React, { Component } from 'react';
import {connect } from 'react-redux';

import Ax from '../../hoc/Ax';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  }

  render() {
    return (
      <Ax>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuth} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerCloseHandler} 
          isAuth={this.props.isAuth}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Ax>
    )
  };
}

const mapStateToProps = state =>{
  return{
    isAuth:state.auth.token!=null
  }
}

export default connect(mapStateToProps)(layout);