import React, { Component, PropTypes } from 'react'
import { Menu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'
import { Button } from 'react-toolbox/lib/button'

class ButtonMenu extends Component {

  // TODO: move this into redux?
  state = { active: false };
  handleButtonClick = () => this.setState({ active: !this.state.active });
  handleMenuHide = () => this.setState({ active: false });

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
              key={i} 
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
    const redirect = (path) => () => this.props.redirect ? this.props.redirect(path) : null
    const buttonProps = Object.assign({}, this.props.buttonProps, {
      onClick: this.handleButtonClick
    })

    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <Button {...buttonProps} />
        <Menu position="topLeft" active={this.state.active} onHide={this.handleMenuHide}>
          { this.processItems(this.props.items, redirect) }
        </Menu>
      </div>
    )
  }
}

export default ButtonMenu