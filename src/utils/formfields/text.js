import React, { PropTypes, Component } from 'react'
import deepCheck from 'deep-check-error'
import Text from '../../components/formfields/Text'
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
    const fieldProps = Object.assign({}, props, {
      type: settings.type
    }, settings.props)
    return (
      <Text {...fieldProps} />
    )
  }
  return {
    name: settings.name,
    title: settings.title || ucfirst(settings.name),
    get: settings.get || getPathnameValue(settings.getname || settings.name),
    compare: stringCompare,
    getComponent: settings.getComponent || defaultGetComponent,
    settings: settings
  }
}

export default text