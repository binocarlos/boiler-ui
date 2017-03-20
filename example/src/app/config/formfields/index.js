import React, { PropTypes, Component } from 'react'

import Text from 'boiler-ui/lib/utils/formfields/text'
import Raw from 'boiler-ui/lib/utils/formfields/raw'
import Select from 'boiler-ui/lib/utils/formfields/select'
import LoadSelect from 'boiler-ui/lib/utils/formfields/loadselect'

import plugins from '../../plugins'

import STYLES from './styles'
import Num from './number'

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

  booking: () => {
    return [
      Text('name')
    ]
  }
  
}

export default FORMS