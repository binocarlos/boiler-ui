import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'
import { Button } from 'react-toolbox/lib/button'
import Tooltip from 'react-toolbox/lib/tooltip'
import Navigation from 'react-toolbox/lib/navigation'

import IconBadge from 'boiler-ui/lib/components/IconBadge'

import icons from '../icons'

const TooltipButton = Tooltip(Button)

const PROJECT_TABLE = {
  schema: {
    name: {type: String},
    client: {type: String},
    actions: {}
  },
  map: (props) => (item, i) => {
    const clients = props.clients
    const client = clients[item.clientid] || {}

    return {
      id: item.id,
      name: (
        <IconBadge
          name={item.name}
          icon={icons.project}
        />
      ),
      client: client.name,
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
          </Navigation>
        </div>
      )
    }
  }
}

export default PROJECT_TABLE