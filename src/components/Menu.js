import React, { Component, PropTypes } from 'react'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list'

class Menu extends Component {

  processItems(items, redirect, ripple) {
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
            <ListDivider key={i} />
          )
        }
        else{
          return (
            <ListItem 
              key={item[0]} 
              ripple={ripple}
              caption={item[0]} 
              leftIcon={item[1]} 
              onClick={item[2]}
            />
          )
        }
      })
  }

  render() {
    const redirect = (path) => () => this.props.redirect(path)
    return (
      <List selectable>
        { this.processItems(this.props.items, redirect, this.props.ripple) }
      </List>
    )
  }
}

export default Menu