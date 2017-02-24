import React, { Component, PropTypes } from 'react'
import { IconMenu as UIIconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'
import whitetheme from './themes/IconMenuWhite.scss'

class IconMenu extends Component {

  processItems(items, redirect) {
    const hide = this.props.hide || {}
    return items
      .filter(item => {
        if(typeof(item) == 'string') return item == '-'
        return hide[item[0]] ? false : true
      })
      .map(item => {
        if(typeof(item) == 'string') return item
        if(typeof(item[2]) == 'string') {
          item[2] = redirect(item[2])
        }
        return item
      })
      .map((item, i) => {
        if(typeof(item) == 'string') {
          return (
            <MenuDivider key={i} />
          )
        }
        else{
          return (
            <MenuItem 
              key={item[0]} 
              value={item[0]} 
              caption={item[0]} 
              icon={item[1]} 
              onClick={item[2]}
            />
          )
        }
      })
  }

  render() {
    const redirect = (path) => () => this.props.redirect(path)
    const theme = this.props.white ?
      whitetheme :
      null
    return (
      <UIIconMenu 
        theme={theme} 
        icon={this.props.icon} 
        menuRipple 
        iconRipple
      >
        { this.processItems(this.props.items, redirect, this.props.ripple) }
      </UIIconMenu>
    )
  }
}

IconMenu.propTypes = {
  icon: PropTypes.string
}

IconMenu.defaultProps = {
  icon: 'more_vert'
}

export default IconMenu