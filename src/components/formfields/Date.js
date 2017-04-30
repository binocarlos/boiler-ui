import React, { PropTypes, Component } from 'react'
import DatePicker from 'react-toolbox/lib/date_picker'

import theme from '../themes/TextField.css'

class DateField extends Component {
  render() {

    const inputTheme = this.props.settings.align == 'right' ?
      {
        inputElement: theme.rightAligned
      } :
      {}

    return (
      <DatePicker 
        theme={inputTheme}
        disabled={ this.props.readonly }
        label={ this.props.title } 
        value={ this.props.value || ''} 
        error={ this.props.error }
        onChange={ this.props.update }
      />
    )
  }
}

export default DateField