import TablePlugin from 'boiler-ui/lib/plugins/table'
import FormPlugin from 'boiler-ui/lib/plugins/form'

import { getPathnameValue } from 'boiler-ui/lib/tools'

import schemas from '../config/schemas'
import apis from '../apis'

const getItemTitle = getPathnameValue('name')
const getTableTitle = () => 'Bookings'
const getFormTitle = (item) => 'Booking'

const names = {
  table: 'BOOKING_TABLE',
  form: 'BOOKING_FORM'
}

const table = TablePlugin({
  name: names.table,
  apis: apis.booking,
  selector: state => state.booking.table
})

const form = FormPlugin({
  name: names.form,
  apis: apis.booking,
  selector: state => state.booking.form,
  getSchema: schemas.booking,
  getTitle: (item) => item.name
})

const booking = {
  getItemTitle,
  getTableTitle,
  getFormTitle,
  names,
  table,
  form
}

export default booking