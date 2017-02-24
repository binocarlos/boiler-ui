import React, { Component, PropTypes } from 'react'
import Button from 'react-toolbox/lib/button'

import ButtonMenu from '../ButtonMenu'
import GenericToolbar from './Generic'

class FormToolbar extends Component {

  render() {

    return (

      <div>
        <Button
          label={this.props.cancelTitle}
          icon={this.props.cancelIcon}
          onClick={this.props.cancel}
          ripple={false}
        />
         {
            this.props.readonly ? 
              null : 
              (
                <Button
                  label={this.props.revertTitle}
                  icon={this.props.revertIcon}
                  onClick={this.props.revert}
                  ripple={false}
                />
              )
          }
          {
            this.props.readonly ? 
              null : 
              (
                <Button
                  label={this.props.saveTitle}
                  icon={this.props.saveIcon}
                  onClick={this.props.submit}
                  raised={this.props.valid} 
                  primary={this.props.valid}
                  ripple={false}
                />
              )
          }
      </div>
    )
  }

}

FormToolbar.propTypes = {
  cancelTitle: PropTypes.string,
  cancelIcon: PropTypes.string,
  revertTitle: PropTypes.string,
  revertIcon: PropTypes.string,
  saveTitle: PropTypes.string,
  saveIcon: PropTypes.string,
  cancel: PropTypes.func.isRequired,
  revert: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
}

FormToolbar.defaultProps = {
  cancelTitle: 'Cancel',
  cancelIcon: 'clear',
  revertTitle: 'Revert',
  revertIcon: 'undo',
  saveTitle: 'Save',
  saveIcon: 'send'
}

export default FormToolbar