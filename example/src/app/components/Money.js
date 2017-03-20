import React, { Component, PropTypes } from 'react'

import {
  processMoney
} from 'boiler-ui/lib/tools'

class Money extends Component {
  render() {
    return (
      <span>
        { processMoney(this.props.amount) }
      </span>
    )
  }
}

export default Money