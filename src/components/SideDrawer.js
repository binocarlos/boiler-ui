import React, { Component, PropTypes } from 'react'
import { NavDrawer } from 'react-toolbox/lib/layout'
import theme from './themes/SideDrawer.css'

class SideDrawer extends Component {

  render() {

    return (
      <NavDrawer 
        width={ this.props.width }
        theme={theme}
        pinned
        scrollY
      >
      {this.props.children}
      </NavDrawer>
    )
  }

}

export default SideDrawer