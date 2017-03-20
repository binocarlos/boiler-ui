import React, { Component, PropTypes } from 'react'

import FormPlugin from 'boiler-ui/lib/containers/FormPlugin'
import FormToolbar from 'boiler-ui/lib/components/toolbars/Form'

import formfields from '../config/formfields'
import icons from '../config/icons'
import plugins from '../plugins'

class BookingForm extends Component {
  render() {
    return (
      <FormPlugin 
        selector={plugins.booking.form.selectors.container}
        dispatcher={plugins.booking.form.actions.dispatcher}
        getFormFields={formfields.booking}
        getIcon={() => icons.booking}
        getItemTitle={plugins.booking.getItemTitle}
        getMainTitle={plugins.booking.getFormTitle}
        getButtons={(props) => (<FormToolbar {...props} />)}
      />
    )
  }
}

export default BookingForm