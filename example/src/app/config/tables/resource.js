import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'
import { Button } from 'react-toolbox/lib/button'
import Tooltip from 'react-toolbox/lib/tooltip'
import Navigation from 'react-toolbox/lib/navigation'

import IconBadge from 'boiler-ui/lib/components/IconBadge'

import icons from '../icons'
import resources from '../resources'

import theme from '../../theme/colors'


const TooltipButton = Tooltip(Button)

const RESOURCE_TABLE = {
  schema: {
    name: {type: String},
    type: {type: String},
    price: {type: String},
    unit: {type: String},
    actions: {}
  },
  sort: (props) => (data) => {
    const folders = data.filter(item => item.type == 'folder')
    const rest = data.filter(item => item.type != 'folder')

    return folders.concat(rest)
  },
  map: (props) => (item, i) => {

    const typeSettings = resources.settings[item.type] || {}
    const resourcePrice = calculators.resourcePrice({ resource: item }) || '0'

    return {
      id: item.id,
      name: (
        <IconBadge
          name={item.name}
          icon={props.getIcon(item)}
          className={ item.type == 'folder' ? theme.folderIcon : theme.resourceIcon }
        />
      ),
      type: item.type,
      price: 0,
      unit: 'unit',
      actions: (
        <div style={{
          display: 'flex',
          justifyContent: 'left'
        }}>
          <Navigation type='horizontal'>
            {
              props.readonly ? 
                null : 
                (
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
                )
            }
            
            <TooltipButton 
              tooltip={props.readonly ? 'View' : 'Edit'}
              ripple={false}
              icon={props.readonly ? 'visibility' : 'create'}
              floating
              mini 
              onClick={() => {
                props.edit(item.id)
              }} />
                
            {
              resources.isLeaf(item.type) ?
                null :
                (
                  <TooltipButton 
                    tooltip='Open'
                    ripple={false}
                    icon='folder_open'
                    floating
                    mini 
                    onClick={() => {
                      props.open(item.id)
                    }} />
                )
            }
            
          </Navigation>
        </div>
      )
    }
  }
}

export default RESOURCE_TABLE