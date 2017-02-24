import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'
import { Button } from 'react-toolbox/lib/button'
import Tooltip from 'react-toolbox/lib/tooltip'
import Navigation from 'react-toolbox/lib/navigation'
import Input from 'react-toolbox/lib/input'

import IconBadge from 'boiler-ui/lib/components/IconBadge'

import icons from '../icons'
import resources from '../resources'

import theme from '../../theme/colors'
import smallinputtheme from '../../theme/smallinput'

const TooltipButton = Tooltip(Button)

const STYLES = {
  right: {
    textAlign: 'right'
  },
  rightnumber: {
    textAlign: 'right',
    minWidth: '60px'
  },
  smallInputWrapper: {
    width: '100px'
  }
}

const RESOURCE_LINKS_TABLE = {
  schema: {
    name: {type: String},
    type: {type: String},
    price: {
      type: String,
      title: (
        <div style={STYLES.rightnumber}>Price</div>
      )
    },
    unit: {
      type: String,
      title: (
        <div style={STYLES.rightnumber}>Unit</div>
      )
    },
    count: {
      type: String,
      title: (
        <div style={STYLES.rightnumber}>Count</div>
      )
    },
    total: {
      type: String,
      title: (
        <div style={STYLES.rightnumber}>Total</div>
      )
    },
    actions: {}
  },
  map: (props) => (link, i) => {
    
    const item = link.resource || {}
    const meta = link.meta || {}

    const count = (
      <div>
        <div style={{width:'100px',float:'right'}}>
          <Input 
            theme={ smallinputtheme }
            type={ 'text' }
            spellCheck={false}
            value={ meta.count_text || '' } 
            onChange={ (val) => {
              props.updateLinkCount(item.id, val)
            } }
          />
        </div>
      </div>
    )

    return {
      id: item.id,
      name: (
        <IconBadge
          name={item.name}
          icon={props.getIcon(item)}
          className={ item.type == 'folder' ? theme.folderIcon : theme.resourceIcon }
        />
      ),
      type: item.type || '',
      count: count,
      price: 0,
      total: 0,
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
                    props.deleteLink(item.id)
                  }} />
                )
            }
          </Navigation>
        </div>
      )
    }
  }
}

export default RESOURCE_LINKS_TABLE