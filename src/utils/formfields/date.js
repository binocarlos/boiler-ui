import React, { PropTypes, Component } from 'react'
import deepCheck from 'deep-check-error'
import DatePicker from '../../components/formfields/Date'
import {
  ucfirst,
  getPathnameValue,
  stringCompare
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const text = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  const defaultGetComponent = (props) => {
    const value = !props.value || typeof(props.value) == 'string' ? new Date() : props.value
    const fieldProps = Object.assign({}, props, settings.props, {
      value
    })
    return (
      <DatePicker {...fieldProps} />
    )
  }
  return {
    name: settings.name,
    title: settings.title || ucfirst(settings.name),
    get: settings.get || getPathnameValue(settings.getname || settings.name),
    compare: (a, b) => a === b,
    getComponent: settings.getComponent || defaultGetComponent,
    settings: settings
  }
}

export default text