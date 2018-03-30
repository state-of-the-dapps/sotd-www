export const trackAboutPage = function (sourceComponent, sourcePageLocation, sourcePath) {
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name: 'About page',
    data: data
  }

  return action
}

export const trackDappView = function (sourceComponent, sourceModel, sourcePath, targetDapp) {
  let data = {
    targetDapp
  }
  if (sourceComponent) { data = { ...data, sourceComponent } }
  if (sourceModel) { data = { ...data, sourceModel } }
  if (sourcePath) { data = { ...data, sourcePath } }

  const action = {
    name: 'DApp - View',
    data: data
  }

  return action
}

export const trackSocial = function (platform, sourceComponent, sourcePageLocation, sourcePath) {
  let data = {
    platform,
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name: 'Social',
    data: data
  }

  return action
}

export const trackTermsPage = function (sourceComponent, sourcePageLocation, sourcePath) {
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name: 'Terms page',
    data: data
  }

  return action
}
