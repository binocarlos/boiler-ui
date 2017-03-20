import { combineReducers } from 'redux'

import plugins from './plugins'

const reducer = combineReducers({
  menu: plugins.menu.reducer,
  snackbar: plugins.snackbar.reducer,
  user: plugins.user.reducer,
  booking: combineReducers({
    table: plugins.booking.table.reducer,
    form: plugins.booking.form.reducer
  })
})

export default reducer