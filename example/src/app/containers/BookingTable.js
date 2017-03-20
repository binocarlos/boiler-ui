import React, { Component, PropTypes } from 'react'

import TablePlugin from 'boiler-ui/lib/containers/TablePlugin'
import TableToolbar from 'boiler-ui/lib/components/toolbars/Table'

import tables from '../config/tables'
import icons from '../config/icons'
import plugins from '../plugins'

class BookingTable extends Component {
  render() {
    return (
      <TablePlugin 
        selector={[
          plugins.booking.table.selectors.container
        ]}
        dispatcher={plugins.booking.table.actions.dispatcher}
        table={tables.booking}
        getIcon={() => icons.booking}
        getItemTitle={plugins.booking.getItemTitle}
        mainTitle={plugins.booking.getTableTitle()}
        getToolbar={(props) => (<TableToolbar {...props} />)}
      />
    )
  }
}

export default BookingTable