import { PUSH } from 'redux-little-router'
import { action } from './tools'

const ROUTER_LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED'
const ROUTER_REDIRECT = 'ROUTER_REDIRECT'

const RouterActions = {
  types:{
    push: PUSH,
    changed: ROUTER_LOCATION_CHANGED,
    redirect: ROUTER_REDIRECT
  },
  push: (payload) => action(PUSH, { payload }),
  redirect: (base) => (name, payload) => action(ROUTER_REDIRECT, { base, name, payload })
}

export default RouterActions