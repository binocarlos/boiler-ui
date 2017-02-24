import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import deepCheck from 'deep-check-error'

import routerActions from '../actions/router'

import {
  mapFormField,
  doesFormHaveError
} from '../utils/formfields/tools'

class FormContainer extends Component {

  render() {
    const FormComponent = this.props.formComponent
    const fields = this.props.getFields(this.props.data, this.props.meta)
    const componentProps = Object.assign({}, this.props, {
      fields: fields.map(field => {
        return mapFormField(field, this.props.data, this.props.meta, this.props.originalData, this.props.form_touched)
      })
    })
    return (
      <FormComponent {...componentProps} />
    )
  }
}

FormContainer.propTypes = {
  formComponent: PropTypes.func.isRequired,
  getFields: PropTypes.func.isRequired
}

const REQUIRED_PROPS = [
  'formSelector',
  'apiSelector'
]

const mapStateToProps = (state, ownProps) => {
  deepCheck(ownProps, REQUIRED_PROPS)
  const formState = ownProps.formSelector(state)
  const apiState = ownProps.apiSelector(state)
  return {
    valid: doesFormHaveError(formState.meta) ? false : true,
    form_touched: formState.meta.form_touched,
    data: formState.data,
    meta: formState.meta,
    originalData: formState.originalData,
    error: apiState.error
  }
}

const REQUIRED_ACTIONS = [
  'actions.update',
  'actions.touch',
  'actions.touchform',
  'actions.submit'
]

const mapDispatchToProps = (dispatch, ownProps) => {
  deepCheck(ownProps, REQUIRED_ACTIONS)
  const actions = ownProps.actions
  return {
    update: (name, value) => dispatch(actions.update(name, value)),
    touch: (name) => dispatch(actions.touch(name)),
    submit: (valid) => {
      valid ?
        dispatch(actions.submit()) :
        dispatch(actions.touchform())
    },
    redirect: (path) => dispatch(routerActions.push(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)