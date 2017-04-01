import React, { Component, PropTypes } from 'react'
import { Layout, Panel, NavDrawer } from 'react-toolbox/lib/layout'

class TreeLayout extends Component {

  render() {

    return (
      <Layout>
        <NavDrawer 
          width='normal'
          pinned={true}
          clipped={true}
          scrollY
        >
          { this.props.tree }
        </NavDrawer>
        <Panel bodyScroll={ false }>
          { this.props.children }
        </Panel>
      </Layout>
    )
  }
}

export default TreeLayout