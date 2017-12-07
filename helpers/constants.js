const initialDappsStatusList = Object.freeze([
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
])

let refineDappsStatusList = initialDappsStatusList.slice()
refineDappsStatusList.unshift('any')

export const dappsStatusList = initialDappsStatusList

export const dappsRefineOptions = refineDappsStatusList

export const dappsCategoryOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

export const eventsCategoryOptions = Object.freeze([
  'ico',
  'hackathon'
])
