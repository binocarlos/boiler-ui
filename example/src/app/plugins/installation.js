import ApiActions from 'boiler-ui/lib/actions/api'
import ApiSaga from 'boiler-ui/lib/sagas/api'
import TablePlugin from 'boiler-ui/lib/plugins/table'
import FormPlugin from 'boiler-ui/lib/plugins/form'

import { getPathnameValue } from 'boiler-ui/lib/tools'

import schemas from '../config/schemas'
import apis from '../apis'

const getItemTitle = getPathnameValue('name')
const getTableTitle = () => 'Companies'
const getFormTitle = (item) => 'Company'

const names = {
  table: 'INSTALLATION_TABLE',
  form: 'INSTALLATION_FORM',
  activate: 'INSTALLATION_ACTIVATE'
}

const table = TablePlugin({
  name: names.table,
  apis: apis.installation,
  selector: state => state.installation.table
})

const form = FormPlugin({
  name: names.form,
  apis: apis.installation,
  selector: state => state.installation.form,
  getSchema: schemas.installation,
  getTitle: (item) => item.name
})

const activateAction = ApiActions(names.activate)
const activate = {
  action: activateAction,
  saga: ApiSaga({
    api: apis.installation.activate,
    actions: activateAction
  })
}

const installation = {
  getItemTitle,
  getTableTitle,
  getFormTitle,
  names,
  table,
  form,
  activate
}

export default installation