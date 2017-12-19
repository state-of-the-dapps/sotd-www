const dappStatuses = Object.freeze([
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
])

const dappRefineStatusOptions = dappStatuses.slice()
dappRefineStatusOptions.unshift('any')

const dappRefineTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

const eventRefineTabOptions = Object.freeze([
  'ico',
  'hackathon'
])

export {
  eventRefineTabOptions,
  dappStatuses,
  dappRefineStatusOptions,
  dappRefineTabOptions
}
