import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'react-toolbox/lib/list'
import Dialog from 'react-toolbox/lib/dialog'
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio'

import SearchPlugin from 'boiler-ui/lib/containers/SearchPlugin'

import plugins from '../plugins'
const plugin = plugins.resource

const STYLES = {
  body: {
    minHeight: '300px',
    maxHeight: '300px'
  },
  content: {
    overflowY: 'auto',
    maxHeight: '150px'
  }
}

class ResourceFinder extends Component {
  render() {
    return (
      <Dialog
        active={this.props.windowOpen}
        onEscKeyDown={this.props.closeWindow}
        onOverlayClick={this.props.closeWindow}
        title='Find resources...'
      >
        <div style={STYLES.body}>
          <RadioGroup name='library' value={this.props.library || 'user'} onChange={this.props.setLibrary}>
            <RadioButton label='Your Library' value='user'/>
            <RadioButton label='System Library' value='system'/>
          </RadioGroup>
          <SearchPlugin
            selector={plugin.finder.selectors.search.container}
            dispatcher={plugin.finder.actions.search.dispatcher}
          />
          <div style={STYLES.content}>
            <List selectable ripple>
              {
                this.props.data.map((item, i) => {
                  const resourcePrice = 0
                  const price = 0
                  const unit = 'unit'
                  
                  const summary = (
                    <div>
                      { price } { unit }
                    </div>
                  )
                  return (
                    <ListItem 
                      caption={item.name}
                      legend={summary}
                      leftIcon={plugin.getIcon(item)}
                      rightIcon='send'
                      onClick={() => this.props.submit(item)}
                      key={i}
                    />
                  )
                })
              }
            </List>
          </div>
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => plugin.finder.selectors.container(state)

const mapDispatchToProps = (dispatch, ownProps) => plugin.finder.actions.dispatcher(dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceFinder)