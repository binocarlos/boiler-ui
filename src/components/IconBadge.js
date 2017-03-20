import React, { Component, PropTypes } from 'react'
import { IconMenu as UIIconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'
import whitetheme from './themes/IconMenuWhite.css'

const STYLES = {
  container: {
    display: 'flex',
    alignItems: 'center'
  }
}

class IconBadge extends Component {

  render() {
    return (
      <div style={STYLES.container}>
          <Chip>
            <Avatar className={this.props.className} icon={this.props.icon} />
            <span>{this.props.name}</span>
          </Chip>
      </div>
    )
  }
}

export default IconBadge