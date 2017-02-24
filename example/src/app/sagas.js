import RouteTriggerSaga from 'boiler-ui/lib/sagas/routetrigger'
import DataTriggerSaga from 'boiler-ui/lib/sagas/datatrigger'
import RedirectorSaga from 'boiler-ui/lib/sagas/redirector'

import plugins from './plugins'
import actions from './actions'

import { 
  getRouteActions,
  redirectors,
  dataTriggers
} from './routes'

const getSagas = (apis = {}) => {

  return [

    plugins.user.saga,
    plugins.snackbar.saga,
    plugins.installation.table.saga,
    plugins.installation.form.saga,
    plugins.installation.activate.saga,
    plugins.installationDropdown.saga,
    plugins.client.table.saga,
    plugins.client.form.saga,
    plugins.client.newData.saga,
    plugins.project.table.saga,
    plugins.project.form.saga,
    RouteTriggerSaga({
      getRouteActions,
      userLoadedActionType: actions.user.status.api.types.success
    }),
    DataTriggerSaga({
      handlers: dataTriggers
    }),
    RedirectorSaga({
      redirectors
    })

  ].concat(plugins.resource.sagas)
}

export default getSagas