import React, { Component, PropTypes } from 'react'

import TablePlugin from 'boiler-ui/lib/containers/TablePlugin'
import TableToolbar from 'boiler-ui/lib/components/toolbars/Table'

import tables from '../config/tables'
import icons from '../config/icons'
import plugins from '../plugins'

class ClientTable extends Component {
  render() {
    return (
      <TablePlugin 
        selector={plugins.client.table.selectors.container}
        dispatcher={plugins.client.table.actions.dispatcher}
        table={tables.client}
        getIcon={() => icons.client}
        getItemTitle={plugins.client.getItemTitle}
        mainTitle={plugins.client.getTableTitle()}
        getToolbar={(props) => (<TableToolbar {...props} />)}
      />
    )
  }
}

export default ClientTable