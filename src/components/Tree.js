import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'react-toolbox/lib/list'
import Avatar from 'react-toolbox/lib/avatar'
import FontIcon from 'react-toolbox/lib/font_icon'
import {IconButton} from 'react-toolbox/lib/button'
import theme from './themes/Tree.scss'

class TreeComponent extends Component {

  isNodeOpen(id) {
    const toggleState = this.props.toggleState[id]

    // by default the root node is open
    if(id == 'root' && typeof(toggleState) == 'undefined') return true

    return toggleState ? true : false
  }

  getItems(item, level = 0) {
    const toggleState = this.props.toggleState

    item = Object.assign({}, item, {
      level
    })
    let children = []

    if(toggleState[item.id]) {
      children = (item.children || []).reduce((all, child) => {
        return all.concat(this.getItems(child, level + 1))
      }, [])
    }

    return [item].concat(children)
  }

  render() {

    const rootLevel = this.props.title ? 1 : 0
    
    const rootItems = this.props.data.reduce((all, item) => {
      return all.concat(this.getItems(item, rootLevel))
    }, [])

    let allItems = []

    if(this.props.title) {
      let rootNode = {
        id: 'root',
        name: this.props.title,
        type: 'disk',
        level: 0,
        children: []
      }

      allItems.push(rootNode)

      // if the root is open then add the folders
      if(this.isNodeOpen('root')) {
        allItems = allItems.concat(rootItems)
        rootNode.children = rootItems
      }
    }
    else {
      allItems = rootItems
    }

    const listItems = allItems.map((item, i) => {
      const title = this.props.getItemTitle(item)
      const isOpen = this.isNodeOpen(item.id)
      const rightIcon = isOpen ?
        'arrow_drop_up' :
        'arrow_drop_down'

      const arrowButton = item.children.length > 0 ?
        (
          <IconButton key="toggle" icon={rightIcon} onClick={() => this.props.toggle(item.id, isOpen ? false : true)}/>
        ) :
        null

      const leftIcon = 
        (
          <FontIcon style={item.id == this.props.active ? {color: 'deepskyblue'} : {}} value={this.props.getIcon(item)} />
        )

      const listItem = (
        <ListItem
          selectable={true}
          ripple={true}
          className='selectedTreeItem'
          caption={title}
          leftIcon={leftIcon}
          onClick={() => this.props.view(item.id)}
          rightActions={[arrowButton]}
        />
      )

      const config = this.props.config || {}

      let listNode = listItem

      const NodeWrapper = config.NodeWrapper

      if(NodeWrapper) {
        listNode = (
          <NodeWrapper
            item={ item }
            config={ config }
          >
            { listItem }
          </NodeWrapper>
        )
      }

      return (
        <div key={i} style={{paddingLeft: (item.level * 10) + 'px'}}>
          { listNode }
        </div>
      )
    })

    return (
      <List>
        {listItems}
      </List>
    )
  }
}

TreeComponent.propTypes = {
  data: PropTypes.array.isRequired,
  view: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleState: PropTypes.object.isRequired,
  getItemTitle: PropTypes.func.isRequired,
  getIcon: PropTypes.func.isRequired
}

export default TreeComponent