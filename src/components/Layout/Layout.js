import React, { Component } from 'react';

import Ax from '../../hoc/Ax';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class layout extends Component {
  state = {
    showSideDrawer: true
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
        <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Ax>
    )
  };
}

export default layout;