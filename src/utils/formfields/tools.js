export const mapFormField = (field, data, meta, originalData, form_touched) => {
  if(!field.get) throw new Error('get method required on field')

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

export const doesFormHaveError = (meta = {}) => {
  return Object.keys(meta.fields || {}).reduce((current, key) => {
    return current || meta.fields[key].error ? true : false
  }, false)
}