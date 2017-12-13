const projectStatuses = Object.freeze([
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
])

const projectRefineStatusOptions = projectStatuses.slice()
projectRefineStatusOptions.unshift('any')

const projectRefineTabOptions = Object.freeze([
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
  projectStatuses,
  projectRefineStatusOptions,
  projectRefineTabOptions
}
