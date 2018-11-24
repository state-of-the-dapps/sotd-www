import Vue from 'vue'
import NumAbbr from 'number-abbreviate'
import formatDate from 'date-fns/format'
import addMonths from 'date-fns/add_months'
import * as constants from '~/helpers/constants'

Vue.filter('abbreviateNumber', (value, decimals) => {
  if (value) {
    var numAbbr = new NumAbbr()
    var abbreviatedNumber = numAbbr.abbreviate(value, decimals)
    return abbreviatedNumber
  }
})

Vue.filter('formatCategory', value => {
  if (value) {
    var category =
      value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')
    return category
  }
})

Vue.filter('formatDate', (value, format) => {
  if (value) {
    return formatDate(value, format)
  }
})

Vue.filter('addMonths', (value, num) => {
  if (value) {
    return addMonths(value, num)
  }
})

Vue.filter('escapeHtmlTags', value => {
  if (value) {
    return value.replace(/<.+?>/g, '')
  }
})

Vue.filter('capitalize', value => {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
})

Vue.filter('firstLetter', value => {
  if (value) {
    return value.charAt(0)
  }
})

Vue.filter('truncate', (value, length) => {
  if (value) {
    return value.length > length ? value.substr(0, length - 1) + '…' : value
  }
})

Vue.filter('removeEmptyArrayItems', value => {
  var items = value || []
  return items.filter(entry => entry.trim() !== '')
})

Vue.filter('formatDappBadge', value => {
  if (value) {
    let badge = ''
    switch (value) {
      case 'complete':
        badge = 'complete profile'
        break
      case 'metamask':
        badge = 'supports Metamask'
        break
      case 'status-im':
        badge = 'supports Status IM'
        break
      case 'token':
        badge = 'has token'
        break
      default:
        badge = value
    }
    return badge
  }
})

Vue.filter('formatDappStatus', value => {
  if (value) {
    let status = ''
    switch (value) {
      case 'wip':
        status = 'Work in progress'
        break
      default:
        status = value
    }
    return status
  }
})

Vue.filter('formatDappTabOptions', value => {
  var tab = ''
  var options = constants.dappRefineTabOptions || []
  if (options.indexOf(value) !== -1) {
    tab = value.toString().replace('-', ' ')
  } else {
    tab = options[0]
  }
  return tab
})

Vue.filter('formatEventCategory', value => {
  if (value) {
    let category = ''
    switch (value) {
      case 'ico':
        category = 'ICO'
        break
      default:
        category = value
    }
    return category
  }
})

Vue.filter('uppercase', value => {
  if (value) {
    return value.toUpperCase()
  }
})
