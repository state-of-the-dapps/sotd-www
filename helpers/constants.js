<<<<<<< HEAD
const projectStatuses = Object.freeze([
=======
const initialDappsStatusList = Object.freeze([
>>>>>>> master
  'live',
  'demo',
  'prototype',
  'wip',
  'concept',
  'stealth',
  'unknown',
  'abandoned'
])

<<<<<<< HEAD
const projectRefineStatusOptions = projectStatuses.slice()
projectRefineStatusOptions.unshift('any')

const projectRefineTabOptions = Object.freeze([
=======
let refineDappsStatusList = initialDappsStatusList.slice()
refineDappsStatusList.unshift('any')

export const dappsStatusList = initialDappsStatusList

export const dappsRefineOptions = refineDappsStatusList

export const dappsCategoryOptions = Object.freeze([
>>>>>>> master
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])
<<<<<<< HEAD

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
=======
>>>>>>> master
