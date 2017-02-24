import React, { PropTypes, Component } from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'

class Select extends Component {

  render() {
    return (
      <Dropdown 
        auto={ false }
        label={ this.props.title }
        source={ this.props.options }
        onChange={ this.props.update }
        value={ this.props.value }
        onBlur={ this.props.touch }
        error={ this.props.error }
      />
    )
  }
}

export default Select