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

const platforms = Object.freeze([
  {
    id: 'ethereum',
    name: 'Ethereum',
    software: {
      name: 'Metamask',
      url: 'https://metamask.io/?utm_source=StateOfTheDApps'
    },
    contracts: {
      networks: [
        {
          id: 'mainnet',
          name: 'Mainnet'
        },
        {
          id: 'kovan',
          name: 'Kovan'
        },
        {
          id: 'ropsten',
          name: 'Ropsten'
        },
        {
          id: 'rinkeby',
          name: 'Rinkeby'
        }
      ],
      validations: [
        {
          type: 'minLength',
          value: 42,
          message: 'One of your addresses is not long enough'
        },
        {
          type: 'maxLength',
          value: 42,
          message: 'One of your addresses too long'
        },
        {
          type: 'startsWith',
          value: '0x',
          message: 'Addresses must start with 0x'
        }
      ]
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
      networks: [
        {
          id: 'eosMainnet',
          name: 'Mainnet'
        }
      ],
      validations: [
        {
          type: 'regEx',
          value: /(^[a-z1-5.]{1,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/,
          message: 'One of your addresses is not formatted correctly'
        }
      ]
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
      networks: [
        {
          id: 'steemMainnet',
          name: 'Mainnet'
        }
      ],
      validations: [
        {
          type: 'regEx',
          value: /(^[a-z](-[a-z0-9](-[a-z0-9])*)?(-[a-z0-9]|[a-z0-9])*(?:\.[a-z](-[a-z0-9](-[a-z0-9])*)?(-[a-z0-9]|[a-z0-9])*)*$)/,
          message: 'One of your addresses is not formatted correctly'
        }
      ]
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
      networks: [
        {
          id: 'poaMainnet',
          name: 'Mainnet'
        }
      ],
      validations: [
        {
          type: 'minLength',
          value: 42,
          message: 'One of your addresses is not long enough'
        },
        {
          type: 'maxLength',
          value: 42,
          message: 'One of your addresses too long'
        },
        {
          type: 'startsWith',
          value: '0x',
          message: 'Addresses must start with 0x'
        }
      ]
    }
  },
  {
    id: 'xdai',
    name: 'xDai',
    contracts: {
      networks: [
        {
          id: 'xDaiMainnet',
          name: 'Mainnet'
        }
      ],
      validations: [
        {
          type: 'minLength',
          value: 42,
          message: 'One of your addresses is not long enough'
        },
        {
          type: 'maxLength',
          value: 42,
          message: 'One of your addresses too long'
        },
        {
          type: 'startsWith',
          value: '0x',
          message: 'Addresses must start with 0x'
        }
      ]
    }
  },
  {
    id: 'klaytn',
    name: 'Klaytn',
    contracts: {
      networks: [
        {
          id: 'klaytnMainnet',
          name: 'Mainnet'
        }
      ],
      validations: [
        {
          type: 'minLength',
          value: 42,
          message: 'One of your addresses is not long enough'
        },
        {
          type: 'maxLength',
          value: 42,
          message: 'One of your addresses too long'
        },
        {
          type: 'startsWith',
          value: '0x',
          message: 'Addresses must start with 0x'
        }
      ]
    }
  },
  {
    id: 'loom',
    name: 'Loom',
    contracts: {
      networks: [
        {
          id: 'loomPlasmaChain',
          name: 'PlasmaChain'
        },
        {
          id: 'loomDAppChain',
          name: 'DAppChain'
        }
      ],
      validations: [
        {
          type: 'minLength',
          value: 42,
          message: 'One of your addresses is not long enough'
        },
        {
          type: 'maxLength',
          value: 42,
          message: 'One of your addresses too long'
        },
        {
          type: 'startsWith',
          value: '0x',
          message: 'Addresses must start with 0x'
        }
      ]
    }
  },
  {
    id: 'gochain',
    name: 'GoChain',
    contracts: {
      networks: [
        {
          id: 'goChainMainnet',
          name: 'Mainnet'
        }
      ],
      validations: [
        {
          type: 'minLength',
          value: 42,
          message: 'One of your addresses is not long enough'
        },
        {
          type: 'maxLength',
          value: 42,
          message: 'One of your addresses too long'
        },
        {
          type: 'startsWith',
          value: '0x',
          message: 'Addresses must start with 0x'
        }
      ]
    }
  }
])

const platformContractComputedFields = () => {
  const obj = {}
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          const computedFieldName =
            'contracts' +
            network.id.charAt(0).toUpperCase() +
            network.id.slice(1)
          obj[computedFieldName] = function() {
            return this.$options.filters.linesToArr(
              this.fields.contracts[network.id].address
            )
          }
          if (
            platform.contracts.validations &&
            platform.contracts.validations.length
          ) {
            obj[network + 'Errors'] = function() {
              return this.errors[network.id]
            }
          }
        }
      })
    }
  })
  return obj
}

const platformContractDataFields = () => {
  const obj = {
    fields: {
      contracts: {}
    },
    errors: {}
  }
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          obj.fields.contracts[network.id] = { address: '' }
        }
        if (
          platform.contracts.validations &&
          platform.contracts.validations.length
        ) {
          obj.errors[network.id] = []
        }
      })
    }
  })
  return obj
}

const platformContractPropNames = () => {
  const list = []
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          const computedFieldName =
            'contracts' +
            network.id.charAt(0).toUpperCase() +
            network.id.slice(1)
          list.push(computedFieldName)
        }
      })
    }
  })
  return list
}

const platformContractDefaultValues = () => {
  const obj = {}
  const propNames = platformContractPropNames()
  propNames.map(propName => {
    obj[propName] = []
  })
  return obj
}

const platformContractProps = () => {
  const obj = {}
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          const computedFieldName =
            'contracts' +
            network.id.charAt(0).toUpperCase() +
            network.id.slice(1)
          obj[computedFieldName] = {
            type: Array,
            required: true,
            default: () => []
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

const platformMap = () => {
  const obj = {}
  platforms.map(platform => {
    if (platform.id && platform.name) {
      obj[platform.id] = platform.name
    }
  })
  return obj
}

const platformNetworkFullNameMap = () => {
  const obj = {}
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          obj[network.id] = platform.name + ' ' + network.name
        }
      })
    }
  })
  return obj
}

const platformNetworkList = () => {
  const list = []
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          list.push(network.id)
        }
      })
    }
  })
  return list
}

const platformNetworksWithErrorInfo = () => {
  const list = []
  platforms.map(platform => {
    if (
      platform.contracts &&
      platform.contracts.networks &&
      platform.contracts.networks.length
    ) {
      platform.contracts.networks.map(network => {
        if (network.id) {
          list.push({
            name: network.id,
            canError: Boolean(
              platform.contracts.validations &&
                platform.contracts.validations.length
            )
          })
        }
      })
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

const dappSchema = Object.freeze({
  ...platformContractDefaultValues(),
  authors: [],
  badges: [],
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
  platforms,
  platformContractComputedFields,
  platformContractDataFields,
  platformContractPropNames,
  platformContractProps,
  platformList,
  platformMap,
  platformNetworkFullNameMap,
  platformNetworkList,
  platformNetworksWithErrorInfo,
  platformSelectOptions,
  platformSoftware,
  rankingColumns
}
