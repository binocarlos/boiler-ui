import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import SideDrawer from './SideDrawer'

class TreeLayout extends Component {
  render() {
    return (
      <Layout>
        <SideDrawer width={ this.props.width }>
          {this.props.tree}
        </SideDrawer>
        <Panel>
        {this.props.children}
        </Panel>
      </Layout>
    )
  }
}

export default TreeLayout