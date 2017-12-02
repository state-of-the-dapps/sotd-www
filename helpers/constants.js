const initialDappsStatusList = [
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
]

let refineDappsStatusList = initialDappsStatusList
refineDappsStatusList.unshift('any')

export const dappsStatusList = initialDappsStatusList

export const dappsRefineOptions = refineDappsStatusList

export const dappsCategoryOptions = [
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
]
