import React, { Component, PropTypes } from 'react'

import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import Dialog from 'react-toolbox/lib/dialog'

const defaultGetTitle = (item) => (item || {}).name

class TableComponent extends Component {

  getHead() {
    if(!this.props.heading) return null
    const model = this.props.tableFields || {}
    return (
      <TableHead>
        {
          Object.keys(this.props.tableFields).map((key) => {
            const name = model[key].title || key;
            let style = {}
            const align = model[key].align
            if(align) {
              style.textAlign = align
            }
            return <TableCell key={key} style={style}>{name}</TableCell>;
          })
        }
      </TableHead>
    )
  }

  getBody() {
    const model = this.props.tableFields || {}
    const selection = this.props.selection || []

    const selectedIndexes = selection.reduce((all, index) => {
      all[index] = true
      return all
    }, {})

    return this.props.data.map((data, i) => {
      return (
        <TableRow key={ i } selected={ selectedIndexes[i] }>
          {
            Object.keys(this.props.tableFields).map((key) => {
              const modelField = model[key]
              return (
                <TableCell width={ modelField.width } key={ key }>{ data[key] }</TableCell>
              )
            })
          }
        </TableRow>
      )
    })
  }

  render() {

    const data = this.props.data
    const selectedItems = this.props.selectedItems
    const selectedIds = selectedItems.map(item => item.id)

    const mainTitle = this.props.mainTitle
    const getItemTitle = this.props.getItemTitle || defaultGetTitle

    let deleteTitles = selectedItems.map(getItemTitle)
    let deleteTitle = ''

    if(deleteTitles.length > 1) {
      const lastItem = deleteTitles.pop()
      deleteTitle = deleteTitles.join(', ') + ' and ' + lastItem
    }
    else if(deleteTitles.length == 1) {
      deleteTitle = deleteTitles[0]
    }

    const baseProps = {
      heading: this.props.heading,
      model: this.props.tableFields,
      onSelect: this.props.select,
      selectable: data.length > 0,
      multiSelectable: true,
      selected: this.props.selection,
      source: data
    }

    const extraProps = this.props.getExtraProps ?
      this.props.getExtraProps(baseProps) :
      {}

    const finalProps = Object.assign({}, baseProps, extraProps)

    return (
      <div style={{height:'100%'}}>
        <Table multiSelectable onRowSelect={ this.props.select }>
          { this.getHead() }
          { this.getBody() }
        </Table>
        <Dialog
          actions={[
            { label: "Cancel", icon: 'cancel', onClick: this.props.closeDeleteWindow },
            { label: "Delete", icon: 'delete', onClick: () => this.props.confirmDelete(selectedIds, deleteTitle) }
          ]}
          active={ this.props.isDeleteWindowOpen }
          onEscKeyDown={ this.props.closeDeleteWindow }
          onOverlayClick={ this.props.closeDeleteWindow }
          title={ 'Delete ' + mainTitle + '?' }
        >
          <p>Are you sure you want to delete { deleteTitle } ?</p>
        </Dialog>
      </div>
    )
  }
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  tableFields: PropTypes.object.isRequired,
  isDeleteWindowOpen: PropTypes.bool.isRequired,
  getItemTitle: PropTypes.func,
  heading: PropTypes.bool,
  select: PropTypes.func.isRequired,
  closeDeleteWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired
}

export default TableComponent