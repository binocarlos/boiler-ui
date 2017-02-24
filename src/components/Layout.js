import React, { Component, PropTypes } from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Page from './Page'
import SideDrawer from './SideDrawer'
import PanelBar from './PanelBar'

class LayoutComponent extends Component {

  render() {

    const sideDrawerClass = this.props.sideDrawerClass
    const sideDrawerContent = this.props.sideDrawerContent// || sideDrawerClass ? <sideDrawerClass /> : null

    const panelBarClass = this.props.panelBarClass
    const panelBarContent = this.props.panelBarContent
    const panelBarProps = this.props.panelBarProps || {}

    let sideDrawer = null
    let panelBar = null

    if(sideDrawerClass){
      sideDrawer = (
        <sideDrawerClass />
      )
    }
    else if(sideDrawerContent) {
      sideDrawer = (
        <SideDrawer>
          <div>
            {sideDrawerContent}
          </div>
        </SideDrawer>
      ) 
    }

    if(panelBarClass){
      panelBar = (
        <panelBarClass />
      )
    }
    else if(panelBarContent){
      panelBar = (
        <PanelBar {...panelBarProps}>
          {panelBarContent}
        </PanelBar>
      )
    }

    const contentPanel = panelBar ?
      (
        <Panel>
          {panelBar}
          <Page>
            {this.props.children}
          </Page>
        </Panel>
      ) :
      (
        <Panel>
          <Page>
            {this.props.children}
          </Page>
        </Panel>
      )

    return sideDrawer ?
      (
        <Layout>
          {sideDrawer}
          {contentPanel}
        </Layout>
      ) :
      (
        <Layout>
          {contentPanel}
        </Layout>
      )

  }

}

export default LayoutComponent