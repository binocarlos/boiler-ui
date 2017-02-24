import immutable from 'object-path-immutable'

// utility model to represent an array of form schema fields
// the only state a schema object keeps is about it's fields
// no data or meta is kept internally
const Schema = (fields = [], settings = {}) => {

  const overallValidate = settings.validate

  const getDefaultField = () => {
    return {
      touched: false,
      error: null
    }
  }
  // inject the initial value yielded by each field
  const fieldMap = fields.reduce((all, field) => {
    all[field.name] = field
    return all
  }, {})

  const getInitialData = (data = {}) => {
    return fields.reduce((all, field) => {
      if(!field.getInitial) return all
      const currentValue = field.get(data)
      if(typeof(currentValue) != 'null' && typeof(currentValue) != 'undefined') return all
      const initialValue = field.getInitial(data)
      return field.set(field.getInitial(data), all)
    }, data)
  }

  // generate a meta report based on the given data/meta
  const getMeta = (data = {}, meta = {}) => {
    const fieldMeta = fields.reduce((all, field) => {
      let fieldMeta = Object.assign({}, all[field.name] || getDefaultField())
      const currentValue = field.get(data)
      const error = field.validate ?
        field.validate(currentValue, data) :
        null

      fieldMeta.error = error

      all[field.name] = fieldMeta

      return all
    }, Object.assign({}, meta.fields))

    let overallError = overallValidate ?
      overallValidate(data) :
      null
    
    return {
      custom_error: overallError,
      form_touched: meta.form_touched ? true : false,
      fields: fieldMeta
    }
  }

  // inject the new value and return new data and meta
  const updateField = (name, value, data = {}, meta = {}) => {
    const field = fieldMap[name]
    if(!field) throw new Error('field ' + name + ' not found')
    const updatedData = field.set(value, data)
    return {
      data: updatedData,
      meta: getMeta(updatedData, meta)
    }
  }

  // update a field meta as touched
  const touchField = (name, meta = {}) => {
    const fields = meta.fields || {}
    const fieldMeta = Object.assign({}, fields[name] || getDefaultField(), {
      touched: true
    })
    return immutable.set(meta, 'fields.' + name, fieldMeta)
  }

  const touchForm = (meta = {}) => {
    return Object.assign({}, meta, {
      form_touched: true
    })
  }

  const compareField = (name, value, data = {}) => {
    const field = fieldMap[name]
    if(!field) throw new Error('field ' + name + ' not found')
    return field.compare(field.get(data), value)
  }

  return {
    initialData: getInitialData,
    meta: getMeta,
    update: updateField,
    touch: touchField,
    touchForm: touchForm,
    compare: compareField
  }
}

export default Schema