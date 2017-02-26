export const mapFormField = (field, data, meta, originalData, form_touched) => {
  if(!field.get) throw new Error('get method required on field')

  // an object of named fields
  // the group component only renders the child components
  // and does not handle naming or updating
  // the render component will get a group property of the child components
  // (the results of calling getComponent on each child)
  if(field.group) {
    return {
      getComponent: (props) => {
        const groupFields = Object.keys(field.group).reduce((all, name) => {
          const groupField = field.group[name]
          const mappedField = mapFormField(groupField, data, meta, originalData, form_touched)

          const fieldProps = {
            title: mappedField.title,
            error: mappedField.error,
            value: mappedField.value,
            update: value => props.raw_update(groupField.name, value),
            touch: () => props.raw_touch(groupField.name)
          }

          const fieldComponent = mappedField.getComponent(fieldProps)
          all[name] = fieldComponent
          return all
        }, {})

        return field.getComponent(props, groupFields)
      }
    }
  }
  else {
    const value = field.get(data)
    const originalValue = field.get(originalData)
    const hasChanged = field.compare(value, originalValue) ? false : true
    meta = (meta.fields || {})[field.name] || {}
    const error = form_touched || ( hasChanged && meta.touched ) ? meta.error : null
    return {
      getComponent: field.getComponent,
      name: field.name,
      title: field.title,
      value,
      error
    }  
  }

  
}

export const doesFormHaveError = (meta = {}) => {
  return Object.keys(meta.fields || {}).reduce((current, key) => {
    return current || meta.fields[key].error ? true : false
  }, false)
}