import React, { Component, PropTypes } from 'react'

import FormPlugin from 'boiler-ui/lib/containers/FormPlugin'
import FormToolbar from 'boiler-ui/lib/components/toolbars/Form'

import formfields from '../config/formfields'
import icons from '../config/icons'
import plugins from '../plugins'

class ClientForm extends Component {
  render() {
    return (
      <FormPlugin 
        selector={plugins.client.form.selectors.container}
        dispatcher={plugins.client.form.actions.dispatcher}
        getFormFields={formfields.client}
        getIcon={() => icons.client}
        getItemTitle={plugins.client.getItemTitle}
        getMainTitle={plugins.client.getFormTitle}
        getButtons={(props) => (<FormToolbar {...props} />)}
      />
    )
  }
}

export default ClientForm