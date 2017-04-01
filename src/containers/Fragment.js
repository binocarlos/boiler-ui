import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Fragment extends Component {
  render() {
    return this.props.visible ? this.props.children : null
  }
}

export default connect(
  (state) => {
    return {
      visible: false
    }
  },
  (dispatch) => {
    return {}
  }
)(Fragment)