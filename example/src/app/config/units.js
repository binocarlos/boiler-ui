const TIME_BASED = [{
  value: 'hour', label: 'hour'
},{
  value: 'day', label: 'day'
}]

const ITEM_BASED = [{
  value: 'each', label: 'each'
}, {
  value: 'm', label: 'm'
}, {
  value: 'm2', label: 'm2'
}, {
  value: 'm3', label: 'm3'
}]

const DEFAULTS = {
  time: 'day',
  item: 'each',
  all: 'each'
}

const units = {
  time: TIME_BASED,
  item: ITEM_BASED,
  all: ITEM_BASED.concat(TIME_BASED),
  defaults: DEFAULTS
}

export default units