import React, { Component, PropTypes } from 'react'
import { NavDrawer } from 'react-toolbox/lib/layout'

class SideDrawer extends Component {

  render() {

    return (
      <NavDrawer 
        width={ this.props.width }
        pinned={true}
        clipped={true}
        scrollY
      >
        {this.props.children}
      </NavDrawer>
    )
  }

}

export default SideDrawer