import React, { PropTypes, Component } from 'react'
import TimePicker from 'react-toolbox/lib/time_picker'

import theme from '../themes/TextField.css'

class TimeField extends Component {
  render() {

    const inputTheme = this.props.settings.align == 'right' ?
      {
        inputElement: theme.rightAligned
      } :
      {}

    return (
      <TimePicker 
        theme={inputTheme}
        autoOk={ true }
        disabled={ this.props.readonly }
        label={ this.props.title } 
        value={ this.props.value }
        error={ this.props.error }
        onChange={ this.props.update }
      />
    )
  }
}

export default TimeField