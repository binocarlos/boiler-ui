import Text from 'boiler-ui/lib/utils/schema/text'
import Num from 'boiler-ui/lib/utils/schema/number'
import Raw from 'boiler-ui/lib/utils/schema/raw'

import units from './units'
import resourceConfig from './resources'

const resourceFields = (data) => {
  const desc = resourceConfig.settings[data.type] || {}
  const unitGroup = desc.unitGroup
  const defaultUnit = units.defaults[unitGroup]

  return [
    Text({
      name: 'name',
      required: true
    }),
    Text({
      name: 'type',
      required: true
    }),
    Num({
      name: 'meta.price',
      required: true
    }),
    Text({
      name: 'meta.unit',
      required: true,
      initialValue: defaultUnit
    })
  ]
}

const templateFields = (data) => {
  const baseFields = resourceFields(data)

  const templateFields = baseFields.concat([
    Raw({
      name: 'calculated_price',
      initialValue: []
    }),
    Raw({
      name: 'links',
      initialValue: []
    })
  ])

  return templateFields
}

const RESOURCES = {
  labour: (data) => resourceFields(data),
  material: (data) => resourceFields(data),
  template: (data) => templateFields(data),
  default: (data) => [
    Text('name')
  ]
}

const SCHEMAS = {

  login: () => {
    return [
      Text({
        name: 'email',
        required: true
      }),
      Text({
        name: 'password',
        required: true,
        minLength: 4
      })
    ]
  },

  register: () => {
    return [
      Text({
        name: 'email',
        required: true
      }),
      Text({
        name: 'password',
        required: true,
        minLength: 4
      })
    ]
  },

  installation: () => {
    return [
      Text({
        name: 'name',
        required: true
      }),
      Text({
        name: 'meta.currency',
        initialValue: '£'
      })
    ]
  },

  client: () => {
    return [
      Text({
        name: 'meta.name',
        required: true
      }),
      Text({
        name: 'email',
        required: true
      }),
      Text({
        name: 'password',
        required: true,
        minLength: 4
      })
    ]
  },

  resource: (data) => {
    const fn = RESOURCES[data.type] || RESOURCES.default
    return fn(data)
  },

  project: () => {
    return [
      Text({
        name: 'name',
        required: true
      }),
      Text({
        name: 'clientid',
        required: true
      })
    ]
  }
}

export default SCHEMAS