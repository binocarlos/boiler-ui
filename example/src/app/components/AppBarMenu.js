import React, { Component, PropTypes } from 'react'
import { NavDrawer } from 'react-toolbox/lib/layout'

import UserFilter from 'boiler-ui/lib/containers/UserFilter'
import IconMenu from 'boiler-ui/lib/components/IconMenu'

import {
  user as userMenu,
  guest as guestMenu
} from '../config/appbar_menu'

export class GuestMenu extends Component {
  render() {
    return (
      <IconMenu 
        items={guestMenu}
        hide={this.props.hide}
        redirect={this.props.redirect}
        white
      />
    )
  }
}

export class UserMenu extends Component {
  render() {
    return (
      <IconMenu 
        items={userMenu}
        hide={this.props.hide}
        redirect={this.props.redirect}
        white
      />
    )
  }
}

class AppBarMenu extends Component {
  render() {
    return (
      <UserFilter
        user={ UserMenu }
        guest={ GuestMenu }
        injectRedirect={true}
      />
    )
  }
}

export default AppBarMenu