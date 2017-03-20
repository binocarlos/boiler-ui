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
    plugins.booking.table.saga,
    plugins.booking.form.saga,
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

  ]
}

export default getSagas