import React, { Component, PropTypes } from 'react'

import TablePlugin from 'boiler-ui/lib/containers/TablePlugin'
import TableToolbar from 'boiler-ui/lib/components/toolbars/Table'

import tables from '../config/tables'
import icons from '../config/icons'
import plugins from '../plugins'

const selector = (state) => {
  const currentInstallation = plugins.user.selectors.status.currentInstallation(state)
  const containerState = plugins.installation.table.selectors.container(state)
  return Object.assign({}, containerState, {
    currentInstallation
  })
}

class InstallationTable extends Component {
  render() {
    return (
      <TablePlugin 
        selector={selector}
        dispatcher={plugins.installation.table.actions.dispatcher}
        table={tables.installation}
        getIcon={() => icons.installation}
        getItemTitle={plugins.installation.getItemTitle}
        mainTitle={plugins.installation.getTableTitle()}
        getToolbar={(props) => (<TableToolbar {...props} />)}
      />
    )
  }
}

export default InstallationTable