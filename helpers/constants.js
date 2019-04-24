const dappGameTag = 'game'

const dappListDefaultLimit = 50

const dappListDefaultSort = 'rank'

const dappListDefaultOrder = 'asc'

const dappFeaturedSlots = 4

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

const dappFallbackRedirectPath = '/dapps'

const dappSchema = Object.freeze({
  authors: [],
  badges: [],
  contractsMainnet: [],
  contractsKovan: [],
  contractsRinkeby: [],
  contractsRopsten: [],
  contractsPoaMainnet: [],
  contractsGoChainMainnet: [],
  contractsEosMainnet: [],
  contractsSteemMainnet: [],
  contractsXDaiMainnet: [],
  created: '',
  description: '',
  isNew: false,
  isNsfw: false,
  lastUpdated: '',
  license: '',
  logoUrl: '',
  name: '',
  nofollow: false,
  platform: '',
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
    ctr: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    impressions: 0,
    clicks: 0,
    dau: 0,
    mau: 0,
    tx_1d: 0,
    tx_30d: 0,
    tx_7d: 0,
    wau: 0,
    qau: 0,
    tx_90d: 0,
    flagged: 0,
    shared: 0,
    suggested: 0,
    contract_created: ''
  },
  status: '',
  tags: [],
  teaser: ''
})

const dappBadgeMap = Object.freeze({
  '0x': {
    component: 'IconBadge0x',
    description: '0x protocol compatible'
  },
  complete: {
    component: 'IconBadgeComplete',
    description: 'Has a complete profile'
  },
  consensys: {
    component: 'IconBadgeConsensys',
    description:
      'Part of <a href="https://new.consensys.net/" target="_blank">Consensys</a>'
  },
  featured: {
    component: 'IconBadgeFeatured',
    description: 'Currently featured'
  },
  hot: {
    component: 'IconBadgeHot',
    description: 'Currently hot'
  },
  metamask: {
    component: 'IconBadgeMetamask',
    description:
      'Works with <a href="https://www.metamask.io" target="_blank">Metamask</a>'
  },
  solidified: {
    component: 'IconBadgeSolidified',
    description:
      'Audited by <a href="https://solidified.io/" target="_blank">Solidified</a>'
  },
  'status-im': {
    component: 'IconBadgeStatus',
    description: 'On <a href="https://status.im/" target="_blank">Status.im</a>'
  },
  token: {
    component: 'IconBadgeToken',
    description: 'Has a token'
  }
})

const dappSocialComponentMap = Object.freeze({
  chat: 'IconSocialChat',
  blog: 'IconSocialBlog',
  facebook: 'IconSocialFacebook',
  github: 'IconSocialGithub',
  gitter: 'IconSocialGitter',
  reddit: 'IconSocialReddit',
  twitter: 'IconSocialTwitter'
})

const dappStatuses = Object.freeze([
  'live',
  'beta',
  'prototype',
  'wip',
  'concept',
  'broken',
  'stealth',
  'abandoned'
])

const dappRefineStatusOptions = dappStatuses.slice()
dappRefineStatusOptions.unshift('All statuses')

const dappRefineTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

const dappSortOptions = Object.freeze([
  {
    text: 'Hottest',
    selection: 'hot'
  },
  {
    text: 'Newest',
    selection: 'new'
  }
])

const dappSortOptionsMap = {
  new: 'Newest',
  hot: 'Hottest',
  'most-relevant': 'Hottest'
}

const daysOfTheWeek = Object.freeze([
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
])

const feedbackComponentMap = Object.freeze({
  negative: 'SvgFeedbackNegative',
  neutral: 'SvgFeedbackNeutral',
  positive: 'SvgFeedbackPositive'
})

const homeFeaturedCollections = 3

const homeCollectionSlots = 8

const languages = Object.freeze([
  {
    text: 'English',
    selection: 'en'
  },
  {
    text: 'Deutsch',
    selection: 'de'
  },
  {
    text: '한국어',
    selection: 'ko'
  },
  {
    text: '中文',
    selection: 'zh'
  }
])

const localeStrings = Object.freeze({
  en: `English`,
  de: 'Deutsch',
  ko: '한국어',
  zh: `中文`
})

const newDapps = [
  25,
  1,
  7,
  6,
  22,
  9,
  6,
  17,
  7,
  5,
  11,
  27,
  12,
  23,
  16,
  8,
  14,
  15,
  11,
  6,
  5,
  10,
  22,
  17,
  18,
  65,
  75,
  47,
  67,
  55,
  83,
  67,
  53,
  76,
  137,
  135,
  121,
  142,
  131,
  111,
  120,
  157,
  150,
  141,
  179,
  119,
  116
]

