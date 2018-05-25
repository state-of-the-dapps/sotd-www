const dappGameTag = 'game'

const dappSchema = Object.freeze({
  authors: [],
  badges: [],
  contracts: [],
  created: '',
  description: '',
  isNew: false,
  isNsfw: false,
  lastUpdated: '',
  license: '',
  logoUrl: '',
  name: '',
  nofollow: false,
  productImage: '',
  relatedDapps: [],
  sites: {
    websiteUrl: '',
    dappUrl: ''
  },
  slug: '',
  socials: [],
  sparklines: {
    transactions: [],
    users: []
  },
  stats: {
    'ctr': 0,
    'positive': 0,
    'negative': 0,
    'neutral': 0,
    'impressions': 0,
    'clicks': 0,
    'dau': 0,
    'mau': 0,
    'tx_1d': 0,
    'tx_30d': 0,
    'tx_7d': 0,
    'wau': 0,
    'qau': 0,
    'tx_90d': 0,
    'flagged': 0,
    'shared': 0,
    'suggested': 0,
    'contract_created': ''
  },
  status: '',
  tags: [],
  teaser: ''
})

const dappBadgeComponentMap = Object.freeze({
  '0x': 'SvgBadge0x',
  'complete': 'SvgBadgeComplete',
  'consensys': 'SvgBadgeConsensys',
  'featured': 'SvgBadgeFeatured',
  'hot': 'SvgBadgeHot',
  'metamask': 'SvgBadgeMetamask',
  'solidified': 'SvgBadgeSolidified',
  'status-im': 'SvgBadgeStatus',
  'token': 'SvgBadgeToken'
})

const dappSocialComponentMap = Object.freeze({
  'chat': 'SvgSocialChat',
  'blog': 'SvgSocialBlog',
  'facebook': 'SvgSocialFacebook',
  'github': 'SvgSocialGithub',
  'gitter': 'SvgSocialGitter',
  'reddit': 'SvgSocialReddit',
  'twitter': 'SvgSocialTwitter'
})

const dappStatuses = Object.freeze([
  'live',
  'beta',
  'prototype',
  'wip',
  'concept',
  'stealth',
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

const feedbackComponentMap = Object.freeze({
  'negative': 'SvgFeedbackNegative',
  'neutral': 'SvgFeedbackNeutral',
  'positive': 'SvgFeedbackPositive'
})

export {
  dappBadgeComponentMap,
  dappGameTag,
  dappRefineStatusOptions,
  dappRefineTabOptions,
  dappSchema,
  dappSocialComponentMap,
  dappStatuses,
  daysOfTheWeek,
  eventCategories,
  eventRefineCategoryOptions,
  feedbackComponentMap
}
