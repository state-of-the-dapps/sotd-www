export const browseCategoryOptions = [
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
]

export const dappStatusList = [
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
]

export const browseRefineOptions = function () {
  let options = dappStatusList
  options.unshift('any')
  return options
}
