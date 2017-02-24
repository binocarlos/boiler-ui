import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import selectors from '../selectors'

class Currency extends Component {
  render() {
    return (
      <span>
        <span>{this.props.symbol} </span>
        <span>{this.props.children}</span>
      </span>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const currentInstallation = selectors.currentInstallation(state)
  const meta = (currentInstallation || {}).meta || {}
  const symbol = meta.currency || '£'
  return {
    symbol: symbol
  }
}


export default connect(
  mapStateToProps
)(Currency)