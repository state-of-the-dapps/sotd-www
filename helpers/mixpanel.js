export const setUser = function($email, hasWeb3, lastUpdated, userEntryRoute) {
  let user = {
    $email,
    hasWeb3,
    lastUpdated,
    userEntryRoute
  }

  return user
}

export const trackCollectionView = function(
  sourceComponent,
  sourcePath,
  targetCollection
) {
  let name = 'Collection - View'
  let data = {
    targetCollection
  }
  if (sourceComponent) {
    data = { ...data, sourceComponent }
  }
  if (sourcePath) {
    data = { ...data, sourcePath }
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackContact = function(
  sourceComponent,
  sourcePageLocation,
  sourcePath
) {
  let name = 'Contact'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappContract = function(address, dapp, network, platform) {
  let name = 'DApp - Contract'
  let data = {
    address,
    dapp,
    network,
    platform
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappContractAudit = function(
  contract,
  slug,
  auditorName,
  learnMoreUrl
) {
  let name = 'DApp - Contract Audit'
  let data = {
    contract,
    dapp: slug,
    auditorName,
    learnMoreUrl
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappContractCopy = function(
  address,
  dapp,
  network,
  platform
) {
  let name = 'DApp - Contract Copy'
  let data = {
    address,
    dapp,
    network,
    platform
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappEdit = function(slug) {
  let name = 'DApp - Suggest a change'
  let data = {
    slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappEditSubmit = function(changes, email, slug) {
  let name = 'DApp - Submit a change'
  let data = {
    changes,
    email,
    slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappFeedback = function(dapp, feedback) {
  let name = 'DApp - Feedback'
  let data = {
    dapp,
    feedback
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappFlag = function(slug) {
  let name = 'DApp - Flag as inappropriate'
  let data = {
    slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappPlatform = function(platform, slug) {
  let name = 'DApp - Platform'
  let data = {
    platform,
    dapp: slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappPlatformSoftware = function(platform, slug) {
  let name = 'DApp - Platform Software'
  let data = {
    platform,
    dapp: slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappRankingCategory = function(
  sourceComponent,
  sourcePath,
  category
) {
  let name = 'DApp Ranking - Category'
  let data = {
    sourceComponent,
    sourcePath,
    category
  }

  const action = {
    name,
    data
  }

  return action
}
export const trackDappRankingPage = function(from, to) {
  let name = 'DApp Ranking - Page'
  let data = {
    from,
    to
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappRankingPlatform = function(
  sourceComponent,
  sourcePath,
  platform
) {
  let name = 'DApp Ranking - Platform'
  let data = {
    sourceComponent,
    sourcePath,
    platform
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappRankingSort = function(order, sort) {
  let name = 'DApp Ranking - Sort'
  let data = {
    order,
    sort
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappShare = function(slug) {
  let name = 'DApp - Share'
  let data = {
    slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappSite = function(dapp, type, url) {
  let name = 'DApp - Site'
  let data = {
    dapp,
    type,
    url
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappSocial = function(dapp, platform, url) {
  let name = 'DApp - Social'
  let data = {
    dapp,
    platform,
    url
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappCategory = function(category, slug) {
  let actionName = 'DApp - Category'
  let data = {
    category,
    slug
  }

  const action = {
    name: actionName,
    data
  }

  return action
}

export const trackDappEditView = function(dapp) {
  let actionName = 'DApp - Edit View'
  let data = {
    dapp
  }

  const action = {
    name: actionName,
    data
  }

  return action
}

export const trackDappImproveProfileClick = function(dapp) {
  let name = 'DApp - Improve Profile Click'
  let data = {
    dapp
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappImproveProfileView = function(dapp) {
  let name = 'DApp - Improve Profile View'
  let data = {
    dapp
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappMetaClick = function(dapp) {
  let actionName = 'DApp - Meta Click'
  let data = {
    dapp
  }

  const action = {
    name: actionName,
    data
  }

  return action
}

export const trackDappMetaView = function(dapp) {
  let actionName = 'DApp - Meta View'
  let data = {
    dapp
  }

  const action = {
    name: actionName,
    data
  }

  return action
}

export const trackDappTag = function(name, slug) {
  let actionName = 'DApp - Site'
  let data = {
    name,
    slug
  }

  const action = {
    name: actionName,
    data
  }

  return action
}

export const trackDappView = function(
  sourceCollection,
  sourceComponent,
  sourcePath,
  targetDapp
) {
  let name = 'DApp - View'
  let data = {
    targetDapp
  }
  if (sourceCollection) {
    data = { ...data, sourceCollection }
  }
  if (sourceComponent) {
    data = { ...data, sourceComponent }
  }
  if (sourcePath) {
    data = { ...data, sourcePath }
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappsFilter = function(type, option) {
  let name = 'DApps - Filter'
  let data = {
    type,
    option
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappsSort = function(option) {
  let name = 'DApps - Sort'
  let data = {
    option
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackFooterLogoDownload = function(sourcePath) {
  let name = 'Footer - Logo Download'
  let data = {
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackFooterAppAndroid = function(sourcePath) {
  let name = 'Footer - App Android'
  let data = {
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackFooterSubmit = function(sourcePath) {
  let name = 'Footer - Submit'
  let data = {
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackFeaturedCategory = function(category) {
  let name = 'Featured Category'
  let data = {
    category
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeEventCta = function(targetCta) {
  let name = 'Home Event CTA'
  let data = {
    targetCta
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeHeroCta = function(targetCta) {
  let name = 'Home Hero CTA'
  let data = {
    targetCta
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeHeroDappIcon = function(targetIndex) {
  let name = 'Home Hero DApp Icon'
  let data = {
    targetIndex
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackListAdd = function(dapp) {
  let name = 'My List - Add'
  let data = {
    dapp
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackListRemove = function(dapp) {
  let name = 'My List - Remove'
  let data = {
    dapp
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackLogosDownload = function() {
  let name = 'Logos Download'
  let data = {}

  const action = {
    name,
    data
  }

  return action
}

export const trackMenu = function(sourcePath, targetMenuItem) {
  let name = 'Menu'
  let data = {
    sourcePath,
    targetMenuItem
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMetamaskCta = function(sourceComponent, sourcePath) {
  let name = 'Metamask CTA'
  let data = {
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMyListView = function(dapps) {
  let name = 'My List - View'
  let data = {
    dapps
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMyListShare = function(dapps) {
  let name = 'My List - Share'
  let data = {
    dapps
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackNewsletterSubscribe = function(
  email,
  sourceComponent,
  sourcePath
) {
  let name = 'Newsletter - Subscribe'
  let data = {
    email,
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageAbout = function(
  sourceComponent,
  sourcePageLocation,
  sourcePath
) {
  let name = 'About page'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPromotedDappsView = function(
  sourceComponent,
  sourcePath,
  userEntryRoute
) {
  let name = 'Promoted DApps - View'
  let data = {
    userEntryRoute
  }

  if (sourceComponent) {
    data = { ...data, sourceComponent }
  }
  if (sourcePath) {
    data = { ...data, sourcePath }
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageTerms = function(
  sourceComponent,
  sourcePageLocation,
  sourcePath
) {
  let name = 'Terms page'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPromotedDappSubmit = function(dapp, email, hasSubmittedDapp) {
  let name = 'Promoted DApp - Submit'
  let data = {
    dapp,
    email,
    hasSubmittedDapp
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPublicListView = function(listUrl, sourcePath) {
  let name = 'Public List - View'
  let data = {
    listUrl,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPublicListCreate = function(listUrl, slug) {
  let name = 'Public List - Create'
  let data = {
    listUrl,
    slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackScatterCta = function(sourceComponent, sourcePath) {
  let name = 'Scatter CTA'
  let data = {
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackSearchSuggestion = function(sourcePath, suggestion) {
  let name = 'Search - Suggestion'
  let data = {
    sourcePath,
    suggestion
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackSocial = function(
  sourceComponent,
  sourcePageLocation,
  sourcePath,
  targetPlatform
) {
  let name = 'Social'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath,
    targetPlatform
  }

  const action = {
    name,
    data
  }

  return action
}
