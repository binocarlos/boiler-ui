import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TreePlugin from 'boiler-ui/lib/containers/TreePlugin'
import TreeLayout from 'boiler-ui/lib/components/TreeLayout'
import TreeDivider from 'boiler-ui/lib/components/TreeDivider'

import icons from '../config/icons'
import plugins from '../plugins'

const getTree = (opts = {}) => {
  return (
    <TreePlugin       
      title={opts.title}
      selector={opts.selector}
      dispatcher={opts.dispatcher}
      getIcon={plugins.resource.getIcon}
      getItemTitle={plugins.resource.getItemTitle}
    />
  )
}

class ResourceTree extends Component {
  render() {

    const userResourceTree = getTree({
      title: 'Your library',
      selector: plugins.resource.usertree.selectors.container,
      dispatcher: plugins.resource.usertree.actions.dispatcher
    })

    const systemResourceTree = getTree({
      title: 'System library',
      selector: plugins.resource.systemtree.selectors.container,
      dispatcher: plugins.resource.systemtree.actions.dispatcher
    })

    const tree = (
      <div>
        {userResourceTree}
        <TreeDivider />
        {systemResourceTree}
      </div>
    )

    return (
      <TreeLayout tree={tree}>
        {this.props.children}
      </TreeLayout>
    )
  }
}

export default connect(
  (state) => {
    //const active = state.router.params.parentid
    return {
      active: null
    }
  }
)(ResourceTree)