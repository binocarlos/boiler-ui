import React, { Component, PropTypes } from 'react'

import TablePlugin from 'boiler-ui/lib/containers/TablePlugin'
import TableToolbar from 'boiler-ui/lib/components/toolbars/Table'

import tables from '../config/tables'
import icons from '../config/icons'
import plugins from '../plugins'

class ProjectTable extends Component {
  render() {
    return (
      <TablePlugin 
        selector={plugins.project.table.selectors.container}
        dispatcher={plugins.project.table.actions.dispatcher}
        table={tables.project}
        getIcon={() => icons.project}
        getItemTitle={plugins.project.getItemTitle}
        mainTitle={plugins.project.getTableTitle()}
        getToolbar={(props) => (<TableToolbar {...props} />)}
      />
    )
  }
}

export default ProjectTable