const platforms = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    software: {
      name: 'Metamask',
      url: 'https://metamask.io/?utm_source=StateOfTheDApps'
    },
    contracts: {
      networks: ['mainnet', 'kovan', 'ropsten', 'rinkeby'],
      validations: ['']
    }
  },
  {
    id: 'eos',
    name: 'EOS',
    software: {
      name: 'Scatter',
      url: 'https://get-scatter.com/?utm_source=StateOfTheDApps'
    },
    contracts: {
      networks: ['eosMainnet'],
      validations: ['']
    }
  },
  {
    id: 'gochain',
    name: 'GoChain',
    contracts: {
      networks: ['goChainMainnet'],
      validations: ['']
    }
  },
  {
    id: 'poa',
    name: 'POA',
    //software: {
    //  name: 'Nifty',
    //  url:
    //    'https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid?utm_source=StateOfTheDApps'
    //},
    contracts: {
      networks: ['poaMainnet'],
      validations: ['']
    }
  },
  {
    id: 'steem',
    name: 'Steem',
    software: {
      name: 'Steem Keychain',
      url:
        'https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm?utm_source=StateOfTheDApps'
    },
    contracts: {
      networks: ['steemMainnet'],
      validations: ['']
    }
  },
  {
    id: 'xdai',
    name: 'xDai',
    contracts: {
      networks: ['xDaiMainnet'],
      validations: ['']
    }
  }
]

const platformComputedAddressFields = () => {
  const obj = {}
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        const computedField =
          'contract' + network.charAt(0).toUpperCase() + network.slice(1)
        obj[computedField] = function() {
          return this.$options.filters.linesToArr(
            this.fields.contracts[network].address
          )
        }
        if (
          platform.contracts.validations &&
          platform.contracts.validations.length
        ) {
          obj[network + 'Errors'] = function() {
            return this.errors[network]
          }
        }
      })
    }
  })
  return obj
}

const platformList = () => {
  const list = []
  platforms.map(platform => {
    if (platform.name) {
      list.push(platform.name)
    }
  })
  return list
}

const platformSelectOptions = () => {
  const list = []
  platforms.map(platform => {
    if (platform.name) {
      list.push({
        selection: platform.name,
        text: platform.name
      })
    }
  })
  return list
}

const platformMap = () => {
  const obj = {}
  platforms.map(platform => {
    if (platform.id && platform.name) {
      obj[platform.id] = platform.name
    }
  })
  return obj
}

const platformSoftware = () => {
  const obj = {}
  platforms.map(platform => {
    if (
      platform.name &&
      platform.software &&
      platform.software.name &&
      platform.software.url
    ) {
      obj[platform.name] = {
        name: platform.software.name,
        url: platform.software.url
      }
    }
  })
  return obj
}

const rankingColumns = Object.freeze([
  {
    selection: 'rank',
    text: 'Rank',
    sort: true,
    order: 'asc'
  },
  {
    selection: 'dau',
    text: 'Users (24h)',
    sort: true,
    order: 'desc'
  },
  {
    selection: 'platform',
    text: 'Platform',
    sort: false,
    order: null
  },
  {
    selection: 'category',
    text: 'Category',
    sort: false,
    order: null
  },
  {
    selection: 'usd_value_7d',
    text: 'Volume (7d)',
    sort: true,
    order: 'desc'
  },
  {
    selection: 'dev_30d',
    text: 'Dev activity (30d)',
    sort: true,
    order: 'desc'
  },
  {
    selection: 'user_activity_30d',
    text: 'User activity (30d)',
    sort: false,
    order: null
  }
])

export {
  dappBadgeMap,
  dappFallbackRedirectPath,
  dappGameTag,
  dappListDefaultLimit,
  dappListDefaultSort,
  dappListDefaultOrder,
  dappMetaBadges,
  dappFeaturedSlots,
  dappPromotedSlots,
  dappRefineStatusOptions,
  dappRefineTabOptions,
  dappSchema,
  dappSocialComponentMap,
  dappSortOptions,
  dappSortOptionsMap,
  dappStatuses,
  daysOfTheWeek,
  feedbackComponentMap,
  homeCollectionSlots,
  homeFeaturedCollections,
  languages,
  localeStrings,
  newDapps,
  platformComputedAddressFields,
  platformList,
  platformMap,
  platformSelectOptions,
  platformSoftware,
  rankingColumns
}
