import Text from 'boiler-ui/lib/utils/schema/text'
import Num from 'boiler-ui/lib/utils/schema/number'
import Raw from 'boiler-ui/lib/utils/schema/raw'

import defaults from './defaults'

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

  booking: () => {
    return [
      Text({
        name: 'name',
        required: true
      })
    ]
  }
}

export default SCHEMAS