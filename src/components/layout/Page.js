import React, { Component, PropTypes } from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Page from '../Page'

class PageLayout extends Component {

  render() {

    return (
      <Panel>
        {this.props.toolbar}
        <Page padding={0}>
          {this.props.children}
        </Page>
      </Panel>
    )
  }
}

export default PageLayout