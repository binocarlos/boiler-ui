import {
  getPathnameValue
} from '../tools'


export const getItemTitle = (fieldName = 'name') => getPathnameValue(fieldName)

export const getDeleteTitle = (mainTitle, getTitle, selected, defaultTitle) => {
  if(selected.length <= 0) {
    return defaultTitle || mainTitle
  }
  else if(selected.length == 1) {
    return getTitle(selected[0])
  }
  else {
    return selected.length + ' ' + mainTitle 
  }
}