import TablePlugin from 'boiler-ui/lib/plugins/table'
import FormPlugin from 'boiler-ui/lib/plugins/form'

import { getPathnameValue } from 'boiler-ui/lib/tools'

import schemas from '../config/schemas'
import apis from '../apis'

const getItemTitle = getPathnameValue('name')
const getTableTitle = () => 'Projects'
const getFormTitle = (item) => 'Project'

const names = {
  table: 'PROJECT_TABLE',
  form: 'PROJECT_FORM'
}

const table = TablePlugin({
  name: names.table,
  apis: apis.project,
  selector: state => state.project.table
})

const form = FormPlugin({
  name: names.form,
  apis: apis.project,
  selector: state => state.project.form,
  getSchema: schemas.project,
  getTitle: (item) => item.name
})

const project = {
  getItemTitle,
  getTableTitle,
  getFormTitle,
  names,
  table,
  form
}

export default project