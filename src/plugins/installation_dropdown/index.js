import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import routerActions from '../../actions/router'

import Actions from './actions'
import Saga from './saga'
import Container from './Container'

const REQUIRED_SETTINGS = [
  'base',
  'reloadUserAction',
  'activateAction',
  'selectors.loggedIn',
  'selectors.currentInstallation',
  'selectors.installations'
]

const InstallationDropdownPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.base)
  const reloadUserAction = settings.reloadUserAction
  const activateAction = settings.activateAction
  const selectors = settings.selectors
  const saga = Saga({
    trigger: actions.types.trigger,
    reloadUserAction,
    activateAction,
    selectors
  })

  const redirector = routerActions.redirect(settings.base)

  const getContainer = () => {
    const containerProps = Object.assign({}, settings, {
      selectors,
      actions,
      editAction: () => redirector('edit')
    })
    return (
      <Container {...containerProps} />
    )
  }

  return {
    base: settings.base,
    actions,
    saga,
    selectors,
    getContainer
  }
}

export default InstallationDropdownPlugin