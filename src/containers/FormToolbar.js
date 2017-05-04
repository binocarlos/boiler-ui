import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Form from '../components/Form'
import GenericToolbar from '../components/toolbars/Generic'
import ToolbarLayout from '../components/layout/Toolbar'

import {
  getItemTitle
} from '../utils/toolbar'

import {
  mapFormField,
  doesFormHaveError
} from '../utils/formfields/tools'

const defaultGetTitle = getItemTitle()

const STYLES = {
  error: {
    color: '#ff0000',
    textDecoration: 'underline',
    padding: '10px'
  }
}

class FormToolbar extends Component {
  render() {

    const getItemTitle = this.props.getItemTitle || defaultGetTitle
    const icon = this.props.getIcon(this.props.data)

    const buttons = this.props.getButtons ?
      this.props.getButtons(this.props) :
      null

    const mainTitle = this.props.getMainTitle ?
      this.props.getMainTitle(this.props.originalData) :
      'Item'

    const title = this.props.data.id ?
      getItemTitle(this.props.originalData) :
      'New ' + mainTitle

    const errorDiv = this.props.form_touched && !this.props.valid ?
      (
        <div style={ STYLES.error }>
          the form has errors
        </div>
      ) : null

    return (
      <GenericToolbar 
        title={title}
        icon={icon}
        rightChildren={errorDiv}
      >
        {buttons}
      </GenericToolbar>
    )
  }
}

const mapStateToProps = (state, ownProps) => ownProps.selector(state)
const mapDispatchToProps = (dispatch, ownProps) => ownProps.dispatcher(dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormToolbar)