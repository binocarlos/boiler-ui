import React, { Component, PropTypes } from 'react'
import UIDropdown from 'react-toolbox/lib/dropdown'
import whitetheme from './themes/DropdownWhite.scss'

class Dropdown extends Component {

  render() {
    const theme = this.props.white ?
      whitetheme :
      null
    return (
      <UIDropdown
        theme={theme}
        auto={ false }
        label={ this.props.label }
        source={ this.props.data }
        onChange={ this.props.onChange }
        value={ this.props.value }
      />
    )
    
  }
}

export default Dropdown