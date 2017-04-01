import React, { Component, PropTypes } from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Page from '../Page'

class PageLayout extends Component {

  render() {

    return (
      <div>
        <div style={{display:'fixed'}}>
          {this.props.toolbar}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageLayout