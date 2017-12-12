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

let statusDappsStatusList = initialDappsStatusList.slice()
statusDappsStatusList.unshift('any')

export const dappsStatusList = initialDappsStatusList

export const dappsStatusOptions = statusDappsStatusList

export const dappsTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

export const eventsTabOptions = Object.freeze([
  'ico',
  'hackathon'
])
