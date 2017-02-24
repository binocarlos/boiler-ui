import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  processMoney
} from 'boiler-ui/lib/tools'

import TextInput from 'boiler-ui/lib/components/formfields/Text'
import selectors from '../selectors'

class CurrencyTextField extends Component {
  render() {
    const prepend = this.props.symbol + ' '

    const value = this.props.format ?
      processMoney(this.props.value) : 
      this.props.value

    const props = Object.assign({}, this.props, {
      value: prepend + value,
      update: (val) => {
        val = val.replace(prepend, '')
        this.props.update(val)
      }
    }, this.props.props)
    return (
      <TextInput {...props} />
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
)(CurrencyTextField)