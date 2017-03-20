import React, { Component, PropTypes } from 'react'
import { NavDrawer } from 'react-toolbox/lib/layout'

import UserFilter from 'boiler-ui/lib/containers/UserFilter'
import BaseMenu from 'boiler-ui/lib/components/Menu'

import {
  user as userMenu,
  guest as guestMenu
} from '../config/menu'

export class GuestMenu extends Component {
  render() {
    return (
      <BaseMenu 
        items={guestMenu}
        hide={this.props.hide}
        redirect={this.props.redirect}
        ripple={true}
      />
    )
  }
}

export class UserMenu extends Component {
  render() {
    return (
      <BaseMenu 
        items={userMenu}
        hide={this.props.hide}
        redirect={this.props.redirect}
        ripple={true}
      />
    )
  }
}

class Menu extends Component {
  render() {
    return (
      <NavDrawer 
          active={ this.props.isOpen }
          onOverlayClick={ this.props.close }
        >

        <UserFilter
          user={ UserMenu }
          guest={ GuestMenu }
          componentProps={{
            redirect: this.props.redirect
          }}
        />

      </NavDrawer>
    )
  }
}

export default Menu