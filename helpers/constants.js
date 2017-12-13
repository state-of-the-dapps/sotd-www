const initialProjectsStatusList = Object.freeze([
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
])

const projectsStatusList = initialProjectsStatusList

const projectsStatusRefineOptions = initialProjectsStatusList.slice()
projectsStatusRefineOptions.unshift('any')

const projectsTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

const eventsTabOptions = Object.freeze([
  'ico',
  'hackathon'
])

export {
  eventsTabOptions,
  projectsStatusList,
  projectsStatusRefineOptions,
  projectsTabOptions
}
