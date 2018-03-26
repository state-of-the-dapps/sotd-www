export const mpDappView = function (sourceComponent, sourceModel, sourcePath, targetDapp) {
  const action = {}
  action.name = 'DApp - View'
  action.data = {
    sourceComponent,
    sourceModel,
    sourcePath,
    targetDapp
  }
  return action
}
