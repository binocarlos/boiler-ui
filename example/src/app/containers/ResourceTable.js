import React, { Component, PropTypes } from 'react'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

import TablePlugin from 'boiler-ui/lib/containers/TablePlugin'
import SearchPlugin from 'boiler-ui/lib/containers/SearchPlugin'
import TableToolbar from 'boiler-ui/lib/components/toolbars/Table'

import tables from '../config/tables'
import resources from '../config/resources'
import icons from '../config/icons'
import plugins from '../plugins'

const plugin = plugins.resource

const getToolbar = (props) => {
  
  const addItems = resources.list.map(resource => {
    return [ resource.title, icons[resource.icon], { type: resource.type } ]
  })

  let upButton = null

  if(props.parentItem && props.selectedItems.length <= 0) {
    const parentid = props.parentItem.parent ?
      props.parentItem.parent :
      'root'

    upButton = (
      <Button
        label="up"
        icon='arrow_upward'
        onClick={ () => props.open(parentid) }
        ripple={ false }
      />
    )
  }

  let afterActions = []

  if(props.selectedItems.length == 0 && (props.clipboardIds || []).length > 0 && !props.readonly) {
    afterActions.push(['Paste', 'content_paste', () => {
      props.submitClipboard()
    }])
  }
  else if(props.selectedItems.length > 0) {
    afterActions.push(['Copy', 'content_copy', () => {
      const ids = props.selectedItems.map(item => item.id)
      props.setClipboard('copy', ids)
      props.select([])
    }])
  }

  const search = props.selectedItems.length == 0 ? (
    <SearchPlugin
      selector={props.searchSelector}
      dispatcher={props.searchDispatcher}
    />
  ) :
  null

  const toolbarProps = Object.assign({}, props, {
    addItems,
    beforeButtons: upButton,
    rightChildren: search,
    afterActions
  })

  return (
    <TableToolbar {...toolbarProps} />
  )
}

class ResourceTable extends Component {
  render() {
    return (
      <TablePlugin 
        readonly={this.props.readonly}
        selector={this.props.selector}
        dispatcher={this.props.dispatcher}
        searchSelector={this.props.searchSelector}
        searchDispatcher={this.props.searchDispatcher}
        table={tables.resource}
        getIcon={plugins.resource.getIcon}
        getItemTitle={plugins.resource.getItemTitle}
        defaultTitle={this.props.defaultTitle || plugins.resource.getTableTitle()}
        mainTitle={plugins.resource.getTableTitle()}
        getToolbar={getToolbar}
      />
    )
  }
}

export default ResourceTable