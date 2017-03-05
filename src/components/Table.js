import React, { Component, PropTypes } from 'react'

import Table from 'react-toolbox/lib/table'
import Dialog from 'react-toolbox/lib/dialog'

const defaultGetTitle = (item) => (item || {}).name

class TableComponent extends Component {

  render() {

    const data = this.props.data
    const selectedItems = this.props.selectedItems
    const selectedIds = selectedItems.map(item => item.id)
    const tableFields = this.props.tableFields

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

    return (
      <div style={{height:'100%'}}>
        <Table
          heading={ this.props.heading }
          model={ tableFields }
          onSelect={ this.props.select }
          selectable={ data.length > 0 }
          multiSelectable
          selected={ this.props.selection }
          theme={ this.props.theme }
          source={ data }
        />
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