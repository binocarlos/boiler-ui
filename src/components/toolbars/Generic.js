import React, { Component, PropTypes } from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import { IconButton } from 'react-toolbox/lib/button'

import theme from '../themes/PanelBar.css'

const STYLES = {
  inline: {
    display: 'inline-block'
  },
  fillwidth: {
    width: '100%'
  }
}
// wrapper for a toolbar with title and icon
// the children live inside the Navigation block
class GenericToolbar extends Component {

  render() {

    const title = this.props.title
    const icon = this.props.icon

    return (
      <AppBar 
        theme={theme}
        flat={true}
      >
        <div style={STYLES.fillwidth}>
          <table cellPadding="0" cellSpacing="0" style={STYLES.fillwidth}><tbody><tr>
          <td>
            <div style={STYLES.inline}>
              <IconButton
                inverse
                className={theme.leftIcon}
                icon={icon}
              />
            </div>
            <div style={STYLES.inline}>
              {title && <span className={theme.title}>{title}</span>}
            </div>
            <div style={{display: 'inline-block'}}>
              <Navigation type='horizontal'>
                {this.props.children}
              </Navigation>
            </div>
          </td>
          <td>
            <Navigation type='horizontal'>
              {this.props.rightChildren}
            </Navigation>
          </td>
        </tr></tbody></table>
      </div>
      </AppBar>
    )
  }

}

GenericToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default GenericToolbar