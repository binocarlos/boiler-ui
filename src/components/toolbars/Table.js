import React, { Component, PropTypes } from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import { Button } from 'react-toolbox/lib/button'
import theme from '../themes/PanelBar.css'

import ButtonMenu from '../ButtonMenu'
import GenericToolbar from './Generic'

class TableToolbar extends Component {

  getSingleAddButton() {
    return (
      <Button
        label={ this.props.addTitle }
        icon={ this.props.addIcon }
        onClick={ this.props.add }
        ripple={ false }
      />
    )
  }

  getMultipleAddButton() {
    const addButtons = this.props.addItems.map(button => {
      return [ button[0], button[1], () => this.props.add(button[2]) ]
    })
    return (
      <ButtonMenu
        buttonProps={{
          label: this.props.addTitle,
          icon: this.props.addIcon,
          ripple: false
        }}
        items={addButtons}
      />
    )
  }

  getAddButton() {
    if(!this.props.add) return
    if(this.props.readonly) return
    if(this.props.selectedItems.length > 0) return

    return this.props.addItems ?
      this.getMultipleAddButton() :
      this.getSingleAddButton()
  }

  getActionsButton() {
    let buttonActions = this.props.beforeActions || []
    const selectedItems = this.props.selectedItems

    if(selectedItems.length == 1 && !this.props.readonly) {
      buttonActions.push(['Edit', 'create', () => this.props.edit(selectedItems[0].id)])
    }

    if(selectedItems.length >= 1 && !this.props.readonly) {
      buttonActions.push(['Delete', 'delete', this.props.openDeleteWindow])
    }

    buttonActions = buttonActions.concat(this.props.afterActions || [])

    if(buttonActions.length <= 0) return null
    
    return (
      <ButtonMenu
        redirect={this.props.redirect}
        buttonProps={{
          label: this.props.actionTitle,
          icon: this.props.actionIcon,
          ripple: false
        }}
        items={buttonActions}
      />
    )
  }

  render() {

    return (
      <GenericToolbar
        title={this.props.title}
        icon={this.props.icon}
        rightChildren={this.props.rightChildren}
      >
        <div>
          <div style={{display: 'inline-block'}}>
            {this.props.beforeButtons}
          </div>
          {this.getAddButton()}
          {this.getActionsButton()}
          <div style={{marginLeft:'20px',display: 'inline-block'}}>
            {this.props.afterButtons}
          </div>
        </div>
      </GenericToolbar>
    )
  }

}

TableToolbar.propTypes = {
  actionTitle: PropTypes.string,
  actionIcon: PropTypes.string,
  addTitle: PropTypes.string,
  addIcon: PropTypes.string,
  add: PropTypes.func
}

TableToolbar.defaultProps = {
  actionTitle: 'Actions',
  actionIcon: 'more_vert',
  addTitle: 'Add',
  addIcon: 'add'
}

export default TableToolbar