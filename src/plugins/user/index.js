import deepCheck from 'deep-check-error'

import Actions from './actions'
import Reducer from './reducer'
import Saga from './saga'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'base',
  'successRedirect',
  'getLoginSchema',
  'getRegisterSchema',
  'apis.status',
  'apis.login',
  'apis.register',
  'selector'
]

const UserPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.base)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    successRedirect: settings.successRedirect,
    getLoginSchema: settings.getLoginSchema,
    getRegisterSchema: settings.getRegisterSchema,
    apis: settings.apis,
    actions,
    selectors
  })

  return {
    actions,
    reducer,
    saga,
    selectors
  }
}

export default UserPlugin