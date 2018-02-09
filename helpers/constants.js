const dappStatuses = Object.freeze([
  'live',
  'beta',
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

const daysOfTheWeek = Object.freeze([
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
])

const eventCategories = Object.freeze([
  'conference',
  'crowdsale',
  'hackathon',
  'ico',
  'meetup',
  'release',
  'summit',
  'workshop'
])

const eventRefineCategoryOptions = eventCategories.slice()
eventRefineCategoryOptions.unshift('all')

export {
  dappStatuses,
  dappRefineStatusOptions,
  dappRefineTabOptions,
  daysOfTheWeek,
  eventCategories,
  eventRefineCategoryOptions
}
