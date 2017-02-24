import deepCheck from 'deep-check-error'

import Actions from './actions'
import Reducer from './reducer'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'base',
  'selector' 
]

const MenuPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.base)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)

  return {
    actions,
    reducer,
    selectors
  }
}

export default MenuPlugin