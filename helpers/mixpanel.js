export const setUser = function ($email, hasWeb3, lastUpdated, userEntryRoute) {
  let user = {
    $email,
    hasWeb3,
    lastUpdated,
    userEntryRoute
  }

  return user
}

export const trackCollectionView = function (sourceComponent, sourcePath, targetCollection) {
  let name = 'Collection - View'
  let data = {
    targetCollection
  }
  if (sourceComponent) { data = { ...data, sourceComponent } }
  if (sourcePath) { data = { ...data, sourcePath } }

  const action = {
    name,
    data
  }

  return action
}

export const trackContact = function (sourceComponent, sourcePageLocation, sourcePath) {
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

export const trackDappContract = function (address, dapp, network) {
  let name = 'DApp - Contract'
  let data = {
    address,
    dapp,
    network
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappContractCopy = function (address, dapp, network) {
  let name = 'DApp - Contract Copy'
  let data = {
    address,
    dapp,
    network
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackDappEdit = function (slug) {
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

export const trackDappFeedback = function (dapp, feedback) {
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

export const trackDappFlag = function (slug) {
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

export const trackDappRankingSort = function (order, sort) {
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

export const trackDappShare = function (slug) {
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

export const trackDappSite = function (dapp, type, url) {
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

export const trackDappSocial = function (dapp, platform, url) {
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

export const trackDappTag = function (name, slug) {
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

export const trackDappView = function (sourceCollection, sourceComponent, sourcePath, targetDapp) {
  let name = 'DApp - View'
  let data = {
    targetDapp
  }
  if (sourceCollection) { data = { ...data, sourceCollection } }
  if (sourceComponent) { data = { ...data, sourceComponent } }
  if (sourcePath) { data = { ...data, sourcePath } }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeEventCta = function (targetCta) {
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

export const trackHomeHeroCta = function (targetCta) {
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

export const trackHomeHeroDappIcon = function (targetIndex) {
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

export const trackMenu = function (sourcePath, targetMenuItem) {
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

export const trackMetamaskCta = function (sourceComponent, sourcePath) {
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

export const trackNewsletterSubscribe = function (email, sourceComponent, sourcePath) {
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

export const trackPageAbout = function (sourceComponent, sourcePageLocation, sourcePath) {
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

export const trackPromotedDappsView = function (sourceComponent, sourcePath, userEntryRoute) {
  let name = 'Promoted DApps - View'
  let data = {
    userEntryRoute
  }

  if (sourceComponent) { data = { ...data, sourceComponent } }
  if (sourcePath) { data = { ...data, sourcePath } }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageTerms = function (sourceComponent, sourcePageLocation, sourcePath) {
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

export const trackPromotedDappSubmit = function (dapp, email, hasSubmittedDapp) {
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

export const trackSocial = function (sourceComponent, sourcePageLocation, sourcePath, targetPlatform) {
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
