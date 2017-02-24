import React, { PropTypes, Component } from 'react'

import Text from 'boiler-ui/lib/utils/formfields/text'
import Raw from 'boiler-ui/lib/utils/formfields/raw'
import Select from 'boiler-ui/lib/utils/formfields/select'
import LoadSelect from 'boiler-ui/lib/utils/formfields/loadselect'

import ResourceLinks from '../containers/ResourceLinks'
import CurrencyTextField from '../containers/CurrencyTextField'

import plugins from '../plugins'
import units from './units'

const priceField = (opts = {}) => {
  return Text({
    name: 'meta.price',
    title: opts.priceTitle || 'Price',
    type: 'number'
  })
}

const unitField = (opts = {}) => {
  return Select({
    name: 'meta.unit',
    title: 'Unit',
    options: opts.units
  })
}

const resourceFields = (opts = {}) => {
  return [
    Text('name'),
    priceField(opts),
    unitField(opts)
  ]
}

const templateFields = (opts = {}) => {
  return [
    Text('name'),
    Text({
      title: 'Price',
      name: 'calculated_price',
      get: (item) => {
        return 0
      },
      getComponent: (props) => {
        props = Object.assign({}, props, {
          readonly: true,
          format: true
        })
        return (
          <CurrencyTextField {...props} />
        )
        
      }
    }),
    priceField({
      priceTitle: opts.priceTitle || 'Per'
    }),
    unitField(opts),
    Raw({
      name: 'links',
      title: 'Resources',
      getComponent: (props) => {
        return (
          <ResourceLinks {...props} />
        )
      }
    })
  ]
}

const RESOURCES = {
  labour: () => resourceFields({ units: units.time }),
  material: () => resourceFields({ units: units.item }),
  template: () => templateFields({ units: units.item }),
  default: () => [
    Text('name')
  ]
}

const FORMS = {

  login: () => {
    return [
      Text('email'),
      Text('password')
    ]
  },

  register: () => {
    return [
      Text('email'),
      Text('password')
    ]
  },

  installation: () => {
    return [
      Text('name'),
      Text({
        title: 'Currency',
        name: 'meta.currency'
      })
    ]
  },

  client: (data, meta) => {

    const exists = data.id ? true : false
    let fields = [
      Text({
        title: 'name',
        name: 'meta.name'
      }),
      Text('email')
    ]

    // TODO - work out how to let the client update their own password
    if(!exists) {
      fields.push(Text('password'))
    }

    return fields
  },

  resource: (data, meta) => {
    const fn = RESOURCES[data.type] || RESOURCES.default
    return fn(data, meta)
  },

  project: () => {
    return [
      Text('name'),
      LoadSelect({
        name: 'clientid',
        title: 'Client',
        selector: plugins.client.table.selectors.items,
        trigger: plugins.client.table.actions.list.request,
        mapOptions: (client) => {
          return {
            value: client.id,
            label: client.name
          }
        }
      })
    ]
  }
  
}

export default FORMS