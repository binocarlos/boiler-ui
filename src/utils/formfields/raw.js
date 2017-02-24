import React, { PropTypes, Component } from 'react'
import deepCheck from 'deep-check-error'
import {
  ucfirst,
  getPathnameValue,
  objCompare
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name',
  'getComponent'
]

const raw = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  return {
    name: settings.name,
    title: settings.title || ucfirst(settings.name),
    get: settings.get || getPathnameValue(settings.name),
    compare: (a, b) => a === b,
    getComponent: settings.getComponent
  }
}

export default raw