import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import deepCheck from 'deep-check-error'

import Snackbar from 'react-toolbox/lib/snackbar'

class SnackbarPluginContainer extends Component {

  render() {
    return (
      <Snackbar
        active={ this.props.open }
        label={ this.props.message }
        timeout={ 2500 }
        onClick={ this.props.closeSnackbar }
        onTimeout={ this.props.closeSnackbar }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: ownProps.selectors.open(state),
    message: ownProps.selectors.text(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const actions = ownProps.actions
  return {
    closeSnackbar: () => dispatch(actions.close())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarPluginContainer)