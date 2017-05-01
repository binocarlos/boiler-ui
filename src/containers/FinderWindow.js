import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'react-toolbox/lib/list'
import Dialog from 'react-toolbox/lib/dialog'
import Navigation from 'react-toolbox/lib/navigation'
import { Button } from 'react-toolbox/lib/button'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

import SearchPlugin from 'boiler-ui/lib/containers/SearchPlugin'

const STYLES = {
  body: {
    minHeight: '300px',
    maxHeight: '300px'
  },
  content: {
    overflowY: 'scroll',
    maxHeight: '185px',
    border: '1px dotted #ccc'
  },
  
  listInfo: {
    width: '400px',
    minWidth: '400px'
  },
  listName: {
    display: 'inline-block',
    width: '200px',
    minWidth: '200px',
    lineHeight: '48px'
  },
  listMeta: {
    display: 'inline-block',
    width: '200px',
    minWidth: '200px',
    lineHeight: '48px'
  },
  folderinfo: {
    display: 'inline-block',
    paddingLeft: '20px',
    color: '#999'
  }
}

class FinderWindow extends Component {

  getListItem(item, i) {

    const plugin = this.props.plugin

    const content = this.props.getContent ?
      this.props.getContent(item, this.props) :
      (
        <div>{item.name}</div>
      )
    return (
      <ListItem 
        itemContent={content}
        leftIcon={this.props.getIcon ? this.props.getIcon(item) : null}
        rightIcon={this.props.rightIcon || 'send'}
        onClick={() => this.props.submit(item)}
        key={i}
      />
    )
  }

  render() {

    const data = this.props.data || []
    const plugin = this.props.plugin

    const getListItem = this.props.getListItem ?
      this.props.getListItem :
      this.getListItem.bind(this)

    return (
      <Dialog
        active={this.props.windowOpen}
        onEscKeyDown={this.props.closeWindow}
        onOverlayClick={this.props.closeWindow}
        title={this.props.title || 'choose item...'}
      >
        <div style={STYLES.body}>
          <SearchPlugin
            selector={plugin.selectors.search.container}
            dispatcher={plugin.actions.search.dispatcher}
          />
          {

            data.length > 0 ?
              (
                <div style={STYLES.content}>
                  <List selectable ripple>
                    {
                      data.map(getListItem)
                    }
                  </List>
                </div>
              ) :
              null
          }
          
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const plugin = ownProps.plugin
  return plugin ?
    plugin.selectors.container(state) :
    {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const plugin = ownProps.plugin
  return plugin ?
    plugin.actions.dispatcher(dispatch) :
    {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinderWindow)