import React, { Component, PropTypes } from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Page from '../Page'

class PageLayout extends Component {

  render() {

    return (
      <Layout>
        {this.props.toolbar}
        <Panel bodyScroll={ true }>
          {this.props.children}
        </Panel>
      </Layout>
    )
  }
}

export default PageLayout