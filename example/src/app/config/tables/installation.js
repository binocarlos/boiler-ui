import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'
import { Button } from 'react-toolbox/lib/button'
import Tooltip from 'react-toolbox/lib/tooltip'
import Navigation from 'react-toolbox/lib/navigation'

import IconBadge from 'boiler-ui/lib/components/IconBadge'

import icons from '../icons'
import plugins from '../../plugins'

const TooltipButton = Tooltip(Button)

const INSTALLATION_TABLE = {
  schema: {
    name: {},
    access: {},
    status: {},
    actions: {}
  },
  map: (props) => (item, i) => {

    const currentInstallation = props.currentInstallation

    const active = item.id == currentInstallation ?
      (
        <Chip>
          <Avatar style={{backgroundColor: 'deepskyblue'}} icon="done" />
          <span>
            active
          </span>
        </Chip>
      ) :
      null

    return {
      id: item.id,
      name: (
        <IconBadge
          name={item.name}
          icon={icons.installation}
        />
      ),
      access: item.permission,
      status: (
        <div style={{
          display: 'flex',
          justifyContent: 'left'
        }}>
          {active}
        </div>
      ),
      actions: (
        <div style={{
          display: 'flex',
          justifyContent: 'left'
        }}>
          <Navigation type='horizontal'>
            <TooltipButton 
              tooltip='Delete'
              ripple={false}
              icon='delete'
              floating
              mini 
              onClick={() => {
                props.select([i])
                props.openDeleteWindow()
              }} />
            <TooltipButton 
              tooltip='Edit'
              ripple={false}
              icon='create'
              floating
              mini 
              onClick={() => {
                props.edit(item.id)
              }} />
            <TooltipButton 
              tooltip='Activate'
              ripple={false}
              icon='forward'
              primary
              floating
              mini 
              onClick={() => {
                props.dispatch(plugins.installationDropdown.actions.trigger(item.id))
              }} />
          </Navigation>
        </div>
      )
    }
  }
}

export default INSTALLATION_TABLE