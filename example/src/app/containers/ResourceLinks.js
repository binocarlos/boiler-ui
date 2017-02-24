import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import update from 'immutability-helper'

import Navigation from 'react-toolbox/lib/navigation'
import {Button} from 'react-toolbox/lib/button'
import Chip from 'react-toolbox/lib/chip'
import Table from 'react-toolbox/lib/table'

import {
  processNumber
} from 'boiler-ui/lib/tools'

import IconBadge from 'boiler-ui/lib/components/IconBadge'

import resources from '../config/resources'
import icons from '../config/icons'
import plugins from '../plugins'

import table from '../config/tables/resource_links'

import theme from '../theme/colors'

const plugin = plugins.resource

class ResourceLinks extends Component {
  render() {
    
    const links = this.props.value || []

    const mapProps = {
      getIcon: plugin.getIcon,
      deleteLink: (id) => this.props.deleteLink(links, id),
      updateLinkCount: (id, count) => this.props.updateLinkCount(links, id, count)
    }

    const mapfn = table.map(mapProps)
    const data = links.map(mapfn)

    return (
      <div>
        <Navigation>
          <Button icon='add' raised label='Add Resources' onClick={() => this.props.addClick()} />
        </Navigation>
        <div>
          <Table
            heading={ true }
            model={ table.schema }
            selectable={ false }
            source={ data }
          />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addClick: () => {
      dispatch(plugin.finder.actions.window.open())
    },
    deleteLink: (links, id) => {
      const newLinks = links.filter(link => link.id != id)
      dispatch(plugin.userform.actions.fields.update('links', newLinks))
    },
    updateLinkCount: (links, id, count) => {
      const newLinks = links.map(link => {
        if(link.id != id) return link
        return update(link, {
          meta: {
            count_text: {
              $set: count
            },
            count_number: {
              $set: processNumber(count)
            }
          }
        })
      })
      dispatch(plugin.userform.actions.fields.update('links', newLinks))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceLinks)