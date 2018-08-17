const dappCategoryTagsMap = Object.freeze({
  'social': ['social', 'chat', 'message', 'messaging', 'community', 'communication', 'charity', 'donate', 'gift', 'giving', 'marriage', 'relationship', 'sexuality', 'sex'],
  'development': ['development', 'coding', 'building', 'code', 'tools', 'deployment', 'programming', 'api', 'solidity'],
  'energy': ['energy', 'solar', 'green', 'environment', 'sustainability'],
  'exchanges': ['exchange', 'exchanges', 'market', 'markets', 'marketplace', 'trading', 'trade'],
  'finance': ['crowdfund', 'crowdfunding', 'crowdsourcing', 'derivative', 'finance', 'finances', 'fundraising', 'money', 'wealth', 'loan', 'borrow'],
  'gambling': ['casino', 'gamble', 'gambling', 'lottery', 'chance'],
  'games': ['boardgame', 'game', 'games', 'collectible', 'collectibles', 'video-games'],
  'governance': ['legal', 'dao', 'organization', 'governance', 'vote', 'voting', 'poll', 'election'],
  'health': ['health', 'medical', 'healthcare', 'fitness'],
  'identity': ['identity', 'kyc', 'identification', 'profiles'],
  'insurance': ['insurance', 'claims', 'indemnity', 'provision'],
  'media': ['music', 'music-platform', 'video', 'photography', 'media', 'art', 'publishing', 'advertising'],
  'property': ['property', 'real-estate', 'rent', 'rental', 'provenance', 'supply', 'supply-chain'],
  'security': ['security', 'protection', 'privacy', 'encryption', 'vpn', 'safety', 'cryptography', 'anti-fraud', 'anti-virus', 'cryptographic', 'kyc'],
  'storage': ['storage', 'sharing', 'cloud', 'data', 'file', 'backup'],
  'wallet': ['wallet', 'browser', 'lightwallet', 'multisig', 'keys']
})

const dappGameTag = 'game'

const dappListDefaultLimit = 50

const dappListDefaultSort = 'rank'

const dappListDefaultOrder = 'asc'

const dappPromotedSlots = 3

const dappMetaBadges = [
  'rank',
  'users_1d',
  'users_7d',
  'users_30d',
  'tx_1d',
  'tx_7d',
  'tx_30d',
  'value_1d',
  'value_7d',
  'value_30d',
  'status',
  'feedback'
]

const dappSchema = Object.freeze({
  authors: [],
  badges: [],
  contracts: [],
  contractsMainnet: [],
  contractsKovan: [],
  contractsRinkeby: [],
  contractsRopsten: [],
  contractsAdditionalMainnet: [],
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

const dappBadgeMap = Object.freeze({
  '0x': {
    component: 'SvgBadge0x',
    description: '0x protocol compatible'
  },
  'complete': {
    component: 'SvgBadgeComplete',
    description: 'Has a complete profile'
  },
  'consensys': {
    component: 'SvgBadgeConsensys',
    description: 'Part of <a href="https://new.consensys.net/" target="_blank">Consensys</a>'
  },
  'featured': {
    component: 'SvgBadgeFeatured',
    description: 'Currently featured'
  },
  'hot': {
    component: 'SvgBadgeHot',
    description: 'Currently hot'
  },
  'metamask': {
    component: 'SvgBadgeMetamask',
    description: 'Works with <a href="https://www.metamask.io" target="_blank">Metamask</a>'
  },
  'solidified': {
    component: 'SvgBadgeSolidified',
    description: 'Audited by <a href="https://solidified.io/" target="_blank">Solidified</a>'
  },
  'status-im': {
    component: 'SvgBadgeStatus',
    description: 'On <a href="https://status.im/" target="_blank">Status.im</a>'
  },
  'token': {
    component: 'SvgBadgeToken',
    description: 'Has a token'
  }
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

const myListLimit = 50

export {
  dappCategoryTagsMap,
  dappBadgeMap,
  dappGameTag,
  dappListDefaultLimit,
  dappListDefaultSort,
  dappListDefaultOrder,
  dappMetaBadges,
  dappPromotedSlots,
  dappRefineStatusOptions,
  dappRefineTabOptions,
  dappSchema,
  dappSocialComponentMap,
  dappStatuses,
  daysOfTheWeek,
  eventCategories,
  eventRefineCategoryOptions,
  feedbackComponentMap,
  myListLimit
}
