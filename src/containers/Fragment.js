import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Fragment extends Component {
  render() {
    return this.props.visible ? this.props.children : null
  }
}

export default connect(
  (state, ownProps) => {
    const forRoute = ownProps.forRoute || ''
    const currentRoute = state.router.route
    let visible = false
    if(ownProps.exact && forRoute == currentRoute) visible = true
    if(!ownProps.exact && currentRoute.indexOf(forRoute) == 0) visible = true
    return {
      visible
    }
  },
  (dispatch) => {
    return {}
  }
)(Fragment)