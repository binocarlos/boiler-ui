import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from '../components/Table'
import GenericToolbar from '../components/toolbars/Generic'
import PageLayout from '../components/layout/Page'

import {
  mergeSelectors,
  mergeDispatchers
} from '../tools'

import {
  getItemTitle,
  getDeleteTitle
} from '../utils/toolbar'

const defaultGetTitle = getItemTitle('name')

class TablePlugin extends Component {
  render() {
      
    const getItemTitle = this.props.getItemTitle || defaultGetTitle

    const mainTitle = this.props.parentItem ? getItemTitle(this.props.parentItem) : this.props.defaultTitle

    const defaultTitle = this.props.parentItem ? getItemTitle(this.props.parentItem) : this.props.defaultTitle

    const toolbarTitle = getDeleteTitle(this.props.mainTitle, getItemTitle, this.props.selectedItems, defaultTitle)
    const icon = this.props.getIcon()

    const sortfn = this.props.table.sort ?
      this.props.table.sort(this.props) :
      null

    const mapfn = this.props.table.map(this.props)

    const rawData = this.props.data || []

    const sortedData = sortfn ?
      sortfn(rawData) :
      rawData

    const mappedData = sortedData.map(mapfn)

    const tableProps = Object.assign({}, this.props, {
      data: mappedData,
      rawdata: this.props.data,
      tableFields: this.props.table.schema,
      getItemTitle: getItemTitle
    }, this.props.getTableProps ? this.props.getTableProps(this.props) : {})

    const toolbarProps = Object.assign({}, this.props, {
      title: toolbarTitle,
      icon
    })

    const TableComponent = this.props.TableComponent || Table

    const toolbar = this.props.getToolbar ?
      this.props.getToolbar(toolbarProps) :
      (
        <GenericToolbar 
          title={toolbarTitle}
          icon={icon}
        />
      )

    return (
      <PageLayout toolbar={toolbar}>
        <TableComponent {...tableProps} />
      </PageLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => mergeSelectors(state, ownProps.selector)
const mapDispatchToProps = (dispatch, ownProps) => mergeDispatchers(dispatch, ownProps.dispatcher)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePlugin)