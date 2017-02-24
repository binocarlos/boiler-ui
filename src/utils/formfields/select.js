import React, { PropTypes, Component } from 'react'
import deepCheck from 'deep-check-error'
import Select from '../../components/formfields/Select'
import {
  ucfirst,
  getPathnameValue,
  stringCompare
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const select = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  return {
    name: settings.name,
    title: settings.title || ucfirst(settings.name),
    get: getPathnameValue(settings.name),
    compare: stringCompare,
    getComponent: (props) => {
      const options = settings.options || []
      const finalProps = Object.assign({}, props, {
        options
      })
      return (
        <Select {...finalProps} />
      )
    }
  }
}

export default select