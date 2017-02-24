import ApiActions from 'boiler-ui/lib/actions/api'
import ApiSaga from 'boiler-ui/lib/sagas/api'
import BridgeSaga from 'boiler-ui/lib/sagas/bridge'
import TablePlugin from 'boiler-ui/lib/plugins/table'
import FormPlugin from 'boiler-ui/lib/plugins/form'

import { getPathnameValue } from 'boiler-ui/lib/tools'

import schemas from '../config/schemas'
import apis from '../apis'

const getItemTitle = getPathnameValue('meta.name')
const getTableTitle = () => 'Clients'
const getFormTitle = (item) => 'Client'

const names = {
  table: 'CLIENT_TABLE',
  form: 'CLIENT_FORM',
  newData: 'CLIENT_NEW_DATA'
}

const table = TablePlugin({
  name: names.table,
  apis: apis.client,
  selector: state => state.client.table
})

const form = FormPlugin({
  name: names.form,
  apis: apis.client,
  selector: state => state.client.form,
  getSchema: schemas.client,
  getTitle: (item) => (item.meta || {}).name
})

const newDataAction = ApiActions(names.newData)
const newData = {
  action: newDataAction,
  saga: [
    ApiSaga({
      api: apis.client.newData,
      actions: newDataAction
    }),
    BridgeSaga({
      trigger: newDataAction.types.success,
      sink: (action) => form.actions.fields.initialize(action.payload)
    })
  ]
}

const client = {
  getItemTitle,
  getTableTitle,
  getFormTitle,
  names,
  table,
  form,
  newData
}

export default client