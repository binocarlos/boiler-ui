import React, { Component, PropTypes } from 'react'

import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import Dialog from 'react-toolbox/lib/dialog'

const defaultGetTitle = (item) => (item || {}).name
const noop = () => {}

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

    const data = this.props.data || []
    const selectedItems = this.props.selectedItems || []
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

    const useSelectable = this.props.selectable == false ? false : true
    const useMultiselectable = this.props.multiSelectable == true ? true : false

    const deleteWindow = this.props.confirmDelete ?
      (
        <Dialog
          actions={[
            { label: "Cancel", icon: 'cancel', onClick: this.props.closeDeleteWindow || noop },
            { label: "Delete", icon: 'delete', onClick: () => this.props.confirmDelete ? this.props.confirmDelete(selectedIds, deleteTitle) : noop() }
          ]}
          active={ this.props.isDeleteWindowOpen ? true : false }
          onEscKeyDown={ this.props.closeDeleteWindow || noop }
          onOverlayClick={ this.props.closeDeleteWindow || noop }
          title={ 'Delete ' + mainTitle + '?' }
        >
          <p>Are you sure you want to delete { deleteTitle } ?</p>
        </Dialog>
      ) :
      null

    return (
      <div style={{height:'100%'}}>
        <Table selectable={ useSelectable } multiSelectable={ useMultiselectable } onRowSelect={ this.props.select || noop }>
          { this.getHead() }
          { this.getBody() }
        </Table>
        { deleteWindow }
      </div>
    )
  }
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  tableFields: PropTypes.object.isRequired,
  selection: PropTypes.array,
  selectedItems: PropTypes.array,
  getItemTitle: PropTypes.func,
  heading: PropTypes.bool,
  select: PropTypes.func,
  isDeleteWindowOpen: PropTypes.bool,
  closeDeleteWindow: PropTypes.func,
  confirmDelete: PropTypes.func
}

export default TableComponent