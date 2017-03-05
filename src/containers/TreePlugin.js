import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Layout, Panel } from 'react-toolbox/lib/layout'

import Tree from '../components/Tree'
import SideDrawer from '../components/SideDrawer'

import {
  getItemTitle
} from '../utils/toolbar'

const defaultGetTitle = getItemTitle('name')

class TreePlugin extends Component {
  render() {
    return (
      <Tree 
        title={this.props.title}
        data={this.props.data}
        active={this.props.active}
        view={this.props.view}
        toggle={this.props.toggle}
        toggleState={this.props.toggleState}
        getItemTitle={this.props.getItemTitle}
        getIcon={this.props.getIcon}
        config={this.props.config}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ownProps.selector(state)
const mapDispatchToProps = (dispatch, ownProps) => ownProps.dispatcher(dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreePlugin)