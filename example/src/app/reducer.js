import { combineReducers } from 'redux'

import plugins from './plugins'

const reducer = combineReducers({
  menu: plugins.menu.reducer,
  snackbar: plugins.snackbar.reducer,
  user: plugins.user.reducer,
  installation: combineReducers({
    table: plugins.installation.table.reducer,
    form: plugins.installation.form.reducer
  }),
  client: combineReducers({
    table: plugins.client.table.reducer,
    form: plugins.client.form.reducer
  }),
  resource: plugins.resource.reducer,
  project: combineReducers({
    table: plugins.project.table.reducer,
    form: plugins.project.form.reducer
  })
})

export default reducer