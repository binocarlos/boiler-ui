import React, { Component, PropTypes } from 'react'

import FormPlugin from 'boiler-ui/lib/containers/FormPlugin'
import FormToolbar from 'boiler-ui/lib/components/toolbars/Form'

import formfields from '../config/formfields'
import icons from '../config/icons'
import plugins from '../plugins'

class InstallationForm extends Component {
  render() {
    return (
      <FormPlugin 
        selector={plugins.installation.form.selectors.container}
        dispatcher={plugins.installation.form.actions.dispatcher}
        getFormFields={formfields.installation}
        getIcon={() => icons.installation}
        getItemTitle={plugins.installation.getItemTitle}
        getMainTitle={plugins.installation.getFormTitle}
        getButtons={(props) => (<FormToolbar {...props} />)}
      />
    )
  }
}

export default InstallationForm