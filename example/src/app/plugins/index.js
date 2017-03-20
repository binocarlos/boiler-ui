import MenuPlugin from 'boiler-ui/lib/plugins/menu'
import SnackbarPlugin from 'boiler-ui/lib/plugins/snackbar'
import SystemActions from 'boiler-ui/lib/actions/system'

import user from './user'
import booking from './booking'

export const menu = MenuPlugin({
  base: 'MENU',
  selector: state => state.menu
})

export const snackbar = SnackbarPlugin({
  base: 'SNACKBAR',
  selector: state => state.snackbar,
  triggers: [
    SystemActions.types.mutation,
    SystemActions.types.error
  ]
})

const plugins = {
  menu,
  snackbar,
  user,
  booking
}

export default plugins