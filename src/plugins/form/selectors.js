import {
  doesFormHaveError
} from '../../utils/formfields/tools'

export const FormSelectors = (raw) => {
  const selectors = {
    fields: (state) => raw(state).fields,
    hasError: (state) => {
      const fieldState = selectors.fields(state)
      return doesFormHaveError(fieldState.meta)
    },
    container: (state) => {
      const formState = selectors.fields(state)
      return {
        valid: doesFormHaveError(formState.meta) ? false : true,
        form_touched: formState.meta.form_touched,
        data: formState.data,
        meta: formState.meta,
        originalData: formState.originalData
      }
    }
  }

  return selectors
}

export default FormSelectors