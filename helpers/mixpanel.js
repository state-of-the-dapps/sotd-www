export const mpDappView = function (sourceComponent, sourceModel, sourcePath, targetDapp) {
  const action = {}
  action.name = 'DApp - View'
  action.data = {}
  if (sourceComponent) { action.data.sourceComponent = sourceComponent }
  if (sourceModel) { action.data.sourceModel = sourceModel }
  if (sourcePath) { action.data.sourcePath = sourcePath }
  if (targetDapp) { action.data.targetDapp = targetDapp }
  return action
}
