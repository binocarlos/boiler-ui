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

    return (
      <GenericToolbar 
        title={title}
        icon={icon}
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