import {
  action,
  getTypes
} from './tools'

const ToggleActions = (base) => {
  const types = getTypes(base, [
    'TOGGLE'
  ])
  return {
    types,
    base,
    open: (payload = null) => action(types.toggle, { open:true, payload }),
    close: (payload = null) => action(types.toggle, { open:false, payload }),
    toggle: (open = false, payload = null) => action(types.toggle, { open, payload })
  }
}

export default ToggleActions