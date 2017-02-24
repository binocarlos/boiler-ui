const LIST = [{

  title: 'Folder',
  type: 'folder',
  icon: 'folder',
  children: true,
  hasPrice: false

}, {

  title: 'Template',
  type: 'template',
  icon: 'template',
  unitGroup: 'all',
  canLink: true

}, {

  title: 'Labour',
  type: 'labour',
  icon: 'labour',
  unitGroup: 'time'

}, {

  title: 'Material',
  type: 'material',
  icon: 'material',
  unitGroup: 'item'

}]

const SETTINGS = LIST.reduce((all, item) => {
  all[item.type] = item
  return all
}, {})

const getItem = (type) => (LIST.filter(item => item.type == type)[0] || {})
const resources = {
  list: LIST,
  settings: SETTINGS,
  getItem,
  isLeaf: (type) => {
    const item = getItem(type)
    return item.children ? false : true
  }
}

export default resources