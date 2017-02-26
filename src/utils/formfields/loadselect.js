import React, { PropTypes, Component } from 'react'
import deepCheck from 'deep-check-error'
import Select from '../../components/formfields/Select'
import LoadSelect from '../../containers/LoadSelect'

import {
  ucfirst,
  getPathnameValue,
  stringCompare
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name',
  'selector',
  'mapOptions',
  'trigger'
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
    get: settings.get || getPathnameValue(settings.getname || settings.name),
    compare: stringCompare,
    settings: settings,
    getComponent: (props) => {
      const selector = (state) => {
        let options = settings.selector(state) || []
        options = settings.mapOptions ?
          options.map(settings.mapOptions) :
          options
        return {
          options
        }
      }
      const finalProps = Object.assign({}, props, {
        component: Select,
        trigger: settings.trigger,
        selector
      })
      return (
        <LoadSelect {...finalProps} />
      )
    }
  }
}

export default select