import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'
import Button from 'react-toolbox/lib/button/Button'
import Tooltip from 'react-toolbox/lib/tooltip'
import Navigation from 'react-toolbox/lib/navigation'

import icons from '../icons'

const TooltipButton = Tooltip(Button)

const BOOKING_TABLE = {
  schema: {
    name: {type: String},
    actions: {}
  },
  map: (props) => (item, i) => {
    
    return {
      id: item.id,
      name: item.name,
      actions: (
        <div style={{
          display: 'flex',
          justifyContent: 'left'
        }}>
          <Navigation type='horizontal'>
            <TooltipButton 
              tooltip='Delete'
              ripple={false}
              icon={ icons.delete }
              floating
              mini 
              onClick={() => {
                props.select([i])
                props.openDeleteWindow()
              }} />
            <TooltipButton 
              tooltip='Edit'
              ripple={false}
              icon={ icons.edit }
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

export default BOOKING_TABLE