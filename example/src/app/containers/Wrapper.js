import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout'
import AppBar from 'react-toolbox/lib/app_bar'

import actions from '../actions'
import plugins from '../plugins'

import core from '../config/core'

import Menu from '../components/Menu'
import AppBarMenu from '../components/AppBarMenu'

class Wrapper extends Component {

  loadingWrapper() {
    return (
      <Layout>
        <Panel>
          <AppBar
            title={ this.props.pageTitle }
            leftIcon="menu"
          />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            loading...
          </div>
        </Panel>
      </Layout>
    )
  }

  fullWrapper() {
    const menuRedirect = (path) => {
      this.props.redirect(path)
      this.props.closeMenu()
    }
    return (
      <Layout>
        
        <Menu
          isOpen={ this.props.isMenuOpen }
          close={ this.props.closeMenu }
          redirect={ menuRedirect }
        />
        <AppBar
          fixed
          title={ this.props.pageTitle }
          leftIcon="menu"
          onLeftIconClick={ this.props.openMenu }
        >
          <AppBarMenu />
        </AppBar>
        <Panel bodyScroll={ true }>
          { this.props.children }
        </Panel>

        { plugins.snackbar.getContainer() }

      </Layout>
    )
  }
  
  render() {
    return this.props.userLoaded ?
      this.fullWrapper() :
      this.loadingWrapper()
  }
}

const mapStateToProps = (state, ownProps) => {
  const page = state.router.result || {}
  return {
    router: state.router,
    pageTitle: core.title,
    page,
    isMenuOpen: plugins.menu.selectors.open(state),
    loggedIn: plugins.user.selectors.status.loggedIn(state),
    userLoaded: plugins.user.selectors.status.loaded(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openMenu: () => dispatch(plugins.menu.actions.open()),
    closeMenu: () => dispatch(plugins.menu.actions.close()),
    redirect: (path) => dispatch(actions.router.push(path))
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)