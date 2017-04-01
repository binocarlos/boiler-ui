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

class FormPlugin extends Component {
  render() {
      
    const getItemTitle = this.props.getItemTitle || defaultGetTitle
    const icon = this.props.getIcon(this.props.data)

    const fields = this.props
      .getFormFields(this.props.data, this.props.meta)
      .map(field => {
        return mapFormField(field, this.props.data, this.props.meta, this.props.originalData, this.props.form_touched)
      })

    const formProps = Object.assign({}, this.props, {
      fields
    })

    const FormComponent = this.props.FormComponent || Form

    const form = (
      <FormComponent {...formProps} />
    )

    if(this.props.noToolbar) {
      return form
    }

    const buttons = this.props.getButtons ?
      this.props.getButtons(this.props) :
      null

    const mainTitle = this.props.getMainTitle ?
      this.props.getMainTitle(this.props.originalData) :
      'Item'

    const title = this.props.data.id ?
      getItemTitle(this.props.originalData) :
      'New ' + mainTitle

    const toolbar = (
      <GenericToolbar 
        title={title}
        icon={icon}
      >
       {buttons}
      </GenericToolbar>
    )

    return (
      <ToolbarLayout toolbar={toolbar}>
        { form }
      </ToolbarLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ownProps.selector(state)
const mapDispatchToProps = (dispatch, ownProps) => ownProps.dispatcher(dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPlugin)