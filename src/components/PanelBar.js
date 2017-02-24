import React, { Component, PropTypes } from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import theme from './themes/PanelBar.scss'

class PanelBar extends Component {

  render() {

    return (
      <AppBar 
        theme={theme}
        title={this.props.title}
        flat={this.props.flat}
        leftIcon={this.props.leftIcon}
      >
        {this.props.children}
      </AppBar>
    )
  }

}

export default PanelBar