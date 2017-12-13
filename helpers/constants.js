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

let projectsStatusList = initialProjectsStatusList.slice()
projectsStatusList.unshift('any')

export const projectsStatusList = initialProjectsStatusList

export const projectsStatusOptions = projectsStatusList

export const projectsTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

export const eventsTabOptions = Object.freeze([
  'ico',
  'hackathon'
])
