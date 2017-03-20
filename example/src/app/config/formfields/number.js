import React, { PropTypes, Component } from 'react'

import Text from 'boiler-ui/lib/utils/formfields/text'

const NumberField = (opts = {}) => {
  return Text({
    name: opts.name,
    getname: opts.name + '_raw',
    align: 'right',
    title: opts.title || 'Field'
  })
}

export default NumberField