import RouterActions from 'boiler-ui/lib/actions/router'
import TriggerActions from 'boiler-ui/lib/actions/trigger'
import plugins from './plugins'

export const router = RouterActions
export const menu = plugins.menu.actions
export const snackbar = plugins.snackbar.actions
export const user = plugins.user.actions

const actions = {
  router,
  menu,
  snackbar,
  user,
  datatriggers: TriggerActions('DATA_TRIGGER')
}

export default actions